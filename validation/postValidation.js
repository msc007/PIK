const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');

module.exports = function validatePostInput(data) {
    let errors = {};

    //Make sure data is either string or empty string
    data.title = !isEmpty(data.title) ? data.title : '';

    //TITLE VALIDATION
    if(Validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    };
};