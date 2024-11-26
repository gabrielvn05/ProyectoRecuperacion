"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideojuegos = exports.createVideojuego = exports.getFilteredVideojuegos = exports.getAllVideojuegos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllVideojuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videojuegos = yield prisma.videojuego.findMany();
        res.json(videojuegos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los videojuegos' });
    }
});
exports.getAllVideojuegos = getAllVideojuegos;
const getFilteredVideojuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plataforma, genero, precioMin, precioMax } = req.query;
    try {
        const videojuegos = yield prisma.videojuego.findMany({
            where: {
                AND: [
                    plataforma ? { plataforma: String(plataforma) } : {},
                    genero ? { genero: String(genero) } : {},
                    precioMin ? { precio: { gte: parseFloat(String(precioMin)) } } : {},
                    precioMax ? { precio: { lte: parseFloat(String(precioMax)) } } : {},
                ],
            },
        });
        res.json(videojuegos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al filtrar los videojuegos' });
    }
});
exports.getFilteredVideojuegos = getFilteredVideojuegos;
const createVideojuego = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, plataforma, genero, precio, descripcion, imagen, fechaLanzamiento } = req.body;
    try {
        const nuevoVideojuego = yield prisma.videojuego.create({
            data: {
                nombre,
                plataforma,
                genero,
                precio: parseFloat(precio), // Convertir precio a número
                descripcion,
                imagen,
                fechaLanzamiento: new Date(fechaLanzamiento), // Asegurarte que la fecha sea un objeto Date
            },
        });
        res.status(201).json(nuevoVideojuego);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el videojuego' });
    }
});
exports.createVideojuego = createVideojuego;
const getVideojuegos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plataforma, genero, precioMin, precioMax } = req.query;
    try {
        const filtros = {
            where: {}
        };
        if (plataforma) {
            filtros.where.plataforma = {
                contains: plataforma,
                mode: 'insensitive',
            };
        }
        if (genero) {
            filtros.where.genero = {
                contains: genero,
                mode: 'insensitive',
            };
        }
        if (precioMin) {
            filtros.where.precio = {
                gte: parseFloat(precioMin),
            };
        }
        if (precioMax) {
            filtros.where.precio = {
                lte: parseFloat(precioMax),
            };
        }
        const videojuegos = yield prisma.videojuego.findMany(filtros);
        res.status(200).json(videojuegos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los videojuegos' });
    }
});
exports.getVideojuegos = getVideojuegos;
