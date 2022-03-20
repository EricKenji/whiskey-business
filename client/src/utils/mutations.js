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
            email
            savedDrinks {
                drinkId
                title
                instructions
                image
                glass
                ingredient1
                ingredient2
                ingredient3
                ingredient4
                ingredient5
                ingredient6
                ingredient7
                ingredient8
                ingredient9
                ingredient10
                ingredient11
                ingredient12
                ingredient13
                ingredient14
                ingredient15
                measure1
                measure2
                measure3
                measure4
                measure5
                measure6
                measure7
                measure8
                measure9
                measure10
                measure11
                measure12
                measure13
                measure14
                measure15
            }
        }
    }
`

export const REMOVE_DRINK = gql`
    mutation removeDrink($drinkId: ID!) {
        removeDrink(drinkId: $drinkId) {
            _id
            email
            savedDrinks {
                drinkId
                title
                instructions
                image
                glass
                ingredient1
                ingredient2
                ingredient3
                ingredient4
                ingredient5
                ingredient6
                ingredient7
                ingredient8
                ingredient9
                ingredient10
                ingredient11
                ingredient12
                ingredient13
                ingredient14
                ingredient15
                measure1
                measure2
                measure3
                measure4
                measure5
                measure6
                measure7
                measure8
                measure9
                measure10
                measure11
                measure12
                measure13
                measure14
                measure15
            }
        }
    }
`