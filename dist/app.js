"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const videojuegos_1 = __importDefault(require("./routes/videojuegos"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', videojuegos_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', "public", 'index.html'));
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
