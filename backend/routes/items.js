const express = require('express');
const router = express.Router();

const queryItems = require('../services/queryItems');
const getItemById = require('../services/getItemById');
const getBreadcrumb = require('../services/getBreadcrumb');

router.get('/', async function (req, res) {
    let response = await queryItems.queryItems(req);
    res.status(response.statusCode).send(response)
});

router.get('/:id', async function (req, res) {
    let response = await getItemById.getItemById(req);
    res.status(response.statusCode).send(response)
});

router.post('/breadcrumb', async function (req, res) {
    let response = await getBreadcrumb.getBreadcrumb(req);
    res.status(response.statusCode).send(response)
});

module.exports = router;