import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import client from "../../client";
import { Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Layout } from "../../components";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Post = (props) => {
  const { title, name, authorImage, body = [] } = props;
  return (
    <Layout>
      <Box>
        <Flex justifyContent="center" my="2rem">
          <Heading>{title}</Heading>
        </Flex>
        <Flex mx={["0", "1rem", "5rem", "5rem"]}>
          <BlockContent
            blocks={body}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            {...client.config()}
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

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`;

Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(query, {
    slug,
  });
};

export default Post;
