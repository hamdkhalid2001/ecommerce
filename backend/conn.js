const mongoose = require('mongoose')

const connectdb = ()=>{
    mongoose.connect(process.env.DB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true   
}).then((data)=>{
    console.log(`Mongodb connected with sever ${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})
}

module.exports = connectdb
