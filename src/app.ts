import express, { Application } from "express";
import { json } from "body-parser";
import { route } from './route/user.route';



export default class App {
    public app: Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.connectToRoutes()
    }



    private initializeMiddlewares() {
        this.app.use(json());
    }


    private connectToRoutes() {
        this.app.use(route);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
