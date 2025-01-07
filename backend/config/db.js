const mongoose= require('mongoose');


const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            // useNewUrlParsr:true,
            // useUnifiedTopology: true,
           
        });
        console.log(`Mongo DB connected ${conn.connection.host}`);
    }
    catch(err){
        console.log(err.message);
        process.exit();
    }
}

module.exports=connectDB