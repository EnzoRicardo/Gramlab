import "./Photo.css";

import { uploads } from "../../utils/config";

// Componentes
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";

// Hooks
import { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";



const Photo = () => {
    const {id} = useParams()

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const {user} = useSelector((state) => state.auth)
    const {photo, loading, error ,message} = useSelector((state) => state.photo)

    // Comentarios
    const [commentText, setCommentText] = useState("")


    // Carregar dados da foto
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    // Like 
    const handleLike = () => {
        dispatch(like(photo._id))

        resetMessage();
    };

    //Comentario
    const handleComment = (e) => {
        e.preventDefault()
    };

    if(loading) {
        return <p>Comentarios...</p>
    }

    return <div id="photo">
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
        <div className="message-container">
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </div>
        <div className="comments">
            <h3>Comentários: ({photo.comments.lenght})</h3>
        </div>
    </div>;
};

export default Photo;