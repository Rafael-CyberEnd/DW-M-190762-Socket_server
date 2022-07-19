"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
exports.router = (0, express_1.Router)();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien C:'
    });
});
exports.router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
exports.router.post('/mensajes/:para', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const para = req.params.para;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(para).emit('memsaje-privado');
    res.json({
        ok: true,
        cuerpo,
        de,
        para
    });
});
exports.default = exports.router;
