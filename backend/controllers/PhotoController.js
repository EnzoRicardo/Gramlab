const Photo = require("../models/Photo");
const User = require("../models/User")

const mongoose = require("mongoose");


// inserir foto com usuario relacionado a ela
const insertPhoto = async(req, res) => {
    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });
  
    // Se a foto foi criada com sucesso, retorna dados
    if(!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde."],
        })
    }

    res.status(201).json(newPhoto);

    res.send("Photo insert");
};


module.exports = {
    insertPhoto,
};