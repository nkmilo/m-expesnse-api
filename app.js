const express = require('express');
const app = express();

const expenseRoutes = require('./api/routes/expense');
const tripRoutes = require('./api/routes/trip');
const myExpenseRoutes = require('./api/routes/myExpense');
const morgan = require('morgan');
const res = require('express/lib/response');
const req = require('express/lib/request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://node-shop:'+ process.env.MONGO_ATLAS_PW +'@m-expense.yubcgje.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
//server request routes
app.use('/expenses',expenseRoutes);
app.use('/trips',tripRoutes);
app.use('/myExpenses',myExpenseRoutes)

app.use((req, res, next) =>{
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// app.use((req,res) => {
//     res.status(200).json(
//         {
//             message: 'Server is up and running!'
//         }
//     );
// });

module.exports = app;