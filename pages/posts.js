import { CardPost, Layout } from "../components";
import { Flex, Heading, Box } from "@chakra-ui/react";
import groq from "groq";
import client from "../client";
import { motion } from "framer-motion";

const Posts = ({ markdown }) => {
  return (
    <Layout>
      <Flex
        flexDirection="column"
        mb="5rem"
        px={["0.5rem", "1rem", "1.5rem", "1.5rem"]}
        py="1.5rem"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Heading mb="1.5rem">Articulos</Heading>
        </motion.div>
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
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    key={_id}
                  >
                    <Box
                      m={["0.9rem 0.5rem", "0.9rem 0.6rem", "0.9rem", "0.9rem"]}
                    >
                      <CardPost
                        href="/post/[slug]"
                        as={`/post/${slug.current}`}
                        title={title}
                        date={_updatedAt}
                        image={mainImage}
                        synopsis={synopsis}
                      />
                    </Box>
                  </motion.div>
                )
            )}
          </Flex>
        </Flex>
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
