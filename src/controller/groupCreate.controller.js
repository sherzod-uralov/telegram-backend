import { verify } from "../config/jwt.config.js";
import { group } from "../models/group/group.js";
import { group_connect } from "../models/group/group_connect.js";
import { groupMassage } from "../models/group/group_message.js";
import { Users } from "../models/user/users.js";


const groupCreate = async (req,res) => {
    try {
        let checkpath;
        const {group_name} = req.body;
        
        if(req.file && req.file.path){
            checkpath = req.file.path
        }

        const token = req.headers.token;

        const verifyToken = verify(token,process.env.SEC_KEY);
        const findUser = await Users.findOne({where:{username:verifyToken.username}});
        

        
   
        const addGroup = await group.create({
            group_name,
            user_id:findUser.user_id,
            isAdmin:true,
            group_picture:checkpath || null
        })

        await group_connect.create({group_id:addGroup.group_id,user_id:findUser.user_id});

       
        res.status(201).json({
            status:201,
            msg:'gruppa muvafaqiyatli yaratildi',
            creator: addGroup
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');

    }
}

const groupGet = async (req,res) => {
    try {
        
        const verifyToken = verify(req.token,process.env.SEC_KEY);
        const findUser = await Users.findOne({where:{username:verifyToken.username}});

        const findgroup = await Users.findAll({where:{user_id:findUser.user_id},
            include: group
        })

        res.status(200).send(findgroup);

    } catch (error) {

        console.log(error);
        res.status(500).send('internal server error');

    }
}


const addGroup = async (req,res) => {
    try {

        const {group_id} = req.body;


        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const find_user = await Users.findOne({where:{username:verifyToken.username}});

        const findGroup = await group.findOne({where:{group_id}});

        const checkConnect = await group_connect.findOne({where:{group_id,user_id:find_user.user_id}});

        if(!findGroup){
            return res.status(404).send('bunday gruppa mavjud emas');
        }

        if(checkConnect){
            return res.status(404).send(`siz ${findGroup.group_name} gruppasida borsiz qayta qo'shila olmaysiz`);
        }

        await group_connect.create({group_id,user_id:find_user.user_id});

        return res.status(200).json({
            status:200,
            msg:`siz ${findGroup.group_name} gruppasiga muvaqiyatli qo'shildingiz`,

        })

    } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');

    }
}

const logoutGroup = async (req,res) => {
    try {
        
        const {group_id} = req.body;

        const verifyToken = verify(req.token,process.env.SEC_KEY);

        const finduser = await Users.findOne({where:{username:verifyToken.username}});

        const findGroup = await group.findOne({where:{group_id}});

        if(!findGroup){
            return res.status(404).send('bunday gruppa mavjud emas');
        }

        const findDeleteGroup = await group_connect.destroy({where:{group_id,user_id:finduser.user_id}});

        return res.status(200).json({
            status:200,
            msg:`${findGroup.group_name} gruppasidan muvafaqiyatli chiqib kettingiz`,
            findDeleteGroup
        })

    } catch (error) {
        res.status(500).send('internal server error');
    }
}

const deleteGroup = async (req,res) => {
    try {

        const {group_id} = req.body;

        const verifyToken = verify(req.token,process.env.SEC_KEY);
        const finduser = await Users.findOne({where:{username:verifyToken.username}});

        const findGroup = await group.findOne({where:{group_id}});

        if(!findGroup){
            return res.status(400).json({
                status:400,
                msg:`bunday gruppa mavjud emas`
            })
        }

        const findgroup = await group.findOne({where:{user_id:finduser.user_id}});

        if(!findgroup){
            return res.status(400).json({
                status:400,
                msg:`faqat o'zingiz tegishli gruppani o'chira olasiz`
            })
        }

        await group.destroy({where:{group_id:group_id}});
        
        res.status(201).json({
            status:201,
            msg:`${findgroup.group_name} gruppasini muvafaqiyatli o'chirdingiz`
        })
    } catch (error) {
        res.status(500).send('internal server error');
    }
}

//post

export {groupCreate,addGroup,logoutGroup,deleteGroup}


//get

export {groupGet}