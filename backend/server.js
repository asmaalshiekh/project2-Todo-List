const express= require('express')
const app=express()

const db= require('./db')
const Todo= require('./todo')
app.use(express.json())

//console.log(Todo); 


app.get('/',(req,res)=>{
    res.json('GET / is Working')
})

//CRUD: Create, Read, Update, Delete 

app.get('/tasks',(req,res)=>{
    Todo.find({},(err,data)=> { 
        if(err){
            console.log("ERROR: " , err);
        }else{
            res.json(data)
        }
    })
})
//              ?key=value&key=value
app.get('/filter',(req,res)=>{
    console.log(req.query);
Todo.find({isCompleted: req.query.isCompleted},
        (err,data)=>{
        if(err){
            console.log('ERROR', err);
        }else{
            console.log(data);
            res.json(data) }
    })
})
/* 
   The up endpoint is replace to these tow
app.get('/comleted',(req,res)=>{
    Todo.find({isCompleted: true},(err,data)=>{
        if(err){
            console.log('ERROR', err);
        }else{
            console.log(data);
            res.json(data)
        }
})
})
app.get('/not_comleted',(req,res)=>{
    Todo.find({isCompleted: false},(err,data)=>{
        if(err){
            console.log('ERROR', err);
        }else{
            console.log(data);
            res.json(data)
        }
})
})
*/


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

//      حذف أكثر من قيمة بوجود شرط معين وهو از كومبليتيد صحيحة
app.delete('/tasks',(req,res)=>{
    //console.log("37:", req.params.id);    

    Todo.deleteMany({isCompleted: true},(err, deleteObj)=> { 
        if(err){
            console.log("ERROR: " , err);
        }else{
            // if ==> else in another statmente
            console.log(deleteObj);
            deleteObj.deletedCount === 0
            ? res.status(404).json("There are  no completed Todo found")
            : res.json("Delete all completed Todos Successfully")
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


app.put('/tasks/:id/:isCompleted',(req,res)=>{
    console.log("131:", req.params);    
    Todo.updateOne(
        {_id:req.params.id},
        {isCompleted:req.params.isCompleted},
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

