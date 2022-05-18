import App from './app';
import ('./config/db.config');
import dotenv from 'dotenv';
dotenv.config()

let port:any =process.env.PORT;

new App(port).listen();
