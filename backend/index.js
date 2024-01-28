const express = require('express');
const mongoDB = require('./db');

const app = express();
const port = 8000;

mongoDB();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/foodData'));  
app.use('/api', require('./Routes/orderData'));  

app.get('/', (req,res)=>{  
    res.send("Hii");
})  

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});