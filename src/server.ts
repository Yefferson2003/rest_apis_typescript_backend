// Configuración del server de nuestra app
import express from "express";
import colors from "colors"; // personalización
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions}  from "./config/swagger";
// Importaciones de otros archivos
import router from "./router";
import db from "./config/db";

// Conectar a la base de datos
async function connetDB() {
    try {
        await db.authenticate( )
        db.sync()
        // console.log(colors.magenta('conexion  exitosa'));
    } catch (error) {
        console.log(error);
        console.log( colors.red('Hubo un error en la conexion de la base de datos'));
    }
}
connetDB()

// --------
// Instancia de express
const server = express()

// Permitir Conexiones
const corsOptions: CorsOptions = {
    origin(requestOrigin, callback) {
        if (requestOrigin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    },
}
server.use(cors(corsOptions))

// Leer datos de formulario
server.use(express.json())

// Morgan
server.use(morgan('dev'))

// Complemento de Router
server.use('/api/products', router)

//DOC
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server