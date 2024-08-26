import { Router } from "express"
import { createProduct, deleteProdut, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/products"
import { body, param } from "express-validator"
import { handleInputErros } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product name
 *           example: Monitor Curvo XL
 *         price:
 *           type: number
 *           description: The Product price
 *           example: 300
 *         availibility:
 *           type: boolean
 *           description: The Product availibility
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */



// Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based an its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 */
router.get('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErros,
    getProductsById
)
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Retunrs a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content: 
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 */
router.post('/', 
    // Validacion en el router
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no Válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom( valor =>  valor > 0).withMessage('Precio no Válido'),
    handleInputErros,
    createProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 1000
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */
router.put('/:id', 
    // Validacion en el router
    param('id').isInt().withMessage('ID no Válido'),
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no Válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom( valor =>  valor > 0).withMessage('Precio no Válido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no Válido'),
    handleInputErros,
    updateProduct
)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availibility
 *      tags:
 *          - Products
 *      description: Return the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  aplication/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */     
router.patch('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErros, 
    updateAvailability
)
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  aplication/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'            
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 *          
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErros,
    deleteProdut
)

export default router