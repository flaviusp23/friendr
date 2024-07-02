const userModel = require("../data/user.model");

const usersServices = {
    getUserById: async (userId) => {
        console.log("Reached GET user services");
        console.log(userId)
        const response = await userModel.findOne({id:userId},{})
        return response;
    },
    getUserByUsername: async (username) => {
        console.log("Reached GET user services");
        console.log(username)
        const response = await userModel.findOne({username:username},{firstName : 1 ,lastName : 1})
        return response;
    },
    createUsers: (userObj) => {
        console.log("Reached POST user services");
        console.log(userObj);
        const userToBeCreated = new userModel(userObj);
        userToBeCreated.save().then(() => console.log('User created'))
    },
    deleteUsers: async (userId) => {
        console.log("Reached DELETE user services");
        console.log(userId)
        const response = await userModel.deleteOne({id:userId});
        console.log("User deleted")
        return response
    }
}

module.exports = usersServices;