import { DataTypes, Model, STRING, Sequelize, TEXT, useInflection } from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { chanelMessage } from "../channel/chanel_message.js";
import { groupMassage } from "../group/group_message.js";
import { chanel } from "../channel/chanel.js";


class  Users extends Model {};


Users.init({
    user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    profile_image:{
        type:TEXT
    },
    username:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    last_name:{
        type:DataTypes.STRING(100)
    },
    second_name:{
        type:STRING(50)     
    },
    bio:{
        type:DataTypes.TEXT
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull:true
    }
},{
    sequelize,
    tableName:'users'
})




groupMassage.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(groupMassage,{foreignKey:"user_id"});

Users.hasMany(chanel,{foreignKey:"user_id"});
chanelMessage.belongsTo(Users,{foreignKey:"user_id"})

chanel.hasMany(Users,{foreignKey:"user_id"})

export {Users}