// BUILD YOUR SERVER HERE

const express = require('express');

const User = require('./users/model.js');

const server = express();

server.use(express.json());

// Creates a user using the information sent inside the request body

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    } else {
        User.create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: 'there was an error' })
            })
    }
})

// Returns an array users.

server.get('/api/users', (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'user info could not be retrieved' })
        })
})

// Returns the user object with the specified id.

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: 'user does not exist' })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'the user info could not be retrieved' })
        })
})

// Removes the user with the specified id and returns the deleted user.

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if(!user) {
                res.status(400).json({ message: 'user with id does not exist' })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'use could not be removed' })
        })
})

// Updates the user with the specified id using data from the request body. Returns the modified user

server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params
    const changes = req.body
    
    try{
        if(!changes.name || !changes.bio) {
            res.status(400).json({ message: 'please provide name and bio for user' })
        } else {
            const updatedUser = await User.update(id, changes)
            if(!updatedUser) {
                res.status(404).json({ message: 'user does not exist' })
            } else {
                res.status(200).json(updatedUser)
            }
        }
    } catch(err) {
        res.status(500).json({ message: 'user could not be modified' })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}


