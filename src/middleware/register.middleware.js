import { Users } from "../models/user/users.js";

const checkRegister = async (req, res, next) => {
    try {
        const { username ,password} = req.body;


        if(!username || !password){
            return res.status(400).json({
                status:400,
                msg:"iltimos hamma malumotlarni to'liq kiriting",
                error:'data error'
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                status:400,
                msg:"parol uzunligi 8 tadan uzun bo'lishi kerak",
                error:'password length error'
            })
        }

        const findUser = await Users.findOne({ where: { username } });

        if (findUser && req.url === '/register') {
            return res.status(409).json({ error: 'Bu usernameli foydalanuvchi allaqachon mavjud' });
        }

        next();
    } catch (error) {
        
        res.status(500).send('Internal server error');
        
    }
}

export { checkRegister };
