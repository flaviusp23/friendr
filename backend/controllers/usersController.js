const usersServices = require("../services/userServices");

const usersController = {
    getUsers: async(req,res) => {
        console.log("Reached GET user controller");
        const userId = req.params.id;
        console.log(userId);
        const userObj = await usersServices.getUserById(userId);
        res.status(200).send(userObj);

    },
    createUsers: async(req,res) => {
        console.log("Reached CREATED user controller");
        const userToBeCreated = req.body;
        console.log(userToBeCreated);
        if( !userToBeCreated ||
            !userToBeCreated.id ||
            !userToBeCreated?.firstName ||
            !userToBeCreated?.lastName ||
            !userToBeCreated?.userName){
            res.status(400).send("Invalid user Object");
            return;
        }
        usersServices.createUsers(userToBeCreated);
        res.status(201).send("User Created Successfully!");
    },
    deleteUsers: async(req, res) => {
        console.log(`Delete user with id:${userId} in controller`);
        usersServices.deleteUsers(userId);
    }
}

module.exports = usersController;