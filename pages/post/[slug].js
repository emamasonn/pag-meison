import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import client from "../../client";
import {
  Flex,
  Box,
  Image,
  Heading,
  Text,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Progress,
} from "@chakra-ui/react";
import { Layout } from "../../components";
import ReactMarkdown from "react-markdown";
import styled from "@emotion/styled";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Post = (props) => {
  const { title, name, authorImage, body = [], mainImage, path } = props;

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const renderers = {
    code: ({ language, value }) => {
      return (
        <Box my="1.5rem">
          <SyntaxHighlighter
            style={base16AteliersulphurpoolLight}
            language={language}
            children={value}
            showLineNumbers={true}
          />
        </Box>
      );
    },
    heading: ({ children }) => (
      <Heading
        fontSize={["1.5rem", "1.5rem", "2rem", "2rem"]}
        mb="1rem"
        mt="2rem"
        letterSpacing="0rem"
        fontWeight="600"
      >
        {children}
      </Heading>
    ),
    paragraph: ({ children }) => (
      <Text
        fontSize="1.1rem"
        letterSpacing="-0.003em"
        lineHeight="1.7rem"
        mb="1.5rem"
      >
        {children}
      </Text>
    ),
  };

  const handleCopyUrl = () => {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      //const msg = successful ? "successful" : "unsuccessful";
      //console.log("Copying url command was " + msg);
    } catch (err) {
      console.log(err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <Layout>
      <Flex maxH="20rem">
        <Image src={urlFor(mainImage)} objectFit="cover" />
      </Flex>
      <Box
        maxW="50rem"
        m="auto"
        px={["0.9rem", "1rem", "1.5rem", "1.5rem"]}
        py="1.5rem"
      >
        <Flex justifyContent="flex-start" mb="2rem" mt="3rem">
          <Heading
            w="full"
            maxW="44rem"
            fontSize={["2rem", "2rem", "3rem", "3rem"]}
            letterSpacing="-0.011em"
          >
            {title}
          </Heading>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center">
          <Menu>
            <MenuButton as={Button} bg="#fff">
              <Image src="/share.svg" w="1.5rem" h="1.5rem" />
            </MenuButton>
            <MenuList minW="8rem">
              <MenuItem display="flex" justifyContent="flex-start">
                <a
                  href={`https://twitter.com/intent/tweet?text=${title}%20${baseURL}${path}`}
                >
                  <Flex>
                    <Image
                      src="/twitterLine.svg"
                      w="1.5rem"
                      h="1.5rem"
                      mr="0.6rem"
                    />
                    <Text>Twitter</Text>
                  </Flex>
                </a>
              </MenuItem>
              <MenuItem display="flex" justifyContent="flex-start">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${baseURL}${path}`}
                >
                  <Flex>
                    <Image
                      src="/linkedinLine.svg"
                      w="1.5rem"
                      h="1.5rem"
                      mr="0.6rem"
                    />
                    <Text>Linkedin</Text>
                  </Flex>
                </a>
              </MenuItem>
              <MenuItem
                display="flex"
                justifyContent="flex-start"
                onClick={handleCopyUrl}
              >
                <Image src="/copylink.svg" w="1.5rem" h="1.5rem" mr="0.6rem" />
                <Text>Copy Link</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDirection="column">
          <ReactMarkdown
            renderers={renderers}
            children={body}
            escapeHtml={false}
          />
        </Flex>
      </Box>
      <Flex
        my="2rem"
        justifyContent="flex-end"
        alignItems="center"
        fontWeight="bold"
      >
        <Text>{name}</Text>
        {authorImage && (
          <Box mx="1rem">
            <Image
              src={urlFor(authorImage).width(50).url()}
              borderRadius="5rem"
            />
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

const query = groq`*[_type == "markdownPost" && slug.current == $slug][0]{
  mainImage,
  title,
  body,
  "name": author->name,
  "authorImage": author->image
}`;

Post.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  const { asPath } = context;
  const data = await client.fetch(query, {
    slug,
  });
  return { ...data, path: asPath };
};

export default Post;
