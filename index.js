// followed the video:    https://www.youtube.com/watch?v=L72fhGm1tfE&t=4s

const express = require('express');
const path = require('path');

const contractControl = require('./ContractControl');
const logger = require('./middlewares/logger');

const app = express();

// init middleware
// app.use(logger);


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// get control-control sheet
app.get('/api/controlsheet', (req, res) => {
    res.json(contractControl);
})


// 1. Set public folder as static -> app.use -> use middleware
app.use(express.static(path.join(__dirname, 'public')));


// User API Routes
app.use('/api/users', require('./routes/api/users'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));