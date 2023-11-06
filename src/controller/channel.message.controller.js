import { verify } from "../config/jwt.config.js";
import { chanel } from "../models/channel/chanel.js";
import { chanel_connect } from "../models/channel/chanel_connect.js";
import { chanelMessage } from "../models/channel/chanel_message.js";
import { Users } from "../models/user/users.js";


const sendChanelMessage = async (req,res) => {
    try {
        
        const {chanel_message,chanel_id} = req.body;

        if(!chanel_id || !chanel_message){
            return res.status(400).send("malumotlarni to'g'ri va to'liq kiriting!")
        }

        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const find_channel = await chanel.findOne({where:{chanel_id}});


        if (!find_channel) {
            return res.status(404).json({
              status: 404,
              msg: 'bunday kanal mavjud emas',
            });
          }


        const checkAdmin = await chanel_connect.findOne({where:{
            chanel_id,
            user_id:findUser.user_id
        }})

        if (!checkAdmin) {
            return res.status(403).json({
              status: 403,
              msg: `faqat o'zingizga tegishli kanalga post yubora olasiz`,
              error:'admin error'
            });
          }

        const Group = await chanelMessage.create({chanel_message,chanel_id,user_id:findUser.user_id});

        return res.status(200).json({
            status:200,
            msg:`${chanel_message} xabari ${find_channel.chanel_name} kanaliga yuborildi`,   
            Group     
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
    }
}




const getChannelMessage = async (req,res) => {
    try {

        const {id} = req.params;
    
        const chanel_id = id;

        const findChannel = await chanel.findByPk(chanel_id);

        if(!findChannel){
          return  res.status(400).send('bunday idli kanal mavjud emas')
        }

        const asotsationUserMessage = await chanelMessage.findAll({
            where:{chanel_id:id},
            include:Users
    });

 

       return res.status(200).json({
            status:200,
            messages:asotsationUserMessage
        })

    } catch (error) {
       
        res.status(500).send('internal server error');

    }
}





export {sendChanelMessage,getChannelMessage} 