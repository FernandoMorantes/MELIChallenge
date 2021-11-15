const express = require('express');
const router = express.Router();

const queryItems = require('../services/queryItems');
const getItemById = require('../services/getItemById');
const getBreadcrumb = require('../services/getBreadcrumb');

// Definicion de las rutas para los servicios de items

// Busqueda de items por un parametro de busqueda
router.get('/', async function (req, res) {
    let response = await queryItems.queryItems(req);
    res.status(response.statusCode).send(response)
});

// Informacion de un item por su ID
router.get('/:id', async function (req, res) {
    let response = await getItemById.getItemById(req);
    res.status(response.statusCode).send(response)
});

// Consulta del breadcrumb dado un arreglo de IDs de categorias
router.post('/breadcrumb', async function (req, res) {
    let response = await getBreadcrumb.getBreadcrumb(req);
    res.status(response.statusCode).send(response)
});

module.exports = router;