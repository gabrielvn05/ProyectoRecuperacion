import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
 
  await prisma.videojuego.deleteMany();

 
  await prisma.videojuego.createMany({
    data: [
      {
        nombre: 'Elden Ring',
        plataforma: 'PC',
        genero: 'RPG',
        precio: 59.99,
        descripcion: 'Un juego épico.',
        imagen: 'https://imagen-ejemplo.com/eldenring.jpg',
        fechaLanzamiento: new Date('2022-02-25'),
      },
      {
        nombre: 'Cyberpunk 2077',
        plataforma: 'PC',
        genero: 'Acción',
        precio: 49.99,
        descripcion: 'Un mundo abierto futurista.',
        imagen: 'https://imagen-ejemplo.com/cyberpunk2077.jpg',
        fechaLanzamiento: new Date('2020-12-10'),
      },
    ],
  });
});

afterAll(async () => {
  await prisma.$disconnect(); 
});

describe('Videojuegos API', () => {
  it('Debe obtener todos los videojuegos', async () => {
    const res = await request(app).get('/api/videojuegos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debe filtrar videojuegos por plataforma y género', async () => {
    const res = await request(app)
      .get('/api/videojuegos/filtrar')
      .query({ plataforma: 'PC', genero: 'RPG' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          plataforma: 'PC',
          genero: 'RPG',
        }),
      ])
    );
  });

  it('Debe crear un videojuego', async () => {
    const nuevoVideojuego = {
      nombre: 'Elden Ring',
      plataforma: 'PC',
      genero: 'RPG',
      precio: 59.99,
      descripcion: 'Un juego épico.',
      imagen: 'https://imagen-ejemplo.com/eldenring.jpg',
      fechaLanzamiento: '2022-02-25',
    };

    const res = await request(app).post('/api/videojuegos').send(nuevoVideojuego);

    expect(res.statusCode).toBe(201);

    const fechaLanzamientoDevuelta = new Date(res.body.fechaLanzamiento).toISOString().split('T')[0];
    expect(fechaLanzamientoDevuelta).toBe(nuevoVideojuego.fechaLanzamiento);
    
    expect(res.body).toMatchObject({
      nombre: nuevoVideojuego.nombre,
      plataforma: nuevoVideojuego.plataforma,
      genero: nuevoVideojuego.genero,
      precio: nuevoVideojuego.precio,
      descripcion: nuevoVideojuego.descripcion,
      imagen: nuevoVideojuego.imagen,
    });
  });
});
