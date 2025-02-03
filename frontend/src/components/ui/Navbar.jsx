import {Button, Container, Flex, HStack, Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { LuSun } from 'react-icons/lu'
import { IoMoon } from 'react-icons/io5'
import {
  ColorModeButton,
  useColorMode,
  useColorModeValue,
} from "@/components/ui/color-mode"

import { CiSquarePlus } from "react-icons/ci";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return <Container maxW={"1140px"} px={4}  >
    <Flex 
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base:"column",
        sm:"row"
      }}
    >
      <Text
        fontSize={{base: 22, sm: 28}}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="Text"
>
  <Link to="/">Paps Store 🛒</Link>  

</Text>
<HStack spacing={2} alignItems={"center"}>
  <Link to={"/create"}>
      <Button>
        <CiSquarePlus/>
      </Button>
  </Link>
  
  <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <IoMoon/> : <LuSun size = "40"/>}
      </Button>
  </HStack>
    </Flex>
    
  </Container>
  
}

export default NavBar