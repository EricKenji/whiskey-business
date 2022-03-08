const { Schema } = require('mongoose');

const drinkSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },

        ingredients: [
            {
                type: String
            }
        ],

        instructions: {
            type: String,
            required: true
        },

        idDrink: {
            type: String,
            required: true
        },

        image: {
            type: String
        }
    }
)

module.exports = drinkSchema;