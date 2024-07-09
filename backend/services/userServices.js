const userModel = require("../data/user.model");
const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersServices = {
    getUserById: async (userId) => {
        console.log("Reached GET user services");
        console.log(userId)
        const response = await userModel.findOne({id:userId},{password : 0})
        return response;
    },
    getUserByUsername: async (username) => {
        console.log("Reached GET user services");
        console.log(username)
        const response = await userModel.findOne({username:username},{password : 0})
        return response;
    },
    createUsers: async (userObj) => {
        console.log("Reached POST user services");
        console.log(userObj);
        userObj.id = uuidv4();
        userObj.password = await bcrypt.hash(userObj.password, 10);
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
    removeFollowUser: async(usernameToBeFollowed,username) => {
        console.log("Reached REMOVE FOLLOW user services")
        console.log(usernameToBeFollowed,username)
        await userModel.updateOne({username:usernameToBeFollowed},{$pull:{followers:username}});
    },
    addFollowUser: async(usernameToBeFollowed,username) => {
        console.log("Reached ADD FOLLOW user services")
        console.log(usernameToBeFollowed,username)
        await userModel.updateOne({username:usernameToBeFollowed},{$push:{followers:username}});
    },
    loginUser: async (username, password) => {
        console.log("Reached LOGIN user services");
        const userObj = await userModel.findOne({ username: username });
        if (!userObj) {
            throw new Error("Invalid username or password");
        }
        const isPasswordValid = await bcrypt.compare(password, userObj.password);
        if (!isPasswordValid) {
            throw new Error("Invalid username or password");
        }
        const token = jwt.sign({ id: userObj.id, username: userObj.username, firstName : userObj.firstName, lastName : userObj.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token
    },
    searchUsers: async (username) => {
        console.log("Reached SEARCH user services");
        console.log(username);
        const regex = new RegExp('^' + username, 'i'); // Case-insensitive search
        const userObjs = await userModel.find({ username: { $regex: regex } }, { password: 0 });
        return userObjs;
    }
    
}

module.exports = usersServices;