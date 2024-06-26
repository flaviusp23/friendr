const express = require('express')
const router = express.Router()

users = [
    {id: 1,firstName : "Forrest", lastName : "Gump"},
    {id: 2,firstName : "Hart", lastName : "Seldon"},
    {id: 3,firstName : "Tom", lastName : "Cruise"}
]

router.get('/', (req,res) =>{
    console.log(req.query.id);
    const userId = req.query.id;
    let found = false;
    for(let i = 0 ; i < users.length; i++){
        if(users[i].id == userId){
            res.send(users[i]);
            found = true;
            return
        }
    }
    if(!found){
        res.status(404).send();
    }
})
router.post('/',(req,res) =>{
    console.log(req.body)
    res.status(201);
    res.send("The user will be created");
})

module.exports = router;