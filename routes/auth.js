

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Nuevo usuario
router.post('/new', [
    check('name', 'El name es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').isLength({min:6}),
    validarCampos
],  
crearUsuario);

//Login 
router.post('/', [
    check('email','El email es requerido').isEmail(),
    check('password','La contraseña es requerido').isLength({min:6}),
    validarCampos
] , login);


//Validar token
router.post('/renew', validarJWT, renewToken)


module.exports = router;