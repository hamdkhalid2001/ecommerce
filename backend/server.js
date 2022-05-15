const app = require('./app')
const dotenv = require('dotenv')
const connectdb = require('./conn') 
//configure
dotenv.config({path:'backend/config/config.env'})
connectdb();
const port = process.env.PORT
app.listen(4000, () => {
    console.log(`app listening on port ${4000}`)
})