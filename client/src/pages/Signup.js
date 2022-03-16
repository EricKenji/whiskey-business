import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Flex, VStack, Box, Spacer, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/react'

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <VStack>
    
      <Box mt="4" mb="4">
        <Button color='orange.300' variant='outline'>
          <Link to="/login">← Go to Login</Link>
        </Button>
  </Box>
      

      <Text fontWeight='bold' color="orange.300" mb="5" fontSize="lg" >Signup</Text>
      <form onSubmit={handleFormSubmit}>
        
        <Text fontWeight='semibold' color="orange.300">First Name:</Text>
        <Input placeholder='' id='firstName'size='sm' onChange={handleChange}/>
          {/* <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          /> */}
        
        <Text fontWeight='semibold' color="orange.300">Last Name:</Text>
        <Input placeholder='' id='lastName'size='sm' onChange={handleChange}/>
          {/* <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            
          /> */}
        
        <Text fontWeight='semibold' color="orange.300">Email:</Text>
          <Input placeholder='' id='email'size='sm' onChange={handleChange}/>
        {/* <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          /> */}
        
        <Text fontWeight='semibold' color="orange.300">Password:</Text>
        <Input placeholder='******' id='pwd'size='sm' onChange={handleChange}/>
          {/* <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          /> */}
       
        
        <Button colorScheme='orange' size='md' mt="2" >Submit</Button>
        
      </form>
    
    </VStack>
  );
}

export default Signup;
