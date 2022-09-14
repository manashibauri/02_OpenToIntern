const mongoose = require("mongoose")
const CollegeModel= require('../Models/collegeModel')
const VALIDATOR= require('../validator/validation')


// --------------------------------------------------crate college-----------------------------------------------------------------------
const createCollege= async function (req,res){
    try{
         let data= req.body

         if (!data.name) return res.status(400).send({status :false, msg:"name is required"})
         if (!data.fullName) return res.status(400).send({status :false, msg:"fullname is required"})
         if (!data.logoLink) return res.status(400).send({status :false, msg:"logoLink is required"})

         let  name= data.name
         if (!VALIDATOR.validChar(name)) 
         return res.status(400).send({status:false, msg:"name should be alphabet"})

         let fullName= data.fullName
         if (!VALIDATOR.validChar(fullName))
          return res.status(400).send({status:false, msg:"fullName should be alphabet"})

         let logolink= data.logoLink
         if (!VALIDATOR.validurl(logolink))
          return res.status(400).send({status:false, msg:"logolink should be valid"})

         let collegedata= await CollegeModel.create(data)
         res.status(201).send({status:true,data:collegedata, msg:"data created"})
    }
    catch(err){
        res.status(500).send({status:false, msg: err.message})
    }
}

















module.exports.createCollege=createCollege