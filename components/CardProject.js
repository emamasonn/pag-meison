import { Flex, Image, Button, Text, Heading, Divider } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export const CardProject = ({ title, date, image, repo, page }) => {
  return (
    <Flex
      flexDirection="column"
      p="0.9rem"
      height="full"
      width="full"
      minW="17rem"
      minH="17rem"
      maxW="17rem"
      maxH="17rem"
      m="0.6rem"
      borderRadius="0.5rem"
      border="1px solid #CBD5E0"
      justifyContent="space-between"
      backgroundImage={`url("${urlFor(image).url()}")`}
      backgroundSize="cover"
      backgroundColor="#494A61"
    >
      <Flex mt="4rem">
        <Divider />
      </Flex>
      <Flex flexDirection="column" color="#fff">
        <Text
          w="full"
          maxW="16rem"
          noOfLines={2}
          isTruncated
          fontSize="2rem"
          fontWeight="bold"
        >
          {title}
        </Text>
        <Flex mt="1rem">
          <Link href={repo}>
            <a>
              <Image
                src="/github.svg"
                w="1.5rem"
                h="1.5rem"
                mr="0.8rem"
                cursor="pointer"
              />
            </a>
          </Link>
          <Link href={page}>
            <a>
              <Image src="/web.svg" w="1.5rem" h="1.5rem" cursor="pointer" />
            </a>
          </Link>
        </Flex>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" color="#fff">
        <Text fontSize="0.9rem" fontWeight="bold">
          UPLOADED
        </Text>
        <Text>{date}</Text>
      </Flex>
    </Flex>
  );
};
