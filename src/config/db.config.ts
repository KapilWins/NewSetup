import { connect, ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
    
        let DB_url :any= process.env.DATABASE_URL
        connect(DB_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        } as ConnectOptions)
            .then(() => {
                console.log("Connected to MongoDB...");
            })
            .catch((e) => {
                console.error("There was an error connecting to MongoDB:");
                console.error(e);
            });
    