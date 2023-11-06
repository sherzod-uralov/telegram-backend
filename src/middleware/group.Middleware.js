import { group } from '../models/group/group.js';

const groupMiddleware = async (req,res,next) => {
    try {
        const {group_name} = req.body;

        if(!group_name){
            return res.status(400).json({
                status:400,
                msg:"malumotlarni to'gri va to'liq kiriting",
                error:'data error'
            })
        }

        const checkGroup = await group.findOne({where:{group_name}});
        

        if(checkGroup){
            return res.status(409).json({
                status:209,
                msg:'bunday gurux allaqachon yaratilgan!',
            })
        }

        next()
    } catch (error) {
    
        res.status(500).send('internal server error:',error)
    }
}

export {groupMiddleware}