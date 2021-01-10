import { Card, Layout } from "../components";
import { Flex, Heading } from "@chakra-ui/react";
import groq from "groq";
import client from "../client";

const Posts = (props) => {
  const { posts } = props;
  return (
    <Layout>
      <Flex flexDirection="column" mb="5rem">
        <Heading my="1.5rem">Posts ;)</Heading>
        <Flex justifyContent="center">
          <Flex
            w="full"
            maxW="60rem"
            flexWrap="wrap"
            justifyContent={["center", "center", "flex-start", "flex-start"]}
          >
            {posts.map(
              ({
                _id,
                title = "",
                slug = "",
                _updatedAt = "",
                mainImage,
                synopsis,
              }) =>
                slug && (
                  <Card
                    mode="post"
                    key={_id}
                    href="/post/[slug]"
                    as={`/post/${slug.current}`}
                    title={title}
                    date={_updatedAt}
                    image={mainImage}
                    synopsis={synopsis}
                  />
                )
            )}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

Posts.getInitialProps = async () => ({
  posts: await client.fetch(groq`
        *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
      `),
});

export default Posts;
