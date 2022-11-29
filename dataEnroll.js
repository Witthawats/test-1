const mongoose = require('mongoose') 


const dbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err)) 


let productSchema3 = mongoose.Schema({
    m_id :String, 
    c_id:String, 
    cer_start:Number,  
    cer_expire :Number, 
    
})  



let DataEnroll  = mongoose.model("dataenroll ",productSchema3) 



module.exports = DataEnroll 

module.exports.saveDataEnroll =function(model,data3){
    model.save(data3)
} 

