const express = require("express")  // here require express .
const router = express.Router()
const knex = require("../config/db")    // import knex with {folder(config),file(db.js)}.
const {genratetoken,veryfytoken} = require("../auth/auth"); // import (auth.js) file .
const jwt = require("jsonwebtoken") // require jwt.


router.post("/signup", async(req, res)=>{
    try{
        await knex('user_data').insert(req.body)
        res.send("signup successfully.....")
    }catch(err){
        res.send({err})
    }
})

router.post("/login", async(req, res)=>{

    try{
        const data = await knex("user_data").where({email:req.body.email, password:req.body.password})

        if(data.length != 0){

            const token = genratetoken(data[0].id) 
            const  m =req.headers.cookie

            res.cookie("token",token)
            res.send({"status":"login successfully....."})
            console.log("this is my secret_key :",process.env.secret_id);        
        }
        else{
            res.send({"status":"invalid email or password..."})
        }
    }catch(err){
        console.log(err);
    }
    
})

router.get("/show", veryfytoken, async(req, res)=>{
    try{
        const data = await knex("user_data").where({id:req.id})
        if(data!=0){
            res.send({"user loged name ":data[0]['name']})
        
        }

    }catch(err){
        res.send({"status":"user not loged....."})
    }

})    

router.put("/update",veryfytoken,async(req,res)=>{
    try{

        const data = await knex("user_data")
        .where("id",req.id)
        .update(req.body)
        res.send({"status":"update sucessfullay.... "})
    }catch(err){
        res.send("user not loged.....")
    }
})

router.get("/logout", (req, res)=>{
        
    res.clearCookie("token")
    res.send({"status":"user logout successfully....."})
    
})  

module.exports = router // router export to file (server.js).