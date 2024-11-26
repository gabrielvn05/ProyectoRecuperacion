import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import videojuegosRoutes from './routes/videojuegos';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', videojuegosRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', "public" ,'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app;