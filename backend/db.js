const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ndtjdrcoder:Ndt161204@ndt.la9q8wo.mongodb.net/web-walnut?retryWrites=true&w=majority&appName=ndt')
.then(()=>console.log('connected'))
.catch(err => console.log(err)) 