const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Alumno = require('./models/Alumno');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

const swaggerOption ={
    definition: {
        openape: '3.0.0',
        info: {
            title: 'API de Alumnos',
            version: '1.0.0',
            description: 'API para gestionar los alumnos'
        },
        servers: [
            {
                url: 'http://localhost:4435'
            }
        ]
    },
    apis: ['./app.js']
}

const swaggerJsDoc = swaggerJsdoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

app.use(express.json());

const MONGO_URI='mongodb+srv://60183377:tZdn51uuhue0cUdO@cluster0.61pnwkw.mongodb.net/ayuda?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI).then(()=>{
    console.log('Se conecto exitosamente');
}).catch((err)=>{
    console.log('Error encontrado ',err);
});

/**
 * @swagger
 * /alumnos:
 *   post:
 *     summary: Crea un nuevo alumno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Perez
 *               edad:
 *                 type: integer
 *                 example: 20
 *               genero:
 *                 type: string
 *                 example: Masculino
 *               carrera:
 *                 type: string
 *                 example: Ing. de Sistemas
 *               comentarios:
 *                 type: string
 *                 example: Este es un comentario
 *                 description: Campo opcional para observaciones del alumno
 *             required:
 *               - nombre
 *               - apellido
 *               - edad
 *               - genero
 *               - carrera
 *     responses:
 *       201:
 *         description: Alumno registrado con éxito
 *       400:
 *         description: Error al registrar alumno
 */
app.post('/alumnos', async (req, res) => {
    try{
        const nuevoAlumno = new Alumno(req.body);
        await nuevoAlumno.save();
        res.status(201).json({message: 'Alumno registrado corectamente'});
    }catch(error){
        res.status(400).json({message: 'Error al registrar'});
    }
});

/**
 * @swagger
 * /alumnos:
 *  get:
 *      summary: Obtiene todos los alumnos
 *      responses:
 *          200:
 *              description: Lista completa de alumnos
 *          400:
 *              desription: Error al listar 
 */
app.get('/alumnos',async (req, res) => {
    try{
        const listadoAlumnos = await Alumno.find();
        res.status(200).json(listadoAlumnos);
    }catch(err){
        res.status(400).json({message: 'Error al registrar'});
    }
});

app.listen(4435, ()=>{
    console.log('El servidor se ejecuta en el puerto 4435')
});

