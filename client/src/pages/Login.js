import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {VStack, Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input, FormLabel } from '@chakra-ui/react';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('test');
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
      <div className="container my-1">
        <Box mt="4" mb="4">
          <Button color="orange.300" variant="outline">
            <Link to="/signup">← Go to Signup</Link>
          </Button>
        </Box>
        <Text fontWeight='bold' color="orange.300" mb="5" fontSize="lg" >Login</Text>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <FormLabel fontWeight='semibold' color="orange.300" htmlFor='email'>Email:</FormLabel>
            <Input placeholder='youremail@test.com' id='email' size='sm'type='email' name="email" onChange={handleChange} />
          </div>
          <div className="flex-row space-between my-2">
            <FormLabel fontWeight='semibold' color="orange.300" htmlFor='password'>Password:</FormLabel>
            <Input placeholder="******" id='password' size='sm' type='password' name="password" onChange={handleChange} />
          </div>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <Button colorScheme='orange' size='md' mt="2" type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </VStack>
  );
}

export default Login;
