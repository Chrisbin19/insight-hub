import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.json());


app.get('/api/v1/restaurants',(req,res)=>{
   res.json({
    "status":"success",
    "data":{
        "restaurant":["mcdonalds",'wendys']
    },
   });
});  

app.get('/api/v1/restaurants/:id',(req,res)=>{
    res.status(200).json({
    "status":"success",
    "data":{
        "restaurant":["mcdonalds",'wendys']
    },
   });
});

app.post('/api/v1/restaurants',(req,res)=>{
    res.status(201).json({
    "status":"success",
    "data":{
        "restaurant":["mcdonalds",'wendys']
    },
   });
})

app.put('/api/v1/restaurants/:id',(req,res)=>{
    console.log(req.params.id);
    console.log(req.body);
});

app.delete('/api/v1/restaurants/:id',(req,res)=>{
    res.status(204).json(
        {
            "status":"success"
        }
    );
});

const port= process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is up and listening on port ${port}`);
});
