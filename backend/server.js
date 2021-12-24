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


app.delete('/tasks/:id',(req,res)=>{
    //console.log("37:", req.params.id);    

    Todo.deleteOne({_id:req.params.id},(err, deleteObj)=> { 
        if(err){
            console.log("ERROR: " , err);
        }else{
            // if ==> else in another statmente
            deleteObj.deletedCount === 1
            ? res.json("Delete one this Todo successfully")
            : res.status(404).json("This Todo is not Found")
           // console.log(deleteObj);
        }
   })
})


app.put('/tasks/:id',(req,res)=>{
    //console.log("37:", req.params.id);    
    Todo.updateOne(
        {_id:req.params.id},
        {title:req.body.newTitle},
        (err, updateObj)=> { 
        if(err){
            console.log("ERROR: " , err);
            res.status(400).json(err)
        }else{
            console.log(updateObj);
            updateObj.modifiedCount === 1
            ? res.json("UpDate one Todo successfully")
            : res.status(404).json("This Todo is not Found")
           // res.json("Delete one this Todo successfully");
        }
   })
})


/*
app.get('/tasks',(req,res)=>{
    //res.json('GET / is Working')
})*/

app.listen(5000,()=>{
    console.log('SERVER IS WORKING..');
})

