const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoute')
const productRoutes = require('./routes/productRoute')
const cors=require('cors');
const path=require('path');
const { send } = require('process');


const app = express();
dotEnv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('mongodb connected successfully')
}).catch((err) => {
    console.log('DB connection failed')
})

app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)
app.use('/firm', firmRoutes)
app.use('/product', productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(process.env.PORT, () => {
    console.log('server started and running successfully')
});

app.use('/',(req,res)=>{
    res.send("<h1>welcome to Khana Backend")
})

