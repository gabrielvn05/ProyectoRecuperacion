-- CreateTable
CREATE TABLE "Videojuego" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "plataforma" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "fechaLanzamiento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Videojuego_pkey" PRIMARY KEY ("id")
);
