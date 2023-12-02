const User = require('../../models/User');

module.exports = {
    Mutation: {
        async createUser(_,{username} ) {
            const newUser = new User({username});

            const res = await newUser.save();
            console.log(res);
            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Query: {
        getUser: async (_, { userId }) => {
            console.log('Executing getUser resolver');
            const user = await User.findById(userId);
            // console.log('User found:', user);
            return user;
        },

        getUsers: async(_) =>{
            const users = await User.find({});
            // console.log('Users:',users);
            return users;
        }
    }
}

