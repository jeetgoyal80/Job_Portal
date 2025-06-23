const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./utils/db');
const colors = require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT ||  4000;
dotenv.config({});



//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));



app.use(cors({
  origin: 'https://job-portal-1-5puv.onrender.com',
  credentials: true
}));






// routes

app.use('/api/user',require('./routes/userroutes'));
app.use('/api/user/company',require('./routes/companyroute'));
app.use('/api/user/job',require('./routes/jobroutes'));
app.use('/api/applications',require('./routes/applicationroutes'));






app.get('/',(req,res)=>{
   
    res.send("App started")
    

})





app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`.bgCyan );
    db();
    
})
