const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rodrigo:<senhaDoPai>@cluster0.cffkth6.mongodb.net/?retryWrites=true&w=majority')
mongoose.Promise = global.Promise;

module.exports = mongoose;