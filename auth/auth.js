const jwt = require("jsonwebtoken");
require("dotenv").config({path: '../.env'})
const genratetoken = (data) =>{
    return jwt.sign(data ,process.env.secret_id)    // with (.env and .gitignore file)
}

const veryfytoken = (req,res,next) =>{
    if(req.headers.cookie){
        const token = req .headers.cookie.split("=")[1]
        jwt.verify(token,process.env.secret_id,(err,id)=>{  // with (.env and .gitignore file)
            if(err){
                console.log('token expired');
                next()
            }
            else{
                req.id = id
                next()
            }
        })
    }
    else{
        next()
    }
}

module.exports = {genratetoken,veryfytoken}
