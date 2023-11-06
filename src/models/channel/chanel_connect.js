import { DataTypes, Model} from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { chanel } from "./chanel.js";
import { Users } from "../user/users.js";


class  chanel_connect extends Model {};


chanel_connect.init({
    chanel_connect_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
},{
    sequelize,
    tableName:'chanel_connect'
})

chanel.hasMany(chanel_connect,{foreignKey:"chanel_id"});
Users.hasMany(chanel_connect,{foreignKey:"user_id"});

export {chanel_connect};