import { DataTypes, Model} from "sequelize";
import {sequelize} from "../../config/sequelize.config.js";
import { group_connect } from "./group_connect.js";
import { Users } from "../user/users.js";
import { groupMassage } from "./group_message.js";


class  group extends Model {};


group.init({
    group_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    group_picture:{
        type:DataTypes.TEXT
    },
    group_link:{
        type:DataTypes.STRING(30)
    },
    group_name:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    group_bio:{
        type:DataTypes.TEXT
    },
    isAdmin:{
        type:DataTypes.BOOLEAN
    }
},{
    sequelize,
    tableName:'group'
})

Users.hasMany(group,{foreignKey:'user_id'})
group_connect.belongsTo(group, { foreignKey: "group_id" });
Users.hasMany(group_connect, { foreignKey: "user_id" });
groupMassage.belongsTo(group, { foreignKey: "group_id" });


export {group}