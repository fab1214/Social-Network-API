const {Schema, model, Types} = require('mongoose');
//require dateFormat file

//reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: createdAt => dateFormat(createdAt)
        }
    },
    {
        toJSON: {
            //getters: true
        }
    }
)
//thought schema
const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: [true, 'thoughtText is required'],
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //get: createdAt => dateFormat(createdAt)
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            //getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;