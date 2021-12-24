const express= require('express')
const app=express()

const db= require('./db')
const Todo= require('./todo')
app.use(express.json())

//console.log(Todo); 


app.get('/',(req,res)=>{
    res.json('GET / is Working')
})


app.get('/tasks',(req,res)=>{
    Todo.find({},(err,data)=> { 
        if(err){
            console.log("ERROR: " , err);
        }else{
            res.json(data)
        }
    })
})


app.post('/tasks',(req,res)=>{
    console.log("25:", req.body);    
    Todo.create(req.body,(err,newTask)=> { 
        if(err){
            console.log("ERROR: " , err);
        }else{
            res.status(201).json(newTask);
        }
   })
})


app.get('/tasks',(req,res)=>{
    //res.json('GET / is Working')
})

app.listen(5000,()=>{
    console.log('SERVER IS WORKING..');
})

