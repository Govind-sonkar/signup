const express = require('express'); // require express .
const app = express();
require("dotenv").config({path: './.env'})
const port= process.env.PORT
const router = require('./routes/routes');  // router import from {folder(rooutes), file{routes.js}}

app.use(express.json()) // express use json formate.
app.use("/",router)


app.listen(port,()=>{
    console.log(`server connected with port number ${port} .`)
})


