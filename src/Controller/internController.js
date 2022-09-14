const InternModel= require('../Models/internModel')


const createIntern= async function (req,res){
    try{
         let data= req.body
         let interndata= await InternModel.create(data)
         res.status(201).send({status:true,data:interndata, msg:"data created"})
    }
    catch(err){
        res.status(500).send({status:false, msg: err.message})
    }
}


module.exports.createIntern=createIntern

// POST /functionup/interns
// Create a document for an intern.

// Also save the collegeId along with the document. Your request body contains the following fields - { name, mobile, email, collegeName}

// Return HTTP status 201 on a succesful document creation. Also return the document. The response should be a JSON object like this

// Return HTTP status 400 for an invalid request with a response body like this