const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());