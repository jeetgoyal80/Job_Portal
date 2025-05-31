const mongoose = require('mongoose');
const color = require('colors');

const mongodb =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGODB connect successfully ${mongoose.connection.host}`.bgMagenta);
        
        
    } catch (error) {
        console.log("Error in connection in mongodb",error);
        
        
    }
}
module.exports = mongodb;