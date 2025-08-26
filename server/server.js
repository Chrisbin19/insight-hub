import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

const port= process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is up and listening on port ${port}`);
});
