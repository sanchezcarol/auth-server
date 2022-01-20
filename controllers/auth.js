
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res) => {

    const {name, email, password} = req.body;

    try{

        //Verificar email unico
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                msg:'El Email ya existe'
            });
        }

        //Crear user con modelo
        const dbUser = new User( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password  = bcrypt.hashSync(password, salt);
        
        //General JWT 
        const token = await generarJWT(dbUser.id, name)

        //Crear User en BDD
        await dbUser.save();
        
        //Respuesta Exitosa
        return res.status(200).json({
            msg:"Usuario creado correctamente",
            uid: dbUser._id,
            name,
            token
        })

    }catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Something went wrong'
        })

    }
    
}


const login = async(req,res) => {

    const {email,password} = req.body;

    try{

        const dbUser = await User.findOne({email});

        if(!dbUser){
            return res.status(400).json({
                msg:' Credenciales no válidas'
            })
        }

        const validPassword = bcrypt.compareSync( password, dbUser.password);
        
        if(!validPassword){
            return res.status(400).json({
                msg:' Credenciales no válidas'
            })
        }

        //Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        res.json({
            ok:true,
            msg:"Login exitoso",
            uid: dbUser.id ,
            name: dbUser.name,
            token
        });

    }catch(error){
        return res.status(500).json({
            msg:'Something went wrong...'
        })
    }

    
}

const renewToken = (req,res)=>{
    return res.json({
        ok: 'true',
        msg:'renew'
    })
}
 

module.exports = {
    crearUsuario, 
    login,
    renewToken
}