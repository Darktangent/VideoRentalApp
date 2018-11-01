const mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser:true})
.then(()=>console.log('Connected to Mongo'))
.catch(err=>console.error(`Couldnt connect to DB`))

const courseSchema= new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:Date,
    isPublished:Boolean,
    price:Number





})
const Course=mongoose.model('Course', courseSchema)

async function queryCourse(){
    
    const courses= await Course 
    .find({isPublished:true})
    //tags: {$in : ["frontend","backend"]}})
.or([{price:{$gte:15}},{name:/.*by.*/i}])
    .sort({price:1})
    .select({name:1,author:1, price:1})
    return courses
}

async function run(){

    const courses= await queryCourse()
    console.log(courses)
}

run()