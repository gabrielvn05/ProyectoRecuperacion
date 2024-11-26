"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videojuegosController_1 = require("../controllers/videojuegosController");
const router = (0, express_1.Router)();
router.get('/videojuegos', videojuegosController_1.getAllVideojuegos);
router.get('/videojuegos/filtrar', videojuegosController_1.getFilteredVideojuegos);
router.post('/videojuegos', videojuegosController_1.createVideojuego);
exports.default = router;
