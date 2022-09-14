const CollegeModel= require('../Models/collegeModel')


const createCollege= async function (req,res){
    try{
         let data= req.body
         let collegedata= await CollegeModel.create(data)
         res.status(201).send({status:true,data:collegedata, msg:"data created"})
    }
    catch(err){
        res.status(500).send({status:false, msg: err.message})
    }
}

















module.exports.createCollege=createCollege