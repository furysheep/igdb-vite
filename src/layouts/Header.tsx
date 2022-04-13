import React from 'react'
import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const MenuItems: React.FC<{}> = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const Header: React.FC<{}> = (props) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          IGDB
        </Heading>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>
      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Collections</MenuItems>
        <MenuItems>Genre</MenuItems>
        <MenuItems>Platform</MenuItems>
      </Box>
      <IconButton mr={4} aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Login
        </Button>
      </Box>
    </Flex>
  )
}

export default Header
