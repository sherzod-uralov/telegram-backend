import { chanel } from "../models/channel/chanel.js";

const chanelMiddelware = async (req,res,next) => {
    try {
        const {chanel_name} = req.body;

        if(!chanel_name){
            return res.status(400).json({
                status:400,
                msg:"malumotlarni to'gri va to'liq kiriting",
                error:'data error'
            })
        }

        const checkChannel = await chanel.findOne({where:{chanel_name}});
        

        if(checkChannel){
            return res.status(409).json({
                status:409,
                msg:'bunday kanal allaqachon yaratilgan!',
                errorChanelName:checkChannel.chanel_name
            })
        }

        next()
    } catch (error) {
   
        res.status(500).send('internal server error:',error)
    }
}

export {chanelMiddelware}