import React from 'react';
import { 
Flex,
Text,

} from '@chakra-ui/react'


const Footer = () => {
  return (
    <Flex justify='center'>
      
       <Text pt='20'>&copy;{new Date().getFullYear()} Whiskey Business </Text> 
     
    </Flex>
  );
};

export default Footer;
