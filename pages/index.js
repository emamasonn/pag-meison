import Link from "next/link";
import { Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { CardPost, Layout } from "../components";
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
      <Box>
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
            backgroundImage={`url("wave-1.svg")`}
            backgroundSize="cover"
            backgroundColor="#1C2833"
          >
            <Box w="22rem">
              <Image
                src={urlFor(i.image).url()}
                borderRadius="0.5rem"
                w="22rem"
              />
            </Box>
            <Flex
              flexDirection="column"
              p={["0", "0", "1.5rem", "1.5rem"]}
              color="#fff"
            >
              <Heading as="h1" fontSize="3.25rem" fontWeight="800">
                {i.name}
              </Heading>
              <Text fontSize="lg">{i.profile}</Text>
              <Heading my="1.5rem">Bio</Heading>
              <Text
                maxW="40rem"
                mb="1rem"
                fontSize={["0.9rem", "1rem", "1.1rem", "1.1rem"]}
                letterSpacing="0.02rem"
              >
                {i.bio[0].children[0].text}
              </Text>
              <Heading my="1rem" fontSize="1.5rem">
                Social Media
              </Heading>
              <Flex mb="1rem">
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

          <Box
            backgroundImage={`url("wave-2.svg")`}
            backgroundSize="unset"
            backgroundColor="#1C2833"
            backgroundRepeat="repeat-x"
          >
            <Flex
              flexDirection="column"
              px={["0.5rem", "1rem", "1.5rem", "1.5rem"]}
              py={["2rem", "2rem", "1.5rem", "1.5rem"]}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Heading my="1.5rem" color="#fff">
                  Articulos
                </Heading>
              </motion.div>
              <Flex justifyContent="center">
                <Flex
                  w="full"
                  maxW="60rem"
                  flexWrap="wrap"
                  justifyContent="center"
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
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          key={_id}
                        >
                          <Box
                            m={[
                              "0.9rem 0.5rem",
                              "0.9rem 0.6rem",
                              "1rem",
                              "1rem",
                            ]}
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
              <Flex w="full" justifyContent="center" my="2rem">
                <Link href="/posts">
                  <a>
                    <Button
                      borderRadius="unset"
                      bg="#6c3583"
                      color="#fff"
                      borderRadius="0.2rem"
                      _hover={{ color: "#6c3583", background: "#fff" }}
                    >
                      Ver mas
                    </Button>
                  </a>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </motion.div>
      </Box>
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
