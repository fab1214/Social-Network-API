const {Schema, model} = require('mongoose');

const User = new schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'    
            }
        ],
        friends: [this]

    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UseeSchema);

module.exports = User;