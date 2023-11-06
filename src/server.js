import express, { urlencoded } from "express";
import 'dotenv/config';
import { sequelize } from "./config/sequelize.config.js";
import {router} from './routers/all.router.js'
import bodyParser from "body-parser";
import path from 'path';
import cors from 'cors';




const bootStart = async () => {
    try {
        const app = express();

        app.use(cors());
        app.use(bodyParser({extended:true}));
        app.use(bodyParser.json());
    
        app.use(express.static(path.join(process.cwd(), "uploads")))
        
        app.use(router)

        
        await sequelize.authenticate();
        await sequelize.sync({alter:true});

        app.listen(process.env.PORT,process.env.HOST, () => console.log('server running'));    

    } catch (error) {
        console.log(error);
    }
};


bootStart();