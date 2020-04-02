const mongoose, { Schema, model } = require("mongoose");

var MeetingSchema = new Schema({
    _id: Schema.Types.ObjectId,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    availability: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
    }],
    participants: [{
        user_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        intervals: [{
            from: Date,
            to: Date
        }]
    }]

});

const Meeting = model("Meeting", MeetingSchema);

module.exports = Meeting;
