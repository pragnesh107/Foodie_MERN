const mongoose = require('mongoose');
const conUrl = "mongodb+srv://admin:Admin321@cluster0.d3k6hrw.mongodb.net/foodie?retryWrites=true&w=majority";

const mongoDB = () => {
    mongoose.connect(conUrl)
        .then(() => {
            console.log("Database connected");
            fetchData();
        })  
        .catch(error => {
            console.log(error);
        });
};

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

module.exports = mongoDB;
