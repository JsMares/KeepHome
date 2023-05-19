const express = require('express')
const PORT = process.env.PORT || 5000
var app = express();
var fire = require('./fire')
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  /*res.send(
    //'<h1>API Express & Firebase MonitoreO2</h1><ul><li><p><b>GET /ver</b></p></li><li><p><b>GET /valor</b></p></li><li><p><b>GET /estado</b></p></li><li><p><b>POST /insertar</b>  => {temp, hum, gas, ruido, nombre, fecha}</p></li><li><p><b>POST /encender</b></p></li><li><p><b>POST /apagar</b></p></li><li><p>/encender</p></li><li><p>/apagar</p></li><li><p>/estado</p></li></ul>'
  )*/
  res.render('index.html')
})

app.get('/ver', (req, res) => {
  const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
	db.collection('valores').orderBy('fecha', 'asc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})
app.get('/estados', (req, res) => {
  const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
	db.collection('Rele').orderBy('fecha', 'asc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})
app.get('/estado', (req, res) => {
  const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
    db.collection('Rele').limit(1).orderBy('fecha','desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})

app.get('/valor', (req, res) => {
  const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
	db.collection('valores').limit(1).orderBy('fecha','desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})
app.get('/grafica', (req, res) => {
  const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
	db.collection('valores').limit(10).orderBy('fecha','desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})

app.get('/registro_mayor', (req, res) => {
  const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
	db.collection('valores').limit(10).where('gas', '>', 3000).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
  })
})

app.post('/insertar', (req, res)=>{
  const db = fire.firestore();
	db.settings({
      timestampsInSnapshots: true
    });
    
    db.collection('valores').add({
     
      fecha: new Date().toJSON(),
      gas: req.body.gas,
      movimiento: req.body.movimiento,
      ruido: req.body.ruido,
      temperatura: req.body.temperatura
    });
    res.send({
      fecha: new Date().toJSON(),
      gas: req.body.gas,
      movimiento: req.body.movimiento,
      ruido: req.body.ruido,
      temperatura: req.body.temperatura,
      status: '¡Valores insertados!'
  })
})

app.post('/encender', (req, res)=>{
  const db = fire.firestore();
	db.settings({
      timestampsInSnapshots: true
    });
    db.collection('Rele').add({
      r1: true,
      nombre: req.body.nombre,
      fecha: new Date()
    });
    res.send({
      r1: true,
      nombre: req.body.nombre,
      fecha: new Date(),
      status: 'Rele encendido'
  })
})
app.post('/apagar', (req, res)=>{
  const db = fire.firestore();
	db.settings({
      timestampsInSnapshots: true
    });
    db.collection('Rele').add({
      r1: false,
      nombre: req.body.nombre,
      fecha: new Date()
    });
    res.send({
      r1: false,
      nombre: req.body.nombre,
      fecha: new Date(),
      status: 'Rele apagado'
  })
})

app.listen(PORT, () => {
  console.log(`escuchando en puerto ${ PORT }`)
})
