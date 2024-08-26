import { Request, Response } from "express"
import Product from "../models/Product.model"

// Siempre que interatuamos con modelos las funciones son asincronas usar ASYNC / AWAIT

export const getProducts = async (req:Request, res:Response) => {
    const products = await Product.findAll({
        order:[
            ['price', 'DESC']
        ],
        // limit: 2,
        // attributes: {exclude: ['createdAt' , 'updatedAt', 'availability']}
    })
    res.json({data: products})
}

export const getProductsById = async (req:Request, res:Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: "Producto No Encontrado"
        })
    }
    
    res.json({data: product})
}

export const createProduct = async (req:Request, res:Response) => {
    // Validación dentro del handle
    // await check('name')
    //     .notEmpty().withMessage('El nombre del Producto no puede ir vacio')
    //     .run(req)
    // await check('price')
    //     .isNumeric().withMessage('Valor no valido')
    //     .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    //     .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    //     .custom( valor =>  valor > 0).withMessage('Precio Valido')
    //     .run(req)

    // Creamos el Producto, con el objecto o  modelo de producto
    const product = await Product.create(req.body)

    // Segunda Forma de Guardar un productos
    // const product = new Product(req.body)
    // Guardar Producto
    // const savedProduct = await product.save()

    res.status(201).json({data: product})
}

export const updateProduct = async (req:Request, res:Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: "Producto No Encontrado"
        })
    }

    // Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req:Request, res:Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: "Producto No Encontrado"
        })
    }

    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data: product})
}

export const deleteProdut = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: "Producto No Encontrado"
        })
    }

    await product.destroy()
    res.status(200).json({ data: 'Producto Eliminado'})
    // Eliminar
}