const mongoose = require('mongoose');


const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
};
// ---------------------------------validation for email------------------------------------------//
const isValidEmail = function (value) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false
}

//------------------------------------------validation for name and fullName-----------------------------------

const validChar = function (value) {
    if (/^[a-zA-Z]*$/.test(value)) {
        return true
    } else {
        return false
    }
}

// validation for blog title
const validBlogTitle = function (value) {
    if (/^[a-z\d\-_\s]+$/i.test(value)) {
        return true
    } else {
        return false
    }
}

// validation for author title
const validAuthorTitle = function (value) {
    if (["Mr", "Mrs", "Miss"].includes(value)) {
        return true
    } else {
        return false
    }
}

module.exports.isValidObjectId = isValidObjectId
module.exports.isValidEmail = isValidEmail
module.exports.isValidPassword = isValidPassword
module.exports.validChar = validChar
module.exports.validBlogTitle = validBlogTitle
module.exports.validAuthorTitle = validAuthorTitle