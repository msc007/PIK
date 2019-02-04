const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //Make sure data is either string or empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //EMAIL VALIDATION
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    //PASSWORD VALIDATION
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Passwrod field is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}