const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/whiskeybusiness', {
});

module.exports = mongoose.connection;