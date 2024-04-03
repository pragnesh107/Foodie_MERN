const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
const corsOptions = {
    origin: "https://foodieme.onrender.com" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/foodData'));
app.use('/api', require('./Routes/orderData'));

const PORT = process.env.PORT || 8000

const fetchData = async () => {
    const FoodItem = mongoose.model('food_items', new mongoose.Schema({}), 'food_items');
    const foodCategory = mongoose.model('food_category', new mongoose.Schema({}), 'food_category');
    try {
        const data = await FoodItem.find({}).exec();
        const catData = await foodCategory.find({}).exec();
        global.food_items = data;
        global.food_category = catData;
        // console.log(global.food_items);
        // console.log(global.catData);
    } catch (error) {
        console.error(error);
    }
};

mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
    fetchData();
}).catch(err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send("Hii");
})