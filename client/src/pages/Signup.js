import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { VStack, Box, Text } from '@chakra-ui/layout'
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
        username: formState.username,
      }, 
    });

    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    console.log(token)
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
        <div className="flex-row space-between my-2">
        <Text fontWeight='semibold' color="orange.300" htmlFor='username'>Username:</Text>
          <Input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
        <Text fontWeight='semibold' color="orange.300" htmlFor='email'>Email:</Text>
          <Input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
        <Text fontWeight='semibold' color="orange.300" htmlFor='pwd'>Password:</Text>
          <Input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
        <Button colorScheme='orange' size='md' mt="2" type='submit' >Submit</Button>
        </div>
      </form>
    
    </VStack>
  );
}

export default Signup;
