const userModel = require("../data/user.model");

const usersServices = {
    getUserById: async (userId) => {
        const response = await userModel.findOne({id:userId},{});
        return response;
    },
    createUsers: (userObj) => {
        console.log("Reached user services");
        console.log(userObj);
        const userToBeCreated = new userModel(userObj);
        userToBeCreated.save().then(() => console.log('User created'))
    },
    deleteUsers: (userId) => {
        console.log(`Delete user with id:${userId} in services`);
    }
}

module.exports = usersServices;