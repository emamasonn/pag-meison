import { Flex, Heading } from "@chakra-ui/react";
import { Card, Layout } from "../components";
import groq from "groq";
import client from "../client";

const Projects = ({ projects }) => {
  return (
    <Layout>
      <Heading mb="2rem">Projectos</Heading>
      <Flex w="full" justifyContent="center">
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
                <Card
                  mode="project"
                  key={_id}
                  page={page}
                  repo={repo}
                  title={title}
                  date={_updatedAt}
                  image={mainImage}
                  synopsis={synopsis}
                />
              )
            )}
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
