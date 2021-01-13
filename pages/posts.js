import { Card, Layout } from "../components";
import { Flex, Heading } from "@chakra-ui/react";
import groq from "groq";
import client from "../client";
import { motion } from "framer-motion";

const Posts = (props) => {
  const { markdown } = props;
  return (
    <Layout>
      <Flex flexDirection="column" mb="5rem">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Heading mb="1.5rem">Articulos</Heading>
        </motion.div>
        <motion.div
          initial={{ x: "50vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Flex justifyContent="center">
            <Flex
              w="full"
              maxW="60rem"
              flexWrap="wrap"
              justifyContent={["center", "center", "flex-start", "flex-start"]}
            >
              {markdown.map(
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
        </motion.div>
      </Flex>
    </Layout>
  );
};

Posts.getInitialProps = async () => ({
  markdown: await client.fetch(groq`
  *[_type == "markdownPost" && publishedAt < now()]|order(publishedAt desc)
  `),
});

export default Posts;
