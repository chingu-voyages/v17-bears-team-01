const mongoose, { Schema, model } = require("mongoose");

var MeetingSchema = new Schema({
    _id: Schema.Types.ObjectId,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    duration: Number,
    availability: String,
    timezone: String,
    meetings: [{
        type: Schema.Types.ObjectId,
        ref: 'Meeting',
        default: []
    }],
    availability: [{
        from: String,
        to: String,
    }],
    particpants: [{
        user_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        intervals: [{
            from: String,
            to: String
        }]
    }]

});

const Meeting = model("Meeting", MeetingSchema);

module.exports = Meeting;
