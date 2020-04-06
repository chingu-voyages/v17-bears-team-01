const User = require('../models/user');
const Meeting = require('../models/meeting');
const isAuthenticated = require('../config/perm');

module.exports = {
  Query: {
    getMeeting: async (root, args, context, info) => {
      await isAuthenticated(context);
      return Meeting.findbyId(args.id, function(err, meeting){
        if(err) throw new Error("Meeting not found");
      });
    } 
  },  

  Mutation: {
    createMeeting: async (root, args, context, info) => {
      await isAuthenticated(context);
      //TODO: check if meeting exists

      //create users from participants' emails 
      let pList = [];
      for await(let email of args.participants){
        let userId = "";
        await User.find({ email }, function (err, user){
          if(err) throw new Error(`User not found\n {err}`);
          if(user.length == 0){
            User.create({ email }, function (err, user){
              if(err) throw new Error(err);
              userId = user.id;
            });
          }
          userId = user.id;
        });
        pList.push({user_id: userId, intervals: []});
      }

      // create the meeting with participant user ids
      return await Meeting.create({
        author: context.user.id,
        title: args.title,
        description: args.description,
        duration: args.duration,
        timezone: args.timezone,
        availability: args.availability,
        participants: pList
      }, function (err, meeting) {
        if(err) throw new Error(err);
        return meeting.save();
        //add meeting ids to users
        for(let x of meeting.participants){
          let userId = x.user_id;
          let meetingId = meeting._id;
          //TODO: push meeting id

        }
      })
    },
    deleteMeeting: async(root, args, context, info) => {
      await isAuthenticated(context);
      //check if meeting exists else return false
      await Meeting.findById({_id: args.id}, async function(err, meeting){
        if(meeting){
          //check if user is author of meeting 
          if(context.user.id == meeting.author){
            await Meeting.deleteOne({_id: args.id}, function(err, meeting){
              //return true
            });
          }else{
            return false;
          }
        }else{
          return false;
        }
      });
    },

  }
}
