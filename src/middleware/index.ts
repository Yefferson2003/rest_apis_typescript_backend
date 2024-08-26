import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

// middleware para los mensajes de errores de la validacion
export const handleInputErros = (req:Request, res:Response, next:NextFunction) =>{

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    next()

}