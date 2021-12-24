const mongoose=require('mongoose')

const dbURI='mongodb://localhost:27017/TodoListV01'

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

//mongoose.connect(dbURI)
mongoose.connect(dbURI,options,()=>{
         
    console.log('MongoDB is CONNECTED....');
})

// EXTRA
const db = mongoose.connection;
db.on("error", (err) => {
    console.log(err.message + " ERROR in MongoDB..");
});
db.on("connected", (err) => {
    console.log("MongoDB is CONNECTED No ERROR..");
})
