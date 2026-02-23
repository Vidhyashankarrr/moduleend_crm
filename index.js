import express from 'express';
import { dbConnect } from './config/db.js';
import userRoute from './src/routes/userRoute.js'; 
import customerRoute from './src/routes/customerRoutes.js'
import casesRoute from './src/routes/casesRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = 4000;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("This is home page of CRM system")
});

app.use('/api',authRoutes);
app.use('/api/users',userRoute);
app.use('/api/customers',customerRoute);
app.use('/api/cases',casesRoute);


dbConnect();//calling the function to connect to db
app.listen(PORT,()=>console.log(`Server is running on port : ${PORT}`));