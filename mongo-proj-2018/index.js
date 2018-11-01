const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to mongoDB', err))


//create a schema-to define the shape of collection
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
})
//1st create schema-then model - thats how you get a class and then you can create instances of that class
//compile model
const Course = mongoose.model('Course', courseSchema)

async function createCourse() {

    const course = new Course({
        name: 'React Course',
        author: 'Rohan Ganguly',
        tags: ['react', 'frontend'],
        isPublished: true
    })

    //save doc to db
    const result = await course.save()
    console.log(result)

}


async function getCourses() {

    // eq (equal)
    //ne not equal
    //gt (greater than)
    //gte greater than or equal to
    //lt (less than)
    //lte less than or equal to
    //in
    //nin not in

    //logical or and



    const pageNumber = 2
    const pageSize = 10
    const courses = await Course

        .find({
            author: 'Rohan Ganguly',
            isPublished: true
        })
        //.find({price: {$gte:10, $lte: 20}})
        //.find({price:{$in:[10,15,20]}}) //to find courses that are 10,15, or 20
        // .find()
        // .and([{author:'Rohan Ganguly'},{isPublished:true}])
        //     .find({author:/^Rohan/})
        //     //ends with
        //     .find({author:/Ganguly$/i})

        //     //contains phrase- 0 or more chracter before or after phrase

        // .find({author:/.*Rohan.*/i})
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({
            name: 1
        })
        // .select({name:1,tags:1})
        .countDocuments()
    console.log(courses)


}
async function updateCourse(id){
    //query first
    //findbyid
    //modify prop
    //save()

    //updatefirst
    //optionally get updated doc

//    const course= await Course.findById(id)
//    if(!course) return
// //    course.isPublished=true
// //    course.author='Another Author'
    
//    course.set({
//        isPublished:true,
//        author:'Another Author'

//    })
//    const result=await course.save()
//    console.log(result)
const result= await Course.updateOne({_id:id},{
    $set:{
        author:"Rohan",
        isPublished:false
    }
},{new : true})

console.log(result)


}


updateCourse('5bd6971942f1c679c0c1b05e')