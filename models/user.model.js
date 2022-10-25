const { timeStamp } = require('console')
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        enum : ['admin', 'GV','HV'],
        default :   'HV'
    },
    pushtoken : {
        type : String
    }
},{timestamps : true})

module.exports = mongoose.model('users', UserSchema)