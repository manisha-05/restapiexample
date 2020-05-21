
const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age :{
        type : Number,
        validate(value) {
            if(value<0)
             throw new Error('Age must be a number')
        }
    },
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       validate(value) {
           if(!validator.isEmail(value))
           throw new Error('Email must be valid')
       }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.includes('password')){
            throw new Error('Passwsord cannot contain password')
        } }
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
   
   })
   
//     //Create JWT token 
//     userSchema.methods.generateAuthToken = async function () {
//         const user = this
//         const token = jwt.sign({ _id: user._id.toString() } , 'thisismynewproject')
//         user.tokens = user.tokens.concat({ token})
//         await user.save()
//         return token
    
//     }


//    //Find a user by creadentials  to login 
//    /*userSchema.statics.findByCredentials = async (email, password ) => {
//        const user =  await User.findOne({ email })
       
//        if(!user){
//            throw new Error('Unable to find user!!')
//        }
//        const isMatch = await bcrypt.compare(password, user.password)
//        if(!isMatch) {
//            throw new Error('Password didnt match!!')
//        }
//        return user
//    }*/
//    userSchema.statics.findByCredentials = async (email, password) => {
     
//     const user = await User.findOne({ email })
        
//         if(!user) {
//             throw new Error('Uable to find')
//         }
        
//         const isMatch = await bcrypt.compare(password, user.password )
//         if(!isMatch) {
//             throw new Error('Unable to login')
//         } 
        
//         return user
        
//    }

//    //Hash the plain text password before saving to the database
//    userSchema.pre('save', async function(next) {
//        const user = this 
     
       
//             user.password = await bcrypt.hash(user.password, 8)
   
//             next()
//    })
  

   const User = mongoose.model('User', userSchema)

   module.exports = User