import { DataTypes, Model} from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { Users } from "../user/users.js";



class  group_connect extends Model {};


group_connect.init({
    group_connect_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
},{
    sequelize,
    tableName:'group_connect'
})


Users.hasMany(group_connect, { foreignKey: "user_id" });
group_connect.hasMany(Users,{foreignKey:"user_id"});

export {group_connect};