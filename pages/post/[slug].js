import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
import client from "../../client";
import { Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
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
        <SyntaxHighlighter
          style={coy}
          language={language}
          children={value}
          showLineNumbers={true}
        />
      );
    },
    heading: ({ children }) => <Heading fontSize="2.5rem">{children}</Heading>,
  };

  return (
    <Layout>
      <Box>
        <Flex justifyContent="center" my="2rem">
          <Heading>{title}</Heading>
        </Flex>
        <Text fontSize="1.5rem">{synopsis}</Text>
        <Flex mx={["0", "1rem", "5rem", "5rem"]} flexDirection="column">
          <ReactMarkdown
            renderers={renderers}
            children={body}
            escapeHtml={true}
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
