const { gql } = require('apollo-server-express')

const typeDefs = gql`
    input DrinkInput {
        name:String! 
        ingredients: String 
        instructions: String! 
        idDrink: String! 
        image: String
    }

    type User {
        _id: ID
        username: String
        email: String
        savedDrinks: [Drink] 
    }

    type Drink {
        idDrink: ID!
        name: String
        ingredients: String
        instructions: String
        image: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email:String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveDrink(drinkData: DrinkInput!): User
        removeDrink(idDrink: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;