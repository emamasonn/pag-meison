import Link from "next/link";
import { Flex, Divider as CDivider, Box, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Divider = styled(CDivider)`
  background: #000;
`;

export const Layout = ({ children }) => {
  return (
    <Flex flexDirection="column">
      <Flex
        h="4rem"
        justifyContent="space-between"
        alignItems="center"
        mb="2rem"
        p="1rem"
      >
        <Box w="3rem" h="3rem">
          <Link href="/">
            <a>
              <Image src="faro.png" w="3rem" h="3rem" />
            </a>
          </Link>
        </Box>
        <Flex w="8rem" justifyContent="space-between" alignItems="center">
          <Link href="/">Blog</Link>
          <Divider orientation="vertical" />
          <Link href="/projects">Projectos</Link>
        </Flex>
      </Flex>
      <Box px="2rem">{children}</Box>
    </Flex>
  );
};
