import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import { Flex, HStack, Heading, Box, Spacer,  } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { FaGlassWhiskey } from 'react-icons/fa'
const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <HStack>
      <Flex w="100%"  bgGradient="linear(to-r, pink.500, white)" mb="50">      
        <Box mb="10">
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
              <Button colorScheme='pink' size='sm' mr="2" mt="2">
                <Link to="/login">Login</Link>  
              </Button>
              <Button colorScheme='pink' size='sm' mt="2" >
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