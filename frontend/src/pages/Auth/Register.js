import "./Auth.css";

//Componentes
import {Link} from 'react-router-dom'
import Message from "../../components/Message";

//Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { register, reset} from "../../slices/authSlice";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispath = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name, 
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispath(register(user));
  };

  useEffect (() => {
    dispath(reset());
  }, [dispath]);

  return (
    <div id="register">
      <h2>GramLab</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos!</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder="Email" autoComplete="new-email"  onChange={(e) => setEmail(e.target.value)} value={email || ""} />
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        <input type="password" placeholder="Confirme a senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""} />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message  msg={error} type="error" />}
      </form>
      <p>Já tem conta? <Link to="/login">Clique aqui.</Link></p>
    </div>
  )
}

export default Register