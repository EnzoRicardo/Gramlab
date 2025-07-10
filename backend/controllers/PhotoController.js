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
        });
        return;
    }

    res.status(201).json(newPhoto);

    res.send("Photo insert");
};


//Remover foto do DB
const deletePhoto = async(req, res) => {

    const {id} = req.params

    const reqUser = req.user

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))

        //checar se a foto existe
        if (!photo) {
            res.status(404).json({erros: ["Foto não encontrada!"]});
            return;
        }

        //checar se a foto pertence ao usuario
        if (!photo.userId.equals(reqUser._id)) {
            res
                .status(422)
                .json({
                    errors: ["Ocorreu um erro, por favor tente novamente mais tarde!"],
                });
        }

        await Photo.findByIdAndDelete(photo._id)

        res
            .status(200)
            .json({id: photo._id, message:"Foto excluída com sucesso!"});
    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada!"]});
        return;
    }
};

module.exports = {
    insertPhoto,
    deletePhoto,
};