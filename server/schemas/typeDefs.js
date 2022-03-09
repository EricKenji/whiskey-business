const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedDrinks: [Drink] 
    }

    type Drink {
        _id: ID
        name: String
        ingredients: String
        instructions: String
        idDrink: ID!
        image: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email:String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveDrink(name:String!, ingredients: String, instructions: String!, idDrink:String!, image:String): User
        removeDrink(idDrink: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;