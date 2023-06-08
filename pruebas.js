// Crear la base de datos
//use videoclubDB

//Mostrar las bases de datos creadas
//show database

// VideoclubDB no aparecerá hasta que le introduzcamos datos

// crear la colección
db.createCollection('usuarios')
// Añadir el primer dato.


db.usuarios.insertOne({"Nombre" : "Pedro", "Apellido" : "López"})
usuario2 = {"Nombre" : "Luis", "Apellido" : "Gómez"}
db.usuarios.insertOne(usuario2)

db.usuarios.find()

db.usuarios.insertMany([{"Nombre": "Txomin","Apellido": "López"},{"Nombre": "Anabel","Apellido": "Gómez"},{"Nombre": "Denis","Apellido": "Almandoz"}, {"Nombre": "David","Apellido": "Tobias"}])

// Busco todos los que cumplen la condición
db.usuarios.find({Nombre:"Anabel"})
db.usuarios.find({Apellido: "Gómez"})

// Busco el primero que cumple la condición
db.usuarios.findOne({Apellido: "Gómez"})

db.usuarios.find({Apellido: "Gómez"}).count()

db.usuarios.find({Apellido: "Gómez"}).limit(1)

// Obtener el elemento 5
db.usuarios.find().skip(4).limit(1)

// Ordenar la salida
db.usuarios.find().sort({Nombre :1})
db.usuarios.find().sort({Apellido :-1})

// Modificar documentos (registros)
// Sólo un documento (el primer documento)
db.usuarios.updateOne({Nombre: "David"},{$set: {Nombre: "David Tobías"}})
db.usuarios.updateOne({Nombre: "David Tobías"},{$set: {Apellido: "Martín"}})

// Muchos documentos
db.usuarios.updateMany({Nombre: "Anabel"},{$set: {Edad: 25, Ciudad: "Hondarribia"}})
db.usuarios.updateMany({Nombre: "David"},{$set: {Edad: 27, Ciudad: "Irun"}})
//Cada vez que actualizo una clave nueva, se crea la clave
db.usuarios.updateMany({Nombre: "Pedro"},{$set: {Edad: 45, Ciudad: "San Sebastián"}})

// Mayor de 34
db.usuarios.find({Edad: {$gt: 45}}).sort({Nombre :1})
// Mayor o igual de 34
db.usuarios.find({Edad: {$gte: 45}}).sort({Nombre :1})
// menores lt, y menores o iguales lte
db.usuarios.find({Edad: {$lt: 27}}).sort({Nombre :1})
db.usuarios.find({Edad: {$lte: 27}}).sort({Nombre :1})

// Añadir la clave Oficio a todos los documentos. La clave Oficio tiene el valor por defecto "Programador"
db.usuarios.updateMany({},{$set:{Oficio: "Programador"}})

// update en documento inexistente lo crea si lleva upsert:true
db.usuarios.updateOne({Nombre: "Perico", Apellido: "De Los Palotes"},{$set: {Nombre: "Perico", Edad: 67, Ciudad: "Toledo"}},{upsert:true})

// Incremento de una variable numérica
db.usuarios.updateMany({Nombre: "Perico"},{$inc: {Edad: 1}})
db.usuarios.updateMany({},{$inc: {Edad: 2}})

// Renombrar un campo (clave)
db.usuarios.updateMany({Apellido : "López"}, {$rename: {Oficio: "Profesion"}})
// A todos
db.usuarios.updateMany({}, {$rename: {Oficio: "Profesion"}})

// Borrar
db.usuarios.find({Nombre: "Txomin"})
db.usuarios.deleteOne({Nombre: "Txomin"})

// Poner la edad a 18 en todos los menores de edad
db.usuarios.updateMany({ Edad: { $lt: 18 }}, {$set: {Edad: 18}})

// Encontrar los usuarios apellidados López y que son mayores de 20
db.usuarios.find({$and: [{ Edad: { $gte: 20 }},{Apellido: "López"}]})

// Encontrar los usuarios apellidados López o que sean mayores de 50
db.usuarios.find({$or: [{ Edad: { $gte: 50 }},{Apellido: "López"}]})

// a los del find anterior, les cambio la profesión a Profesor
db.usuarios.updateOne({$and: [{ Edad: { $gte: 20 }},{Apellido: "López"}]}, {$set: {Profesion: "Profesor"}})

// Busco los usuarios cuya ciudad sea uno de los valores en la lista
db.usuarios.find({Ciudad: {$in:["San Sebastián", "Irún"]}})

// Busco los usuarios que tengan creada la clave Profesion
db.usuarios.find({Profesion: {$exists: false}})

// A los que no la tengan, se la coloco con el valor por defecto "Parado"
db.usuarios.updateMany({Profesion: {$exists: false}},{$set: {Profesion: "Parado"}})

// A los mayores de 65 años les pongo la Profesión de Jubilado
db.usuarios.updateMany({ Edad: { $gte: 65 }}, {$set: {Profesion: "Jubilado"}})

// Expresiones regulares
// Devuelve todos los que tengan apellido terminado en ez
db.usuarios.find({Apellido: /ez$/})
// Devuelve todos los que tengan apellido empezando en A
db.usuarios.find({Apellido: /^A/})

// Devuelve todos los que tienen apellido compuesto
db.usuarios.find({Apellido: /\w+(?:\s\w+)+/})
// nombre compuesto
db.usuarios.find({Nombre: /\w+(?:\s\w+)+/})

// Seleccionamos los campos que deseamos en la salida
db.usuarios.find({Profesion: "Programador"}, {Nombre:true, Apellido:true})

// O seleccionamos los que no queremos
db.usuarios.find({Profesion: "Programador"}, {Edad:false, Profesion: false})

// Esto es útil, por ejemplo, para ocultar DNI
db.usuarios.updateOne({Nombre: "Denis", Apellido: "Almandoz"}, {$set: {DNI: "12345678J"}})
db.usuarios.find({Profesion: "Programador"}, {DNI:false})

db.usuarios.updateOne({Nombre: "Denis", Apellido: "Almandoz"}, {$unset: {DNI: true}})

// Añado la clave "Direccion" a todos los usuarios (sin valor por defecto)
db.usuarios.updateMany({},{$set: {Direccion: null}})

direccion = {Calle : "Nombre de la calle", Numero: 0, Piso: null, CP: 20000, Provincia: "Gipuzkoa"}
db.usuarios.updateMany({},{$set: {Direccion: direccion}})
db.usuarios.find()

// Pongo la dirección de Denis
direccion = {Calle : "Iturribide", Numero: 23, Piso: 4, CP: 20012, Provincia: "Gipuzkoa"}
db.usuarios.updateOne({Nombre: "Denis"},{$set: {Direccion: direccion}})
db.usuarios.find()

// Pongo la dirección de Txomin
direccion = {Calle : "De la Era", Numero: 12, Piso: 1, CP: 20100, Provincia: "Gipuzkoa"}
db.usuarios.updateOne({Nombre: "Txomin"},{$set: {Direccion: direccion}})
db.usuarios.find()

// Pongo la dirección de Perico
direccion = {Calle : "Kalea", Numero: "11A", Piso: 1, mano: "A Izq", CP: 20100, Provincia: "Gipuzkoa"}
db.usuarios.updateOne({Nombre: "Perico"},{$set: {Direccion: direccion}})
db.usuarios.find()

db.usuarios.find({'Direccion.CP': 20100})

local = {Calle : "Picasso", Numero: 27, Piso: "Bajo", CP: 20110, Provincia: "Gipuzkoa"}
db.usuarios.updateMany({},{$set: {Local: local}})
db.usuarios.find()

local2 =  {Calle : "Gran Vía", Numero: 15, Piso: "Bajo", CP: 20012, Provincia: "Gipuzkoa"}

// Asignar el local 2 a todos los usuarios que viven en el CP 20012
db.usuarios.updateMany({"Direccion.CP": 20012}, {$set: {Local: local2}})

// Añadir dos usuarios más
Juan = {Apellido: 'Rodriguez',Nombre: 'Juan', Ciudad: 'San Sebastián', Edad: 33, Profesion: 'Albañil', Direccion: {Calle: 'Mayor',Numero: '12',Piso: 13,mano: 'B Izq',CP: 20015,Provincia: 'Gipuzkoa'},Local: {Calle: 'Picasso',Numero: 27,Piso: 'Bajo',CP: 20110,Provincia: 'Gipuzkoa'}}
Luis = {Apellido: 'Suárez',Nombre: 'Luis', Ciudad: 'San Sebastián', Edad: 60, Profesion: 'Entrenador', Direccion: {Calle: 'Calleja',Numero: '10',Piso: 2,CP: 20013,Provincia: 'Gipuzkoa'},Local: {Calle: 'Picasso',Numero: 27,Piso: 'Bajo',CP: 20110,Provincia: 'Gipuzkoa'}}

db.usuarios.insertOne(Juan)
db.usuarios.insertOne(Luis)

// Cambiar el local a los que tienen CP entre 20013 y 20020
condicion1 = {"Direccion.CP": {$lte: 20020}}
condicion2 = {"Direccion.CP": {$gte: 20013}}
db.usuarios.find({$and: [condicion1,condicion2]})

db.usuarios.updateMany({$and: [condicion1,condicion2]}, {$set: {Local: local2}})
// Otra Forma
condicion = {"Direccion.CP": {$gte: 20013, $lte: 20020}}
db.usuarios.updateMany(condicion, {$set: {Local: local2}})


// Añado la clave "Películas" a todos los usuarios (sin valor por defecto)
db.usuarios.updateMany({},{$set: {Peliculas: []}})
// Añado un elemento a a la lista de la clave Películas
db.usuarios.updateOne({Nombre: "Anabel"}, {$push: {Peliculas: {Título: "Lo que el viento se llevó", Director: "Victor Fleming"}}})
