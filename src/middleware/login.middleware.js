import {compare} from '../config/bcrypt.config.js'
import { Users } from '../models/user/users.js';


const loginMiddleware = async (req,res,next) => {
    try {
        const {username,password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                status:400,
                msg:"iltimos hamma malumotlarni to'liq kiriting",
                error:'data error'
            })
        }

        const findUser = await Users.findOne({where:{username}});

        if(!findUser){
            return res.status(401).json({
                status:401,
                msg:`foydalanuvchi topilmadi`
            }) 
        }

        const checkPassword = await compare(password,findUser.password);
       

        if(!checkPassword){
            return res.status(401).json({
                status:401,
                msg:`parol noto'g'ri`
            })
        }
        next()
    } catch (error) {

        res.status(500).send('internal server error:',error)
        
    }
}

export {loginMiddleware}