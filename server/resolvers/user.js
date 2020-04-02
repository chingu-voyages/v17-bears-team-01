const User  = require("../models/user");

module.exports = {
  Query: {
    user: async (root, args, context, info) => {
      console.log(context);
      return User.findbyId(args.id);
    }
  },
  Mutation: {
    register: async (root, args, context, info) => {
      //TODO: Validation, Authentication
      try{
        return User.create({
          email: args.email,
          password: args.password,
          name: args.name,
          timezone: args.timezone,
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
}