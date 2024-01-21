require('dotenv').config();

require('./config/dbConnect');

const express = require('express');

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/user/',userRoutes)

const port = process.env.PORT || 9000;

app.listen(port,()=>{
    console.log("Server Working !", port)
});

