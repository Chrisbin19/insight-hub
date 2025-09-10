import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import db from './db/index.js';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/v1/restaurants',async (req,res)=>{
    try{
        //const results = await db.query('select * from restaurants');
        const restaurantRatingsData = await db.query('select * from restaurants left join(select restaurant_id,count(*),trunc(avg(rating),1) as average_rating from reviews group by restaurant_id ) reviews on reviews.restaurant_id = restaurants.id;');
   res.json({
    status:"success",
    results : restaurantRatingsData.rows.length,
    data:{
        restaurants : restaurantRatingsData.rows,
       
    },
   });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: err.message,
    });
    }
    
});  

app.get('/api/v1/restaurants/:id',async (req,res)=>{
    console.log(req.params.id);
    try{
        const restaurant = await db.query('select * from restaurants left join(select restaurant_id,count(*),trunc(avg(rating),1) as average_rating from reviews group by restaurant_id ) reviews on reviews.restaurant_id = restaurants.id where id = $1',[req.params.id]);
        const reviews = await db.query('select * from reviews where restaurant_id = $1',[req.params.id]);
        //console.log(reviews);
        console.log(reviews.rows)
        res.status(200).json({
        status:"success",
        data:{
            restaurant:restaurant.rows[0],
            reviews : reviews.rows
         },
   });
    }
    catch(err){
        console.log(err);
    }
    
});

app.post('/api/v1/restaurants',async (req,res)=>{
    
   //console.log(req.body);
   try{
        const results = await db.query('insert into restaurants (name,location,price_range) values($1,$2,$3) returning *',[
            req.body.name,req.body.location,req.body.price_range
        ]);
        //console.log(results);
        res.status(201).json({
        status:"success",
        data:{
            restaurant:results.rows[0]
             },
   });
   }
   catch(e){
    console.log(e);
   }
});

app.put('/api/v1/restaurants/:id',async (req,res)=>{
    console.log(req.params.id);
    //console.log(req.body);
    try{
        const results = await db.query('update restaurants set name=$1,location=$2,price_range=$3 where id = $4 returning *',[
            req.body.name,req.body.location,req.body.price_range,req.params.id
        ]);
         res.status(200).json({
            status:"success",
            data:{
                restaurant:results.rows[0]
             },
        });
    }
    catch(error){
        console.log(error);
    }
});

app.delete('/api/v1/restaurants/:id',async (req,res)=>{
    
    try{
        const results = await db.query('delete from restaurants where id = $1 returning *',[req.params.id]);
        res.status(204).json(
        {
            status: "success",
        }
    );
        

    }
    catch(err){
        console.log(err);
    }
});
app.post('/api/v1/restaurants/:id/addReview',async (req,res)=>{
    try{
       const newreview = await  db.query('INSERT INTO reviews (restaurant_id,name,review,rating) VALUES ($1,$2,$3,$4) returning *;',[req.params.id,req.body.name,req.body.review,req.body.rating]);
       res.status(201).json({
        status:'success',
        data:{
            review : newreview.rows[0]
        }
       })
    }
    catch(e){
        
    }
})
const port= process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is up and listening on port ${port}`);
});
