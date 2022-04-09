const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
//const multer = require('multer');

//inicializations server
const app = express();


//settings
app.set('port', process.env.PORT || 3500);

//meddlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//global variables
app.use((req, res, next) => {
        next();
    })
    //routes
app.use(require('./routes'));
app.use('/gestion_mascotas', require('./routes/mascotas/mascota_custodia'));

//....ruta registro mascotas

//public files
app.use(express.static(path.join(__dirname, 'public')))
    //starting server
app.listen(app.get('port'), () => {
    console.log('the server is available on ', app.get('port'), ' port')
})