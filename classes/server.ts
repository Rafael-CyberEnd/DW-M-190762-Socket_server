import express from 'express';
import { SERVER_PORT } from "../global/environment";
import  socketIO  from 'socket.io';

import http from "http";

import * as socket from'../sockets/sockets';

export default class Server{
    /*private static _instance: Server;*/
    public app: express.Application;
    public port:number;

    public io: socketIO.Server;
    private httpServer: http.Server;
    static instance: any;

     constructor(){
        this.app= express();
        this.port= SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer,{
            cors: {origin:true, credentials:true}
        });
        this.escucharSockets();
        


    }
   /*public static get instance(){
        return this._instance || (this._instance = new this());

    }*/


    private escucharSockets(){
       
        this.io.on('connection', (cliente) => {
            //console.log('cliente conectado');
           //conectar cliente
           socket.conectarCliente(cliente);


            //configurar usuario
            socket.configurarUsuario(cliente,this.io)

            console.log(cliente.id);
            //mensaje
            socket.mensaje(cliente, this.io);
           //Deconectar 
           socket.desconectar(cliente);

           
        });
    }

    star(callback: Function ){
        this.httpServer.listen(this.port,callback());
    }
       
} 