import Link from "next/link";
import { Flex, Divider as CDivider, Box, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Divider = styled(CDivider)`
  background: #000;
`;

export const Layout = ({ children }) => {
  return (
    <Flex flexDirection="column">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
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
                <Image src="/faro.png" w="3rem" h="3rem" />
              </a>
            </Link>
          </Box>
          <Flex w="8rem" justifyContent="space-between" alignItems="center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{ fontSize: "1.1rem" }}
            >
              <Link href="/posts">
                <a>Blog</a>
              </Link>
            </motion.div>
            <Divider orientation="vertical" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{ fontSize: "1.1rem" }}
            >
              <Link href="/projects">
                <a>Projectos</a>
              </Link>
            </motion.div>
          </Flex>
        </Flex>
      </motion.div>
      <Box px="2rem">{children}</Box>
    </Flex>
  );
};
