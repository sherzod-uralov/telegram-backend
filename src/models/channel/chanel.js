import { DataTypes,Model} from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { Users } from "../user/users.js";
import { chanelMessage } from "./chanel_message.js";


class  chanel extends Model {};


chanel.init({
    chanel_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    chanel_picture:{
        type:DataTypes.TEXT
    },
    chanel_link:{
        type:DataTypes.STRING(30)
    },
    chanel_name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    chanel_bio:{
        type:DataTypes.TEXT
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:true
    },
    type:{
        type:DataTypes.STRING(20)
    }
},{
    sequelize,
    tableName:'chanel'
})



chanel.hasMany(chanelMessage,{foreignKey:"chanel_id"})

export {chanel}