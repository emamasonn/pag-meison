import Link from "next/link";
import { Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { Card, Layout } from "../components";
import groq from "groq";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Index = (props) => {
  const { posts = [], author } = props;
  const i = author[0];
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Flex
          flexWrap="wrap-reverse"
          p="1rem"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="22rem">
            <Image
              src={urlFor(i.image).url()}
              borderRadius="0.5rem"
              w="22rem"
            />
          </Box>
          <Flex flexDirection="column" p={["0", "0", "1.5rem", "1.5rem"]}>
            <Heading as="h1" fontSize="3.25rem" fontWeight="800">
              {i.name}
            </Heading>
            <Text fontSize="lg">{i.profile}</Text>
            <Heading my="1.5rem">Bio</Heading>
            <Text maxW="40rem" mb="1rem">
              {i.bio[0].children[0].text}
            </Text>
            <Heading my="1rem" fontSize="1.5rem">
              Social Media
            </Heading>
            <Flex>
              <Link href={i.socialMedia.github}>
                <a>
                  <Image src="github.svg" mr="0.5rem" />
                </a>
              </Link>
              <Link href={i.socialMedia.linkedin}>
                <a>
                  <Image src="linkedin.svg" mr="0.5rem" />
                </a>
              </Link>
              <Link href={i.socialMedia.twitter}>
                <a>
                  <Image src="twitter.svg" mr="0.5rem" />
                </a>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </motion.div>
      <Flex flexDirection="column">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Heading my="1.5rem">Posts</Heading>
        </motion.div>
        <Flex justifyContent="center">
          <Flex w="full" maxW="60rem" flexWrap="wrap" justifyContent="center">
            {posts.map(
              (
                {
                  _id,
                  title = "",
                  slug = "",
                  _updatedAt = "",
                  mainImage,
                  synopsis,
                },
                index
              ) =>
                slug && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
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
                  </motion.div>
                )
            )}
          </Flex>
        </Flex>
        <Flex w="full" justifyContent="center" my="2rem">
          <Link href="/posts">
            <a>
              <Button>Ver mas</Button>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  posts: await client.fetch(groq`
      *[_type == "markdownPost" && publishedAt < now()]|order(publishedAt desc)[0..2]
    `),
  author: await client.fetch(groq`
  *[_type == "author"]`),
});

export default Index;
