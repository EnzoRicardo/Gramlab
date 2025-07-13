import {api, requestConfig} from '../utils/config'

// Publicar foto do usuario
const publishPhoto = async(data, token) => {

    const config = requestConfig("POST", data, token, true)

    try {
        
        const res = await fetch(api + "/photos", config)
                .then((res) => res.json())
                .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error)
    }
}

// Pegar fotos do usuario
const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        
        const res = await fetch(api + "/photos/user/" +id, config)
                    .then((res) => res.json())
                    .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Deletar uma foto
const deletePhoto = async(id, token) => {

    const config = requestConfig("DELETE", null, token)

    try {
        
        const res = await fetch(api + "/photos/" + id, config)
                .then((res) => res.json())
                .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

// Pegar foto pelo id
const getPhoto = async(id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        
        const res = await fetch(api + "/photos/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)   
    }
};

// Curtir foto
const like = async(id, token) => {
    const config = requestConfig("PUT", null, token)

    try {
        const res = await fetch(api + "/photos/like/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error)
    }
}

const updatePhoto = async(data, id, token) => {

    const config = requestConfig("PUT", data, token) 

    try {
        const res = await fetch(api + "/photos/" +id, config)
                .then((res) => res.json())
                .catch((err) => err)

        return res;
    } catch (error) {
        console.log(error)
    }

}

//Adicionar comentario a foto
const comment = async(data, id, token) => {
    const config = requestConfig("PUT", data, token)
                    
    try {
        const res = await fetch(api + '/photos/comment' + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
};

export default photoService;