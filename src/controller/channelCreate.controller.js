import { verify } from "../config/jwt.config.js";
import { chanel } from "../models/channel/chanel.js";
import { chanel_connect } from "../models/channel/chanel_connect.js";
import { Users } from "../models/user/users.js";

const createChanel = async (req,res) => {
    try {
        let filepath;

        const {chanel_name} = req.body;
        
        const token = req.headers.token;

        const verifyToken = verify(token,process.env.SEC_KEY);

        const findUser = await Users.findOne({where:{username:verifyToken.username}});
        
        if(req.file && req.file.path){
            filepath = req.file.path
        }
   
        const createChannel = await chanel.create({
            chanel_name,
            user_id:findUser.user_id,
            isAdmin:true,
            chanel_image:filepath || null
        })

        await chanel_connect.create({chanel_id:createChannel.chanel_id,user_id:findUser.user_id});

       
        res.status(201).json({
            status:201,
            msg:'kanal muvafaqiyatli yaratildi',
            creator: createChannel
        })
        
    } catch (error) {

        res.status(500).send('internal server error');

    }
}


const addChannel = async (req,res) => {
    try {

        const {chanel_id} = req.body;


        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const findUSer = await Users.findOne({where:{username:verifyToken.username}});

        const chanel_find = await chanel.findOne({where:{chanel_id}});

        const checkConnect = await chanel_connect.findOne({where:{chanel_id,user_id:findUSer.user_id}});


        if(!chanel_find){
            return res.status(404).send('bunday kanal mavjud emas');
        }

        if(checkConnect){
            return res.status(400).send(`siz ${chanel_find.chanel_name} kanalida borsiz qayta qo'shila olmaysiz`);
        }

        await chanel_connect.create({chanel_id,user_id:findUSer.user_id});

        return res.status(200).json({
            status:200,
            msg:`siz ${chanel_find.chanel_name} kanaliga muvaqiyatli qo'shildingiz`,

        })

    } catch (error) {

        res.status(500).send('internal server error');

    }
}


const logOutChannel = async (req,res) => {
    try {
        
        const {chanel_id} = req.body;

        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const finduser = await Users.findOne({where:{username:verifyToken.username}});

        const user_id = finduser.user_id;


        const find_channel = await chanel.findOne({where:{chanel_id}});

        if(!find_channel){
            return res.status(404).send('bunday kanal mavjud emas');
        }

        const findCheckChannel = await chanel_connect.findOne({where:{
            user_id,
            chanel_id
        }});


        if(!findCheckChannel){
            return res.status(404).send('sizda bunday kanal mavjud emas');
        }

        await chanel_connect.destroy({where:{chanel_id,user_id:finduser.user_id}});

        return res.status(200).json({
            status:200,
            msg:`${find_channel.chanel_name} kanalidan muvafaqiyatli chiqib kettingiz`,
            abondoned_channel: find_channel.chanel_name
        })

    } catch (error) {

        res.status(500).send('internal server error');

    }
}



const deleteChannel = async (req,res) => {
    try {

        const {chanel_id} = req.body;

        const verifyToken = verify(req.token,process.env.SEC_KEY);
        const finduser = await Users.findOne({where:{username:verifyToken.username}});

        const findGroup = await chanel.findOne({where:{chanel_id}});

        if(!findGroup){
            return res.status(400).json({
                status:400,
                msg:`bunday kanal mavjud emas`
            })
        }

        const findgroup = await chanel.findOne({where:{
            chanel_id,
            user_id:finduser.user_id
        }});

        if(!findgroup){
            return res.status(400).json({
                status:400,
                msg:`faqat o'zingiz tegishli kanalni o'chira olasiz`
            })
        }

        await chanel.destroy({where:{chanel_id}});
        
        res.status(201).json({
            status:201,
            msg:`${findgroup.chanel_name} kanalini muvafaqiyatli o'chirdingiz`
        })
    } catch (error) {

        res.status(500).send('internal server error');

    }
}


const getChannel = async (req,res) => {
    try {
        
        const verifyToken = verify(req.token,process.env.SEC_KEY);
        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const findChannel = await chanel.findAll({where:{user_id:findUser.user_id},
            include: Users
        })

        res.status(200).send(findChannel);

    } catch (error) {

        res.status(500).send('internal server error');

    }
}

const chanelCrud = async (req,res) => {
    try {
        let path;

        if(req.file && req.file.path){
            path = req.file.path;
        }

        const {chanel_id,chanel_link,chanel_bio} = req.body;
        

        const verifyToken = verify(req.token,process.env.SEC_KEY);
        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const find_channel = await chanel.findOne({where:{chanel_id}});

        if(!find_channel){
            return res.status(400).json({
                status:400,
                msg:`bunday kanal mavjud emas`
            })
        }

        const checkAdmin = await chanel.findOne({where:{
            chanel_id,
            user_id:findUser.user_id
        }})

        if(!checkAdmin){
            return res.status(400).send(`sizda adminlik huquqi yo'q kanal malummotlarini o'zgartira olmaysiz`)
        }

        await chanel.update({
            chanel_link: `@${chanel_link}`,
            chanel_bio,
            chanel_picture:`${path}` || null
        },{where:{chanel_id}});

        return res.status(200).json({
            status:200,
            msg:`malumotlar muvafaqiyatli o'zgartirildi`
        })

    } catch (error) {
        console.log(error);
    res.status(500).send('internal server error');
    
    }
}

export {createChanel,addChannel,logOutChannel,deleteChannel,getChannel,chanelCrud};