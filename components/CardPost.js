import { Flex, Image, Button, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import { formatDate } from "../utils/formatDate";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export const CardPost = ({ href, as, title, date, image, synopsis }) => {
  return (
    <Flex
      flexDirection="column"
      maxW="18rem"
      maxH="30rem"
      w="full"
      m="0.6rem"
      borderRadius="0.5rem"
      border="1px solid #CBD5E0"
      justifyContent="center"
    >
      <Image
        src={urlFor(image).width(200).url()}
        maxW="20rem"
        maxH="10.5rem"
        w="full"
        borderRadius="0.4rem 0.4rem 0rem 0rem"
      />
      <Flex flexDirection="column" p="0.8rem">
        <Text fontWeight="bold" fontSize="1.2rem" maxW="16rem" isTruncated>
          {title}
        </Text>
        <Text fontSize="0.8rem">{formatDate(date)}</Text>
        <Text
          my="1rem"
          lineHeight="1.3rem"
          fontSize="0.9rem"
          maxW="16rem"
          noOfLines={4}
        >
          {synopsis}
        </Text>
        <Flex justifyContent="flex-end">
          <Link href={href} as={as}>
            <a>
              <Button
                fontSize="0.8rem"
                p="0.5rem"
                rightIcon={<ArrowForwardIcon />}
              >
                Leer Mas
              </Button>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
