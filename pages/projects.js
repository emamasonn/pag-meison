import { Flex, Heading } from "@chakra-ui/react";
import { Layout, CardProject } from "../components";
import groq from "groq";
import client from "../client";
import { motion } from "framer-motion";

const Projects = ({ projects }) => {
  return (
    <Layout>
      <Flex
        flexDirection="column"
        px={["0.5rem", "1rem", "1.5rem", "1.5rem"]}
        py="3rem"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Heading mb="2rem">Projectos</Heading>
        </motion.div>
        <Flex w="full" justifyContent="center" w="full" maxW="75rem" m="auto">
          <Flex
            maxW="80rem"
            w="full"
            justifyContent={["center", "center", "center", "flex-start"]}
            flexWrap="wrap"
          >
            {projects &&
              projects.map(
                ({
                  _id,
                  title = "",
                  _updatedAt = "",
                  mainImage,
                  synopsis,
                  page,
                  repo,
                }) => (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    key={_id}
                  >
                    <CardProject
                      page={page}
                      repo={repo}
                      title={title}
                      date={_updatedAt}
                      image={mainImage}
                    />
                  </motion.div>
                )
              )}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

Projects.getInitialProps = async () => ({
  projects: await client.fetch(groq`
      *[_type == "project" && publishedAt < now()]|order(publishedAt desc)
    `),
});

export default Projects;
