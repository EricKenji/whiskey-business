const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedDrinks: [Drink] 
    }

    type Drink {
        
        name: String
        ingredients: String
        instructions: String
        idDrink: ID!
        image: String
    }

    type Auth {
            token: ID!
            user: User
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

    
`

module.exports = typeDefs;