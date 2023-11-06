import { verify } from "../config/jwt.config.js";
import { group } from "../models/group/group.js";
import { groupMassage} from "../models/group/group_message.js";
import { Users } from "../models/user/users.js";

const sendMessage = async (req,res) => {
    try {
        
        const {group_message,group_id} = req.body;

        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const findGroup = await group.findOne({where:{group_id}});

        const Group = await groupMassage.create({group_message,group_id,user_id:findUser.user_id});

        return res.status(200).json({
            status:200,
            msg:`${group_message} xabari ${findGroup.group_name} gruppasiga yuborildi`,
            Group     
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
}

const getMessage = async (req,res) => {
    try {
        const {id} = req.params;
        const asotsationUserMessage = await groupMassage.findAll({where:{group_id:id},include:Users});

        res.status(200).json({
            status:200,
            messages:asotsationUserMessage
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
}

export {sendMessage,getMessage} 