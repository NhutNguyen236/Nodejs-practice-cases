const mongoose = require('mongoose')

var url = 'mongodb+srv://Brandon:Enter123098@testcluster.mzwal.mongodb.net/Users?retryWrites=true&w=majority'
var db = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});
