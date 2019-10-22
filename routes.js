const db = require('./db.js');
const bodyParser = require('body-parser');

/**
 * Esto es un "middleware" que se pasa por parametro en la 
 * declaracion de una ruta.
 * Este middleware, transforma el body en un objeto JSON, 
 * lo cual permite acceder al contenido del body de la request.
 * Accedemos como: req.body.parametro_especifico
 */
const jsonParser = bodyParser.json();

module.exports = app => {
    /**
     * get all teams
     */
    app.get('/teams', (req, res) => {
        res.json(db.teams);
    });

    /**
     * get specific team
     */
    app.get('/teams/:teamId', (req, res) => {
        if(db.teams.hasOwnProperty(req.params.teamId)){
            res.json(db.teams[req.params.teamId]);
        }else{
            res.status(404).json({ error: 'Equipo no encontrado' })
        }
    });

    /**
     * post new team
     */
    app.post('/teams', jsonParser, (req, res) => {
        if(db.teams.hasOwnProperty(req.body.id)){
            res.status(409).json({ error: 'El equipo ya existe' });
        }else{
            db.teams[req.body.id] = req.body;
            res.json(db.teams[req.body.id]);
        }
    });

    /**
     * delete one team
     */
    app.delete('/teams/:teamId', (req, res) => {
        if(db.teams.hasOwnProperty(req.params.teamId)){
            delete db.teams[req.params.teamId];
            res.status(200).json({ error: 'Equipo borrado ok' });
        }else{
            res.status(404).json({ error: 'Equipo no encontrado' });
        }
    });

    /**
     * re asigna valores especificados en body, buscando por paramId desde params
     */
    app.patch('/teams/:teamId', jsonParser, (req, res) => {
        if(db.teams.hasOwnProperty(req.params.teamId)){
            // Asigno diferencia que encuentre nen body directo
            db.teams[req.params.teamId] = Object.assign(db.teams[req.params.teamId], req.body);
            res.json(db.teams[req.params.teamId]);
        }else{
            res.status(404).json({ error: 'Equipo no encontrado' });
        }
    });
}