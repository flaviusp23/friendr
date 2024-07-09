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
            !userToBeCreated.password ||
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
        const usernameToBeFollowed = req.params.username;
        const username = req.body.username;
        console.log("\nReached FOLLOW user controller");
        console.log(usernameToBeFollowed);
        if(usernameToBeFollowed === username){
            res.status(400).json({ message: "You cannot follow yourself" });
            return;
        }
        if (!username) {
            res.status(400).json({ message: "Username is required" });
            return;
        }
        const userObj = await usersServices.getUserByUsername(usernameToBeFollowed);
        if (!userObj) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const followers = userObj.followers;
        if (followers.includes(username)) {
            await usersServices.removeFollowUser(usernameToBeFollowed, username);
        } else {
            await usersServices.addFollowUser(usernameToBeFollowed, username);
        }
        const updatedUserObj = await usersServices.getUserByUsername(usernameToBeFollowed);
        res.status(200).json(updatedUserObj);
    },
    login: async (req, res) => {
        console.log("\nReached LOGIN user controller");
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }
        try {
            const token = await usersServices.loginUser(username, password);
            res.cookie('token', token, {
                httpOnly: true,
            });
            const userObj = await usersServices.getUserByUsername(username);
            res.status(200).json({ message: "Login successful" , token: token, firstName: userObj.firstName, lastName: userObj.lastName});
        } catch (error) {
            res.clearCookie("token")
            res.status(401).json({ message: "Invalid username or password" });
        }
    },
    searchUsers: async(req,res) =>{
        console.log("\nReached SEARCH user controller");
        const username = req.params.username;
        console.log(username);
        const userObjs = await usersServices.searchUsers(username);
        return res.status(400).json(userObjs)
    }
};

module.exports = usersController;
