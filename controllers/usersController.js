const usersServices = require("../services/userServices");

const usersController = {
    createUsers: (userObj) => {
        console.log("Reached user controller");
        console.log(userObj);
        usersServices.createUsers(userObj);
    },
    deleteUsers: (userId) => {
        console.log(`Delete user with id:${userId} in controller`);
        usersServices.deleteUsers(userId);
    }
}

module.exports = usersController;