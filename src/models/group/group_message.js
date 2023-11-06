import { DataTypes, Model} from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { Users } from "../user/users.js";
import { group } from "./group.js";
import { group_connect } from "./group_connect.js";



class  group_message extends Model {};


group_message.init({
    group_message_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    group_message:{
        type:DataTypes.TEXT
    }
},{
    sequelize,
    tableName:'group_message'
})


export {group_message as groupMassage}