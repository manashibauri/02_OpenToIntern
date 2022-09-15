
const InternModel = require('../Models/internModel')
const VALIDATOR = require('../validator/validation')
const CollegeModel = require('../Models/collegeModel')
// ----------------------------------------------create intern--------------------------------------------------------------
const createIntern = async function (req, res) {
    try {
        let data = req.body
        let clgName = data.collegeName
        if (Object.keys(data).lenght == 0)
            return res.status(400).send({ status: false, msg: "please provide atleast one key" })

        if (!clgName)
            return res.status(400).send({ status: false, msg: "collegeName is required" })

        if (!data.name)
            return res.status(400).send({ status: false, msg: "name is required" })

        if (!data.email)
            return res.status(400).send({ status: false, msg: "email is required" })

        if (!data.mobile)
            return res.status(400).send({ status: false, msg: "mobile is required" })

        let name = data.name
        if (!VALIDATOR.validChar(name))
            return res.status(400).send({ status: false, msg: "name should be a alphabet" })

        let email = data.email
        if (!VALIDATOR.isValidEmail(email))
            return res.status(400).send({ status: false, msg: "email should be a valid" })

        let mobile = data.mobile
        if (!VALIDATOR.validanumber(mobile))
            return res.status(400).send({ status: false, msg: "mobile should be a valid" })

        if (!VALIDATOR.validChar(clgName))
            return res.status(400).send({ status: false, msg: "clgName should be a alphabet" })


        let clgData = await CollegeModel.findOne({ fullName: clgName }).select({ _id: 1 })//{id:8787879999999995557 }
        let clgId = clgData._id


        if (!clgData) { return res.status(404).send({ status: false, msg: "data not found" }) }
        data["collegeId"] = clgId

        

        let isemailAlreadyUsed = await InternModel.findOne({ email });
        if (isemailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email}  intern email is already registered`, });
            return;
              }

        let ismobileAlreadyUsed = await InternModel.findOne({ mobile });
        if (ismobileAlreadyUsed) {
            res.status(400).send({ status: false, message: `${mobile}  intern  mobile is already registered`, });
            return;
              }

          let saveData = await InternModel.create(data)
         res.status(201).send({ status: true, data: saveData, msg: "data is created" })

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
    }
    
    



module.exports.createIntern = createIntern  

