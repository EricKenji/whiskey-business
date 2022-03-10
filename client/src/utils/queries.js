import { gql } from '@apollo/client'

export const QUERY_ME = gql `
 {
     me { 
         _id
         username
         email
         savedDrinks {
            idDrink
            name
            ingredients
            instructions
            image
         }
     }
 }
`