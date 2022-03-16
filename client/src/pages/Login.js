import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Flex, VStack, Box, Spacer, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
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
        <Text fontWeight='bold' color="orange.300" mb="5" fontSize="lg" >Signup</Text>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
        <Text fontWeight='semibold' color="orange.300">Email:</Text>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
          <Text fontWeight='semibold' color="orange.300">Password:</Text>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
          <Button colorScheme='orange' size='md' mt="2" >Submit</Button>
          </div>
        </form>
      </div>
    </VStack>
  );
}

export default Login;
