const express = require("express");
const app = express();
const port = process.env.PORT || 3000; 
const Member = require('./member.js')
const Datacourses = require('./courses.js') 
const DataEnroll =require('./dataEnroll.js')

app.use(express.json());


// 1 เรียกดูสมาชิกทั้งหมด
app.get('/MemberAll', async (req, res) => {
    const products = await Member.find({});
    res.json(products);
  }); 

  // 2 สมัครสมาชิก
app.post('/Member', (req, res) => {
    let data = new Member({ 
  
    m_name:req.body.m_name, 
    m_password:req.body.m_password,
    m_email:req.body.m_email
        
    })
    Member.saveMember(data,(err)=>{
    if(err) console.log(err)
    res.json(data);
})
}); 

 // 3 เรียกดูสมาชิกด้วยid
 app.get('/GetMember/:id', async (req, res) => {
    const  {id}  = req.params; 
    try {
        await Member.findById(id)
        .then(  result =>{  if (result) {
            res.status(200).json(
               result
            );
        } else {
            res.status(404).json({
                message: '404 not found'
            });
        }})
    } catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
   
});

//4 อัพเดทสมาชิกด้วยid
app.put('/UpdateMember/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
  try{
    await Member.findByIdAndUpdate(id, { $set: payload }).then(result => {
        if (result) {
            res.status(200).json({
                 result
            });
        } else {
            res.status(404).json({
                message: '404 not found'
            });
        }
    });    
  } 
   catch (error) { 
    console.log(error)
    res.status(404).json({
        message: '404 error'
    });
   }
});

//5 ลบข้อมูลสมาชิกด้วยid 
app.delete('/DeleteMember/:id', async (req, res) => {
    const { id } = req.params;
  
   try{
    await Member.findByIdAndDelete(id).then(result => {
        if (result) {
            res.status(200).json({
                result
            });
        } else {
            res.status(404).json({
                message: '404 not found'
            });
        }
    }); 
   } 
   catch (error) { 
    console.log(error)
    res.status(404).json({
        message: '404 error'
    });
   }
  });

  //6 ดูครอสทั้งหมด  
  app.get('/Allcourses', async (req, res) => {
    const products = await Datacourses.find({});
    res.json(products);
  }); 

  //7 ลงข้อมูลครอส 
  app.post('/Courses', (req, res) => {
    let data2 = new Datacourses({ 
        c_name:req.body.c_name, 
        c_description:req.body.c_description,
        c_price:req.body.c_price
        })
        Datacourses.saveDatacourses(data2,(err)=>{
    if(err) console.log(err)
    res.json(data2);
})
}); 

//8 ค้นหาcoursesด้วยid
app.get('/GetCourses/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        await Datacourses.findById(id)
        .then(  result =>{  if (result) {
            res.status(200).json(
               result
            );
        } else {
            res.status(404).json({
                message: '404 not found'
            });
        }})
    } catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       } 
});

//9 updateข้อมูลcourses
app.put('/Updatecourses/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    try{
        await Datacourses.findByIdAndUpdate(id, { $set: payload }).then(result => {
            if (result) {
                res.status(200).json({
                     result
                });
            } else {
                res.status(404).json({
                    message: '404 not found'
                });
            }
        });    
      } 
       catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
});

//10 ลบข้อมูลcoursesด้วยid
app.delete('/Deletecourses/:id', async (req, res) => {
    const { id } = req.params;  
   try{
    await Datacourses.findByIdAndDelete(id).then(result => {
        if (result) {
            res.status(200).json({
                result
            });
        } else {
            res.status(404).json({
                message: '404 not found'
            });
        }
    }); 
   } 
   catch (error) { 
    console.log(error)
    res.status(404).json({
        message: '404 error'
    });
   }
  
  }); 

  //11 เรียกดูenrollทั้งหมด
  app.get('/AllEnroll', async (req, res) => {
    const products = await DataEnroll.find({});
    res.json(products);
  }); 

  //12 ลงทะเบียนenroll
  app.post('/Enroll', (req, res) => {
    let data3 = new DataEnroll({ 
        m_id:req.body.m_id, 
        c_id:req.body.c_id,
        cer_start:req.body.cer_start,
        cer_expire:req.body.cer_expire
        
    })
    DataEnroll.saveDataEnroll(data3,(err)=>{
    if(err) console.log(err)
    res.json(data3); 
    console.log(data3);
})
});  

//13ค้นหาenrollด้วยcer_id
app.get('/GetEnroll/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        await DataEnroll.findById(id)
        .then(  result =>{  if (result) {
            res.status(200).json(
               result
            );
        } else {
            res.status(404).json({
                message: '404 not found'
            });
        }})
    } catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
}); 

//14 อัพเดทข้อมูลenrollด้วย
app.put('/UpdateEnroll/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    try{
        await DataEnroll.findByIdAndUpdate(id, { $set: payload }).then(result => {
            if (result) {
                res.status(200).json({
                     result
                });
            } else {
                res.status(404).json({
                    message: '404 not found'
                });
            }
        });    
      } 
       catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
});

//15 ลบข้อมูลenroll
app.delete('/DeleteEnroll/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await DataEnroll.findByIdAndDelete(id).then(result => {
            if (result) {
                res.status(200).json({
                    result
                });
            } else {
                res.status(404).json({
                    message: '404 not found'
                });
            }
        }); 
       } 
       catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
  
  }); 

//16 หาข้อมูลenrollด้วยm_id
app.get('/GetEnrollm_id/:m_id', async (req, res) => {
   
    
    try {
        await DataEnroll.find(req.params)
        .then(  result =>{  
           
            if(result.length>0){
                res.status(200).json(
                    result
            )} else {
            res.status(404).json({
                message: '404 not found'
            });
        }})
    } catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
}); 

//17 หาข้อมูลenrollด้วยc_id
app.get('/GetEnrollc_id/:c_id', async (req, res) => {
   console.log(req.params)
    try {
        await DataEnroll.find(req.params)
        .then(  result =>{  
           
           if(result.length>0){
            res.status(200).json(
                result
        )}
            else {  
            res.status(404).json({
                message: '404 not found'
            });
        }})
    } catch (error) { 
        console.log(error)
        res.status(404).json({
            message: '404 error'
        });
       }
}); 


app.listen(port, () => {
  console.log("Starting node.js at port " + port);
}); 
