const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { database } = require('./keys');

//INICIALIZA EXPRESS 
const app = express();


//CONFIGURACION DE PUERTOS
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

//SE CONFIGURA EL MOTOR DE PLANTILLA


app.set('view engine', '.hbs');
app.set('json spaces', 2);





app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//VARIABLES GLOBALES
app.use((req, res, next) => {
    next();
})

//RUTAS
app.use(require('./routes'));


app.use(express.static(path.join(__dirname, 'public')));


//PARA ARRANCAR EL SERVIDOR 
app.listen(app.get('port'), () => {
    console.log('it is running in', app.get('port'), ' port');
})