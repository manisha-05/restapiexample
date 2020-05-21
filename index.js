const express= require('express')
require('./src/db/mongoose')

const User = require('./src/models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Create a user (POST route )
app.post('/users/signup', async (req, res) => {

      
    const user =  await new User(req.body)
        user.save().then(() => {
         res.send({ user })
     }).catch((e) => {
        res.send(e)   
})
})

//get list of users (Get route )
app.get('/users',  (req, res) => {
  
    User.find({ }).then((users) => {
        res.send(users)
    }).catch((e) => {
       res.send(e)   
})
})

//Find user by id (Get route )
app.get('/users/:id',  (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(!user){
            return res.status(400).send('User not found!!')
        }
         res.send(user)
     }).catch((e) => {
        res.send(e)   
})
})

//Update a user (Patch route )
app.patch('/users/:id',  (req, res) => {
  
    const updatedPost = User.updateOne({ _id: req.params.id } , { $set: { name: req.body.name}}).then((updatedPost) => {
        res.send(updatedPost)
    }).catch((e) => {
       res.send(e)   
})
})


//Delete a user by id (Delete route )
app.delete('/users/:id',  (req, res) => {
    User.findByIdAndDelete(req.params.id).then((user) => {
        if(!user) {
            res.status(404).send('No record found to delete!!')
        }
         res.send(user)
     }).catch((e) => {
        res.send(e)   
})
})




app.listen(port, () => {
   console.log("Server is running ") 
})

