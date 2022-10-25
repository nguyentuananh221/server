const express = require('express');
const http =require('http')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
app.get("/",(req,res) => res.send('Kmin PIB Server'));

// import route from routers
const authRouter = require('./routers/auth.route')
const challengerRouter = require('./routers/challenger.route')
const classRouter = require('./routers/class.route')
const missionRouter = require('./routers/mission.route')
const performanceRouter = require('./routers/performance.route')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@kminpib.bnhtwfg.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser :true,
            useUnifiedTopology: true
        })

        console.log('MongDB connected')
    }
    catch (err){
        console.log(err.message)
        process.exit(1)
    }
}
connectDB()

app.use('/api/auth', authRouter)
app.use('/api/chl', challengerRouter)
app.use('/api/class', classRouter)
app.use('/api/mission', missionRouter)
app.use('/api/performance',performanceRouter)






const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log(`Server listening on port ${PORT}`));