const Photo = require("../models/Photo");

const mongoose = require("mongoose");


// inserir foto com usuario relacionado a ela
const insertPhoto = async(req, res) => {
    const {title} = req.body
    const image = req.file.filename

    console.log(req.body);

    res.send("Photo insert");
}


module.exports = {
    insertPhoto,
};