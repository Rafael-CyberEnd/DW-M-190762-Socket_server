import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';


export const router = Router();

router.get('/mensajes', (req: Request, res: Response) =>{
    res.json({
        ok:true,
        mensaje:'Todo esta bien C:'
    }); 
});
 router.post('/mensajes', (req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo
    const de = req.body.de
    const payload = {cuerpo, de};
    const server= Server.Instance;
    server.io.emit('mensaje-nuevo',payload);

    res.json({
        ok:true,
        cuerpo,
        de
    });
 });

 router.post('/mensajes/:para', (req:Request, res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const para = req.params.para;
    

    const payload = {
        de,
        cuerpo
    }
    const server = Server.Instance;
    server.io.in(para).emit('mensaje-privado',payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        para
    });
 });


 //Servicio para obtener todos los IDs de los usuarios.
 router.get('/usuarios',(req:Request,res:Response)=>{
    const server=Server.Instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});


//obtnener sus usuarios y nombres
router.get('/usuarios/detalle', (  req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

    
});
 export default router;