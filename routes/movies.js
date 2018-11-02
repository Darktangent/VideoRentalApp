const Joi=require('joi')
const mongoose=require ('mongoose')
const express=require('express')
const router=express.Router()



const Movie=mongoose.model('Movie', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:255

    
    },
    genre:{
        type:Object,
    },
    numberInStock:{
        type:Number,
        default:0
    },
    dailyRental:{
        type:Number,
        default:0
    }
}))



