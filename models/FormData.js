const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    serial: { type: Number, required: true}
  
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
