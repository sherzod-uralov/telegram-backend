import { Router } from "express";
import { addGroup, deleteGroup, groupCreate, groupGet, logoutGroup } from "../controller/groupCreate.controller.js";
import { login } from "../controller/login.controller.js";
import { register } from "../controller/register.controller.js";
import { groupMiddleware } from "../middleware/group.Middleware.js";
import { loginMiddleware } from "../middleware/login.middleware.js";
import { checkRegister } from "../middleware/register.middleware.js";
import { checkToken } from "../middleware/checkToken.middleware.js";
import { getMessage, sendMessage } from "../controller/group.message.controller.js";
import { upload } from "../config/multer.config.js";
import { UserGet, userProfile } from "../controller/userGet.controller.js";
import {addChannel, chanelCrud, createChanel, deleteChannel, getChannel, logOutChannel} from '../controller/channelCreate.controller.js'
import { chanelMiddelware } from "../middleware/channelMiddleware.js";
import { getChannelMessage, sendChanelMessage } from "../controller/channel.message.controller.js";


export const router = Router();

//register login
router.post('/login',loginMiddleware,login);
router.post('/register',upload.single('profile_image'),checkRegister,register);


//create group
router.post('/group',upload.single('group_picture'),checkToken,groupMiddleware,groupCreate);

//add group
router.post('/addgroup',checkToken,addGroup);

//logout group
router.post('/logoutgroup',checkToken,logoutGroup);

//delete group
router.delete('/deletegroup',checkToken,deleteGroup)

//send message group
router.post('/groupmessage',checkToken,sendMessage)

//get messages
router.get('/groupmessage/:id',checkToken,getMessage)

//get groups
router.get('/group',checkToken,groupGet);

//user profile information get
router.get('/user',checkToken,UserGet);

//update user profile
router.put('/user',upload.single('profile_image'),checkToken,userProfile)

//channel create
router.post('/chanel',chanelMiddelware,upload.single('chanel_picture'),checkToken,createChanel)

//add channel
router.post('/addchanel',checkToken,addChannel)

//logout channel
router.delete('/logoutchannel',checkToken,logOutChannel)

//delete my channel
router.delete('/deletechannel',checkToken,deleteChannel)

//get all channel 
router.get('/chanel',checkToken,getChannel)

//send a message to the channel
router.post('/chanelmessage',checkToken,sendChanelMessage)

//get channel messages
router.get('/chanelmessage/:id',checkToken,getChannelMessage)

//change channel data
router.post('/channelcrud',upload.single('chanel_picture'),checkToken,chanelCrud);