const usersServices = require("../services/userServices");

const usersController = {
    getUsers: async(req,res) => {
        console.log("\nReached GET user controller");
        const userId = req.params.id;
        console.log(userId);
        const userObj = await usersServices.getUserById(userId);
        res.status(200).send(userObj);
    },
    createUsers: async(req,res) => {
        console.log("\nReached POST user controller");
        const userToBeCreated = req.body;
        console.log(userToBeCreated);
        if( !userToBeCreated ||
            !userToBeCreated?.id ||
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
        const userId = req.query.id;
        console.log("\nReached DELETE user controller");
        console.log(userId);
        usersServices.deleteUsers(userId);
        res.status(200).send("User deleted");
    }
}

module.exports = usersController;