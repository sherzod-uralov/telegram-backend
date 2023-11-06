import { signin } from "../config/jwt.config.js";
import { Users } from "../models/user/users.js";

const login = async (req,res) => {
    try {
        const {username,password} = req.body;

        const findUser = await Users.findOne({where:{username}});

        console.log(findUser);

        const loginToken = signin({username,password},process.env.SEC_KEY);



        console.log(loginToken);

         res.status(201).json({
            status:201,
            msg:'akkauntga mufaqiyatli kirildi',
            token:loginToken
        })
    } catch (error) {
        res.status(500).send('internal server error')
    }
}

export {login}