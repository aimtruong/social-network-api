
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/],
        required: [true, "Email required"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

// get total count of thoughts on retrieval
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// create User model
const User = model('User', UserSchema);

module.exports = User;
