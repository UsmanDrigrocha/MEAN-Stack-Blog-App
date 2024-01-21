const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ['blogger', 'user'], default: 'user' },
}, { timestamps: true });


module.exports = mongoose.model('Users', userSchema);