import { DataTypes, Model} from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { Users } from "../user/users.js";




class  chanelMessage extends Model {};


chanelMessage.init({
    chanel_message_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    chanel_message:{
        type:DataTypes.TEXT
    }
},{
    sequelize,
    tableName:'chanel_message'
})



export {chanelMessage}