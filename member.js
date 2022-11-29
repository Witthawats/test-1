const mongoose = require('mongoose') 


const dbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err)) 


let MemberSchema = mongoose.Schema({
  
    m_name:String, 
    m_password:String, 
    m_email:String, 
    
})  



let Member = mongoose.model("Member",MemberSchema) 



module.exports = Member 

module.exports.saveMember=function(model,data){
    model.save(data)
} 


