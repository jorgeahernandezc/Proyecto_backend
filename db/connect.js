const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const connect = mongoose.connect(process.env.URI,databaseOptions = {
    dbname: 'task-app',
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});

module.exports = connect;

