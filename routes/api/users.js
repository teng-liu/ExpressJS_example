const express = require('express');
const router = express.Router();

const myUsers = require('../../Users');
const users = myUsers.data.users;


// get all users   /api/users => /
router.get('/',(req, res) => {
    res.json(myUsers);
});

// get single user by id
router.get('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({msg: `Error: User not found: ${req.params.id}`});
    }
    
});


// create user
router.post('/', (req, res) => {
    // res.send(req.body);
    const newUser = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: 'active'
    }

    if(!newUser.firstName || !newUser.lastName){
        res.status(400).json({msg: 'Please include firstName and lastName'});
    }

    users.push(newUser);        // users.save(newUser) -> when save to DB
    res.json(users);

});


// update User -> PUT
router.put('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        const updateUser = req.body;
        users.forEach(user => {
            if(user.id === parseInt(req.params.id)){
                user.firstName = updateUser.firstName? updateUser.firstName : user.firstName;
                user.lastName = updateUser.lastName? updateUser.lastName : user.lastName;

                res.json({msg: 'User Updated.', user});
            }
        });
    }
    else {
        res.status(400).json({msg: `Error: User not found: ${req.params.id}`});
    }
    
});

// Delete user
router.delete('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg: 'User deleted.',
            users: users.filter(user => user.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({msg: `Error: User not found: ${req.params.id}`});
    }
    
});



module.exports = router;