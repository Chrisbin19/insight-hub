import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import db from './db/index.js';
const app = express();
app.use(express.json());


app.get('/api/v1/restaurants',async (req,res)=>{
    try{
        const results = await db.query('select * from restaurants');
    console.log(results);
   res.json({
    status:"success",
    results : results.rows.length,
    data:{
        restaurants : results.rows,
       
    },
   });
    }
    catch(err){
        console.log(err);
    }
    
});  

app.get('/api/v1/restaurants/:id',(req,res)=>{
    res.status(200).json({
    status:"success",
    data:{
        restaurant:["mcdonalds",'wendys']
    },
   });
});

app.post('/api/v1/restaurants',(req,res)=>{
    res.status(201).json({
    status:"success",
    data:{
        restaurant:["mcdonalds",'wendys']
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
