const User  = require('../models/user');
const isAuthenticated = require('../config/perm');

//Mutations saved for future non social auth feature
module.exports = {
  Query: {
    // Gets authenticated user
    getUser: async (root, args, context, info) => {
      await isAuthenticated(context);
      return User.findOne({id: context.user.id}, function (err, user){
        if(err) throw new Error('User not found');
      });
    }
    // Returns all users of that meeting
    // getUsers: async (root, args, context, info) => {
    //   await isAuthenticated(context);

    // }
  },
  Mutation: {
    register: async (root, args, context, info) => {
      //TODO: Validation, Authentication
      try{
        return User.create({
          email: args.email,
          password: args.password,
          name: args.name,
          timezone: args.timezone
        });
      }catch (e) {
        console.log(e);
      }
    },
    login: async (root, args, context, info) => {
      console.log(args); 
      //TODO: Validation, Authentication
      //Serialize User - passport
      if(args.provider == 'Google'){
        //TODO passport google strategy

      }else if(args.provider == 'Facebook'){
        //TODO passport facebook strategy

      }else{
        //TODO passport strategy

      }
    },
    logout: async (root, args, context, info) => {
      //TODO: Validation, Authentication
      //Unserialize User - passport
    }
  } 
};