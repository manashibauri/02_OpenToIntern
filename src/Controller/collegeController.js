
const CollegeModel = require('../Models/collegeModel')
const VALIDATOR = require('../validator/validation')
const InternModel = require('../Models/internModel')


// --------------------------------------------------crate college-----------------------------------------------------------------------
const createCollege = async function (req, res) {
    try {
        let data = req.body

        if (!data.name)
            return res.status(400).send({ status: false, msg: "name is required" })

        if (!data.fullName)
            return res.status(400).send({ status: false, msg: "fullname is required" })

        if (!data.logoLink)
            return res.status(400).send({ status: false, msg: "logoLink is required" })

        let name = data.name
        if (!VALIDATOR.validChar(name))
            return res.status(400).send({ status: false, msg: "name should be alphabet" })

        let fullName = data.fullName
        if (!VALIDATOR.validChar(fullName))
            return res.status(400).send({ status: false, msg: "fullName should be alphabet" })

        let logolink = data.logoLink
        if (!VALIDATOR.validurl(logolink))
            return res.status(400).send({ status: false, msg: "logolink should be valid" })
        

        let isnameAlreadyUsed = await CollegeModel.findOne({ name });
        if (isnameAlreadyUsed) {
            res.status(400).send({ status: false, message: `${name} College  name is already registered`, });
            return;
        }

        let collegedata = await CollegeModel.create(data)
        res.status(201).send({ status: true, data: collegedata, msg: "data created" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// ------------------------------------getcollegedetails with res to intern--------------------------------------------------------------------------------

const getCollegeDetails = async function (req, res) {
    try {
        const clgName = req.query.collegeName;
        if (!clgName)
            return res.status(400).send({ status: false, msg: "collegeName is required" })

        const clgData = await CollegeModel.findOne({ name: clgName });

        if (!clgData)
            return res.status(400).send({ status: false, message: "No college found" });

        const collegeDetails = {
            name: clgData.name,
            fullName: clgData.fullName,
            logoLink: clgData.logoLink,
        };
        const clgId = clgData._id;

        const internData = await InternModel.find({ collegeId: clgId }).select({ name: 1, mobile: 1, email: 1 });

        if (internData.length == 0)
            return res.status(400).send({ status: false, message: "No interns for this college" });

        const data = { collegeDetails, interns: internData };
        return res.status(200).send({ status: true, data: data  , msg :"data is fetchout"});

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};



module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails