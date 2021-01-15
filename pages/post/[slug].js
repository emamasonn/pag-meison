import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
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
} from "@chakra-ui/react";
import { Layout } from "../../components";
import ReactMarkdown from "react-markdown";
import styled from "@emotion/styled";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Post = (props) => {
  const { title, name, authorImage, body = [], synopsis } = props;

  const renderers = {
    code: ({ language, value }) => {
      return (
        <Box my="2rem">
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
        fontSize="2rem"
        mb="1rem"
        mt="2rem"
        letterSpacing="0rem"
        fontWeight="600"
      >
        {children}
      </Heading>
    ),
    paragraph: ({ children }) => (
      <Text fontSize="1.1rem" letterSpacing="-0.003em" lineHeight="1.7rem">
        {children}
      </Text>
    ),
  };

  return (
    <Layout>
      <Flex maxH="20rem">
        <Image src="/imagepost.jpg" objectFit="cover" />
      </Flex>
      <Box maxW="50rem" m="auto">
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
                <Image
                  src="/twitterLine.svg"
                  w="1.5rem"
                  h="1.5rem"
                  mr="0.6rem"
                />
                <Text>Twitter</Text>
              </MenuItem>
              <MenuItem display="flex" justifyContent="flex-start">
                <Image
                  src="/linkedinLine.svg"
                  w="1.5rem"
                  h="1.5rem"
                  mr="0.6rem"
                />
                <Text>Linkedin</Text>
              </MenuItem>
              <MenuItem display="flex" justifyContent="flex-start">
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
      </Box>
    </Layout>
  );
};

const query = groq`*[_type == "markdownPost" && slug.current == $slug][0]{
  synopsis,
  title,
  body,
  "name": author->name,
  "authorImage": author->image
}`;

Post.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  const data = await client.fetch(query, {
    slug,
  });
  return { ...data };
};

export default Post;
