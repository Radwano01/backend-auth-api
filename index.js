const express = require("express")
const app = express()

const _PORT = 9900
app.use(express.json())

const cors = require("cors")
app.use(cors())

const AuthRoute = require("./routes/Auth").router

const {Database} = require("./mongo/db")

Database
.then(()=>{
    app.listen(_PORT, ()=>{
        console.log("YOUR SERVER RUNNING AT:", _PORT)
    })
})
.catch((err)=>{
    console.log(err)
})


app.use("/api/auth", AuthRoute)