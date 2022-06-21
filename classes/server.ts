import express from 'express';
import { SERVER_PORT } from "../global/environment";

export default class server{
    public app: express.Application;
    public port:number;

    constructor(){
        this.app= express();
        this.port= SERVER_PORT;
    }

    star(callback: () => void ){
        this.app.listen(this.port,callback);
    }

} 