import { verify } from "../config/jwt.config.js";

const checkToken = async (req,res,next) => {
    try {
        const token = req.headers['token'];

        req.token = token;

        if(!token){
            return res.status(401).json({
                status:401,
                error:'token mavjud emas'
            });
        }

        const verifyToken = verify(token,process.env.SEC_KEY);

        if(!verifyToken){
            return res.status(401).json({
                status:401, 
                error:'token yaroqsiz'
            });
        }
        
        next();
    } catch (error) {
        
        res.status(500).send('internal server errors')
    }
}

export {checkToken}