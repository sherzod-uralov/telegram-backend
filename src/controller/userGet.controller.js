import { verify } from "../config/jwt.config.js";
import { Users } from "../models/user/users.js";

const UserGet = async (req,res) => {
    try {
        
        const verifyToken = verify(req.token,process.env.SEC_KEY);
        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const findgroup = await Users.findAll({where:{user_id:findUser.user_id}})

        res.status(200).send(findgroup);

    } catch (error) {
        console.log(error);
        res.status(500).send('intenal server error');
    }
}

const userProfile = async (req,res) => {
    try {
        let checkPath;

        const {last_name,second_name,bio} = req.body;

        if(req.file && req.file.path){
            checkPath = req.file.path
        }

        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const updateUserInformation = await Users.update({
            last_name,second_name,
            bio,
            profile_image:checkPath || null
        },
        {where: {user_id:findUser.user_id}});

        res.status(200).json({
            status:200,
            msg:'user malumotlari update qilindi',
            updateUserInformation
        })

    } catch (error) {

        res.status(500).send('intenal server error');

    }
}


export {UserGet,userProfile}