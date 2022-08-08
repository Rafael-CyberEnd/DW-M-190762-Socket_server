import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server
{
    private static _Instance: Server;
    public app: express.Application;
    public port: number;

    public io:socketIO.Server;
    private httpServer : http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer= new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer,
            {
                cors: {origin:true, credentials:true}
            });
        this.escucharSockets();
    }

    public static get Instance(){
        return this._Instance  || (this._Instance = new this());
    }

    private escucharSockets(){
        this.io.on('connection', (cliente) =>{

            //conectar cliente
            socket.conectarCliente(cliente, this.io);

            //console.log('Cliente Conectado');
            // console.log(cliente.id);

            //Configurar Usuario
            socket.configurarUsuario(cliente,this.io);


            //obtnener usuarios activos
            socket.obtenerUsuarios(cliente,this.io);
            //mensaje
            socket.mensaje(cliente,this.io);
            //desconectar
            socket.desconectar(cliente,this.io); 
            //Configurar Usuario
            
        });
    }

    start(callback: Function)  {
        this.httpServer.listen(this.port, callback());
    }
}

