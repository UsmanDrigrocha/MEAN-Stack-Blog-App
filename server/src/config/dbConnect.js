const mongoose = require('mongoose');

const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dbVar = process.env.DB_VAR || "mongodb://127.0.0.1:27017/MERN_BLOG";

mongoose.connect(dbVar).then(() => {
    if (dbVar.includes('mongodb://127.0.0.1:27017')) {
        return console.log("Local DB Connected !");
    }
    console.log('Live DB Connected');
}).catch((err) => {
    console.error('DB Connection Error:', err.message);
});