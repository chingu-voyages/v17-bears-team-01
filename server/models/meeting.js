const { Schema, model } = require("mongoose");

var MeetingSchema = new Schema({
    author: {
        type: String,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    availability: {
        type: Array,
        required: true
    },
    participants: [{
        user_id: { 
            type: String, 
            ref: 'User'
        },
        intervals: {
            type: Array,
            default: []
        }
    }]
},{
    collection: 'meetings'
});

const Meeting = model("Meeting", MeetingSchema);

module.exports = Meeting;
