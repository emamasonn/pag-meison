import { Flex, Heading } from "@chakra-ui/react";
import { Card, Layout } from "../components";

const Projects = () => {
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
          <Card mode="project" />
          <Card mode="project" />
          <Card mode="project" />
          <Card mode="project" />
          <Card mode="project" />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Projects;
