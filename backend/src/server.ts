import app from './app'
import enc from './util/validateEnv'
import mongoose from 'mongoose'

//1. CONNECT MOGOOSE TO OUR DB MONGODB
//we cant use async await in top level thats why we use then
const port = enc.PORT
mongoose
    .connect(enc.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Mongoose Connected')
        app.listen(port, () => {
            console.log('Server running on port : ' + port)
        })
    })
    .catch(console.error)
