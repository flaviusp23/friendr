const usersServices = {
    createUsers: (userObj) => {
        console.log("Reached user services");
        console.log(userObj);
    },
    deleteUsers: (userId) => {
        console.log(`Delete user with id:${userId} in services`);
    }
}

module.exports = usersServices;