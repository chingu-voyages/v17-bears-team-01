const User = require('../models/user');
const Meeting = require('../models/meeting');
const isAuthenticated = require('../config/perm');
const meetingValidator = require('../validators/meeting');

module.exports = {
  Query: {
    getMeeting: async (root, args, context, info) => {
      await isAuthenticated(context);
      let meeting = await Meeting.findById(args.id).exec();
      if (meeting) {
        return meeting;
      } else {
        throw new Error('Meeting does not exist');
      }
    },
    getMeetings: async (root, args, context, info) => {
      await isAuthenticated(context);
      let user = await User.findOne({ id: context.user.id }).exec();
      let meetings = await Meeting.find()
        .where('_id')
        .in(user.meetings)
        .exec();
      return meetings;
    }
  },

  Mutation: {
    createMeeting: async (root, args, context, info) => {
      await isAuthenticated(context);
      await meetingValidator.validate(args);
      const userList = [];

      //create users from participants' emails
      let pList = [];
      for await (let email of args.participants) {
        const user = await User.findOne({ email }).exec();
        if (user) {
          pList.push({ user_id: user.id, intervals: [] });
          userList.push(user);
        } else {
          const user = await User.create({ email });
          pList.push({ user_id: user.id, intervals: [] });
          userList.push(user);
        }
      }

      // create the meeting with participant user ids
      const meeting = await Meeting.create({
        author: context.user.id,
        title: args.title,
        description: args.description,
        duration: args.duration,
        timezone: args.timezone,
        availability: args.availability,
        participants: pList
      });

      //add author to list to add meetings
      let author = await User.findOne({ id: context.user.id }).exec();
      await userList.push(author);

      //add meeting ids to users
      for await (let user of userList) {
        let meetingId = meeting._id;
        //TODO: push meeting id
        user.meetings.push(meetingId);
        await user.save();
      }

      return meeting;
    },
    deleteMeeting: async (root, args, context, info) => {
      await isAuthenticated(context);
      //check if meeting exists else return false
      let meeting = await Meeting.findById({ _id: args.id }).exec();
      if (meeting) {
        //check if user is author of meeting
        if (context.user.id == meeting.author) {
          let result = await Meeting.deleteOne({ _id: args.id }).exec();
          if (result.deletedCount) {
            return true;
          }
        }
      }
      return false;
    },
    joinMeeting: async (root, args, context, info) => {
      await isAuthenticated(context);
      await meetingValidator.validate({ intervals: args.intervals });

      let { n } = await Meeting.updateOne(
        {
          _id: args.id,
          'participants.user_id': context.user.id
        },
        { 'participants.0.intervals': args.intervals }
      );
      let meeting = await Meeting.findById(args.id).exec();
      if (n) {
        return meeting;
      } else {
        if (meeting.author == context.user.id) {
          throw new Error('Author cannot join meeting');
        } else {
          throw new Error('User not listed as participant');
        }
      }
    }
  }
};
