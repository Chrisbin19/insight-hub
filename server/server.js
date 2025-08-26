import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

app.use((req,res,next)=>{
    console.log("yeah now middlewear works");
    next();
});

app.get('/api/v1/restaurants',(req,res)=>{
   res.json({
    "status":"success",
    "data":{
        "restaurant":["mcdonalds",'wendys']
    },
   });
});  

app.get('/api/v1/restaurants/:id',(req,res)=>{
    console.log(req);
})

app.post('/api/v1/restaurants',(req,res)=>{
    console.log(req);
})
const port= process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is up and listening on port ${port}`);
});
