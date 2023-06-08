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
db.usuarios.find({Apellido: /ez$/})
db.usuarios.find({Apellido: /^A/})

db.usuarios.find({Apellido: /\w+(?:\s\w+)+/})


db.usuarios.find({Profesion: "Programador"}, {Nombre:true, Apellido:true})

db.usuarios.find({Profesion: "Programador"}, {Edad:false, Profesion: false})

db.usuarios.updateOne({Nombre: "Denis", Apellido: "Almandoz"}, {$set: {DNI: "12345678J"}})

db.usuarios.updateOne({Nombre: "Denis", Apellido: "Almandoz"}, {$unset: {DNI: true}})
