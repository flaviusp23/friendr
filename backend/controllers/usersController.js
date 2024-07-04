const usersServices = require("../services/userServices");

const usersController = {
    getUsers: async (req, res) => {
        console.log("\nReached GET user controller");
        const username = req.params.username;
        console.log(username);
        const userObj = await usersServices.getUserByUsername(username);
        if (!userObj) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(userObj);
    },
    createUsers: async (req, res) => {
        console.log("\nReached POST user controller");
        const userToBeCreated = req.body;
        console.log(userToBeCreated);
        if (!userToBeCreated ||
            !userToBeCreated.firstName ||
            !userToBeCreated.lastName ||
            !userToBeCreated.username) {
            res.status(400).json({ message: "Invalid user object" });
            return;
        }
        await usersServices.createUsers(userToBeCreated);
        res.status(201).json({ message: "User created successfully!" });
    },
    deleteUsers: async (req, res) => {
        const userId = req.query.id;
        console.log("\nReached DELETE user controller");
        console.log(userId);
        await usersServices.deleteUsers(userId);
        res.status(200).json({ message: "User deleted" });
    },
    followUsers: async (req, res) => {
        const userId = req.params.id;
        const username = req.body.username;
        console.log("\nReached FOLLOW user controller");
        console.log(userId);

        if (!username) {
            res.status(400).json({ message: "Username is required" });
            return;
        }
        const userObj = await usersServices.getUserById(userId);
        if (!userObj) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const followers = userObj.followers;
        if (followers.includes(username)) {
            await usersServices.removeFollowUser(userId, username);
        } else {
            await usersServices.addFollowUser(userId, username);
        }
        const updatedUserObj = await usersServices.getUserById(userId);
        res.status(200).json(updatedUserObj);
    }
};

module.exports = usersController;
