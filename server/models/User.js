const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const drinkSchema = require('./Drink');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: { 
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter an email address!']
        },

        password: {
            type: String,
            required: true,
            minlength: 8
        },
        
        savedDrinks: [drinkSchema],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// hash user password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// validate password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

// get drink count in My Liquor cabinet
userSchema.virtual('drinkCount').get(function() {
    return this.savedDrinks.length;
})


const User = model('User', userSchema);

module.exports = User;