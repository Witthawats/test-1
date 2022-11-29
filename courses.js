const mongoose = require('mongoose') 


const dbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err)) 


let productcourses = mongoose.Schema({
    c_name:String, 
    c_description:String, 
    c_price:Number, 
})

let Datacourses = mongoose.model("Courses",productcourses) 


module.exports = Datacourses 


module.exports.saveDatacourses =function(model,data2){
    model.save(data2)
} 