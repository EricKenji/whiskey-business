import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import { Flex, HStack, Heading, Box, Spacer,  } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaGlassWhiskey } from 'react-icons/fa'
import { Image } from '@chakra-ui/react'

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <HStack boxShadow='l' p='6' rounded='md' bg='white' bgGradient="linear(to-r, orange.300, white)" > 
      <Flex w="100%"  bgGradient="linear(to-r, orange.300, white)" >      
        <Box >
          <Link to="/">
            <Heading ml="8" size ="md" fontWeight="semibold" color="white">Whiskey Business
              <FaGlassWhiskey></FaGlassWhiskey>
            </Heading>
           </Link>
        </Box>
      <Spacer />
      <Box mr="8">
        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Button colorScheme='orange' size='sm' mr="2" mt="2">
                <Link to="/login">Login</Link>  
              </Button>
              <Button colorScheme='orange' size='sm' mt="2" >
              <Link to="/signup">Signup</Link>
              </Button>
            </>
          )}
        </nav>
      </Box>
    
    </Flex>
    </HStack>
  );
};

export default Header;