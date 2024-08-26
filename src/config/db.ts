import { Sequelize } from "sequelize-typescript" // OMR
import dotenv from 'dotenv'; // Variables de entorno

// Carga las variables de entorno desde el archivo .env
dotenv.config()

// conexión con la base de datos
const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + '/../models/**/*'],
    logging: false // Ocultar mensajes SQL
})

export default db