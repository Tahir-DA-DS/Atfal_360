const express = require("express")
const cors = require('cors')
const app = express()
const connectDB = require("./db/connect")
require("dotenv").config()


const userRouter = require("./Router/admin_userRoute")
const dataRouter = require("./Router/data_router")

const port = process.env.PORT||8080

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//user router
// app.use("/v1",userRouter)

//atfaldata router
app.use("/v1", dataRouter)

app.use(cors())


const start = async ()=> {
    try {
        await connectDB(process.env.URI)
        app.listen(port, ()=>{
            console.log(`connected to the db sucessfully`);
            console.log(`app is listening on port ${port}`);
        })
    } catch (error) {
        console.log("error starting app", error)
    }
    
}

start()