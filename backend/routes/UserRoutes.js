const express = require("express")
const router = express.Router()

//Controle
const {register} = require("../controllers/UserController")

//Middlewares
const validate = require("../middlewares/handleValidation")

//Rotas
router.post("/register", validate, register);

module.exports = router;