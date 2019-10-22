const express = require('express');
const routes = require('./routes');

const port = 8080;
const app = express();

routes(app);

app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`)
});