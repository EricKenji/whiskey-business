import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`

export const SAVE_DRINK = gql`
    mutation saveDrink($drinkData: DrinkInput!) {
        saveDrink(drinkData: $drinkData) {
            _id
            username
            email
            savedDrinks {
                idDrink
                name
                ingredients
                measurements
                instructions
                image
            }
        }
    }
`

export const REMOVE_DRINK = gql`
    mutation removeDrink($idDrink: ID!) {
        removeDrink(idDrink: $idDrink) {
            _id
            username
            email
            savedDrinks {
                idDrink
                name
                ingredients
                measurements
                instructions
                image
            }
        }
    }
`