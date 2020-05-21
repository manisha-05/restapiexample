const jwt = require('jsonwebtoken')
const user = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer', '')
        const decoded =jwt.verify(token, 'thisismynewproject')
        const user = await user.findOne({ _id: decoded._id, 'tokens.token': token })   
     if(!user) {
         throw new error('Please message')

     }

    
     req.user = user
     next()
    }
     catch(e) {
        res.status(400).send('Please authenticate!!')
    }
}

module.exports = auth