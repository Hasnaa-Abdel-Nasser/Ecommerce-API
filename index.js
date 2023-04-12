import express from 'express';
import connect from './database/dbConnection.js';
import BrandRouter from './src/modules/brands/brands.routes.js';
import categoryRouter from './src/modules/category/category.routes.js';
import subcategoryRouter from './src/modules/subcategory/subcategory.routes.js';
import productRouter from './src/modules/products/products.routes.js';
import { AppError } from './src/utils/response.error.js';
import userRouter from './src/modules/users/users.routes.js';
import reviewRouter from './src/modules/reviews/review.routes.js';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(morgan('dev')) // request logger middelware 
app.use(express.static('uploads'));
app.use('/brand',BrandRouter);
app.use('/category' , categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/products', productRouter);
app.use(userRouter);
app.use('/review' , reviewRouter);
app.all('*',(req , res , next)=>{
    next(new AppError('Not Found' , 404));
});
//Global error
app.use((err , req , res , next)=>{
    res.status(err.statusCode).json({message: err.message});
})
app.listen(port , ()=>{
    console.log('listening on port ' + port);
});
