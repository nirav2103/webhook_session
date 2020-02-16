
const express = require("express")
const bodyParser = require('body-parser')
const MongoClient = require("./connection")
const app = express()
const webHookModel = require("./webHook.model")

MongoClient().then(()=>{
    console.log("connected")
}).catch(console.log)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("welcome to hands on demo of  WEBHOOK")
})

app.get("/api/webhook",(req,res)=>{
    webHookModel.find().then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully fetched"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.post("/api/webhook",(req,res)=>{
    let body = req.body;

    webHookModel.create(body)
    .then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfully fetched"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.put("/api/webhook/:id",(req,res)=>{
    let body = req.body;

     webHookModel
     .findByIdAndUpdate(req.params.id,body)
     .then((wh)=>{
         res.json({
             flag:true,
             data:wh,
             message:"Successfully updated"
         });
     })
})

app.delete("/api/webhook/:id",(req,res)=>{
    

     webHookModel.findByIdAndRemove(req.params.id,function(err,wh){
         if(err){
             res.json({
                flag:true,
                data:null,
                message:err.message    
             });
         }
         else{
            res.json({
                flag:true,
                data:wh,
                message:"Successfully deleted"
            });
         }
     })
     
         
     })

app.listen(3000)

//.then((wh)=>{
//     res.json({
//         flag: true,
//         data: wh,
//         message: "Successfully Updated"
//     });
// })
