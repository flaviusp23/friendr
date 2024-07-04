const userModel = require("../data/user.model");
const {v4:uuidv4} = require('uuid')
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
        userObj.id = uuidv4();
        const userToBeCreated = new userModel(userObj);
        userToBeCreated.save().then(() => console.log('User created'))
    },
    deleteUsers: async (userId) => {
        console.log("Reached DELETE user services");
        console.log(userId)
        const response = await userModel.deleteOne({id:userId});
        console.log("User deleted")
        return response
    },
    removeFollowUser: async(userId,username) => {
        console.log("Reached REMOVE FOLLOW user services")
        console.log(userId,username)
        await userModel.updateOne({id:userId},{$pull:{followers:username}});
    },
    addFollowUser: async(userId,username) => {
        console.log("Reached ADD FOLLOW user services")
        console.log(userId,username)
        await userModel.updateOne({id:userId},{$push:{followers:username}});
    },
}

module.exports = usersServices;