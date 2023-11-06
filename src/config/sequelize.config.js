import {Sequelize} from "sequelize";

const sequelize = new Sequelize({
    dialect:'postgres',
    password:'sherzod',
    username:'postgres',
    database:'chat',
    logging:false
}); 


export {sequelize};