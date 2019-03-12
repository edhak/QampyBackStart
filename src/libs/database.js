const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/users',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify:false
})
.then(db => console.log('Db is connected'))
.catch(err => console.error(err))
