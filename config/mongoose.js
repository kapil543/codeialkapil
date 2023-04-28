const mongoose = require('mongoose')

const url = `mongodb+srv://kapil:khicherkapil@cluster0.aylmn1j.mongodb.net/test`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

// const mongoose=require("mongoose");
// const env=require('./environment');
// mongoose.connect('mongodb+srv://kapil kapil:kapilkhicher@cluster0.aylmn1j.mongodb.net/test')
// // mongoose.connect(`mongodb://127.0.0.1/${env.db} `);
// const db=mongoose.connection;
// db.on ("error",console.error.bind(console,'Error connecting mongodb'
// ));
// db.once('open',function(){
//     console.log('connected to Database::MongoDB');
// });
// module.exports=db;
