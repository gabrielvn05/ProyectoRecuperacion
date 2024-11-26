import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllVideojuegos = async (req: Request, res: Response): Promise<void> => {
  try {
    const videojuegos = await prisma.videojuego.findMany();
    res.json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los videojuegos' });
  }
};

export const getFilteredVideojuegos = async (req: Request, res: Response): Promise<void> => {
  const { plataforma, genero, precioMin, precioMax } = req.query;
  try {
    const videojuegos = await prisma.videojuego.findMany({
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
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar los videojuegos' });
  }
};

export const createVideojuego = async (req: Request, res: Response): Promise<void> => {
  const { nombre, plataforma, genero, precio, descripcion, imagen, fechaLanzamiento } = req.body;

  try {
    const nuevoVideojuego = await prisma.videojuego.create({
      data: {
        nombre,
        plataforma,
        genero,
        precio: parseFloat(precio),
        descripcion,
        imagen,
        fechaLanzamiento: new Date(fechaLanzamiento),
      },
    });


    res.status(201).json({
      ...nuevoVideojuego,
      fechaLanzamiento: nuevoVideojuego.fechaLanzamiento.toISOString().split('T')[0],
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el videojuego' });
  }
};

export const getVideojuegos = async (req: Request, res: Response): Promise<void> => {
  const { plataforma, genero, precioMin, precioMax } = req.query;

  try {
    const filtros: any = {
      where: {}
    };

    if (plataforma) {
      filtros.where.plataforma = {
        contains: plataforma as string,
        mode: 'insensitive',  
      };
    }

    if (genero) {
      filtros.where.genero = {
        contains: genero as string,
        mode: 'insensitive',
      };
    }

    if (precioMin) {
      filtros.where.precio = {
        gte: parseFloat(precioMin as string), 
      };
    }

    if (precioMax) {
      filtros.where.precio = {
        lte: parseFloat(precioMax as string), 
      };
    }

    const videojuegos = await prisma.videojuego.findMany(filtros);

    res.status(200).json(videojuegos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los videojuegos' });
  }
};
