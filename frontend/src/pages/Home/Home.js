import "./Home.css";

// Componentes
import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem' 
import { Link } from "react-router-dom";


// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const {user} = useSelector((state) => state.auth)
  const {photos, loading} = useSelector((state) => state.photo)
  

  // Carregar todas as fotos
  useEffect(() => {

    dispatch(getPhotos())

  }, [dispatch])

  // Curtir uma foto
  const handleLike = (photo) => {

    dispatch(like(photo._id))

    resetMessage()

  }

  if(loading){
    return <p>Carregando..</p>
  }

  return (
  <div id="home">
    {photos && photos.map((photo) => ( 
      <div key={photo._id}>
        <PhotoItem photo={photo} />
        <LikeContainer photo={photo} user={user} handleLike={handleLike} />
        <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
      </div>
    ))}
    {photos && photos.length === 0 && (
      <h2 className="no-photos">
        Ainda não há fotos publicadas, 
        <Link to={`/users/${user.id}`}>Clique aqui</Link>
      </h2>
    )}
  </div>
  );
};

export default Home;