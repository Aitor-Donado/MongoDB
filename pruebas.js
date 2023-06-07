use videoclubDB

db.createCollection('usuarios')

db.usuarios.insertOne({"Nombre" : "Pedro", "Apellido" : "López"})
usuario2 = {"Nombre" : "Luis", "Apellido" : "Gómez"}
db.usuarios.insertOne(usuario2)

db.usuarios.find()

db.usuarios.insertMany([{"Nombre": "Txomin","Apellido": "López"},{"Nombre": "Anabel","Apellido": "Gómez"},{"Nombre": "Denis","Apellido": "Almandoz"}, {"Nombre": "David","Apellido": "Tobias"}])


db.usuarios.find({Nombre:"Anabel"})
db.usuarios.find({Apellido: "Gómez"})

db.usuarios.findOne({Apellido: "Gómez"})

db.usuarios.find({Apellido: "Gómez"}).count()

db.usuarios.find({Apellido: "Gómez"}).limit(1)

// Ordenar la salida
db.usuarios.find().sort({Nombre :1})
db.usuarios.find().sort({Nombre :-1})

db.usuarios.updateOne({Nombre: "David"},{$set: {Nombre: "David Tobías"}})
db.usuarios.updateOne({Nombre: "David Tobías"},{$set: {Apellido: "Martín"}})

db.usuarios.updateMany({Nombre: "Anabel"},{$set: {Edad: 25, Ciudad: "Hondarribia"}})

db.usuarios.updateMany({Nombre: "David"},{$set: {Edad: 27, Ciudad: "Irun"}})

db.usuarios.updateMany({Nombre: "Pedro"},{$set: {Edad: 45, Ciudad: "San Sebastián"}})

// Mayor de 34
db.usuarios.find({Edad: {$gt: 45}}).sort({Nombre :1})
// Mayor o igual de 34
db.usuarios.find({Edad: {$gte: 45}}).sort({Nombre :1})

db.usuarios.updateMany({},{$set:{Oficio: "Programador"}})


db.usuarios.updateOne({Nombre: "Perico", Apellido: "De Los Palotes"},{$set: {Nombre: "Perico", Edad: 67, Ciudad: "Toledo"}},{upsert:true})

// Incremento de una variable numérica
db.usuarios.updateMany({Nombre: "Perico"},{$inc: {Edad: 1}})
db.usuarios.updateMany({},{$inc: {Edad: 2}})

// Renombrar un campo (clave)
db.usuarios.updateMany({Apellido : "López"}, {$rename: {Oficio: "Profesion"}})
// A todos
db.usuarios.updateMany({}, {$rename: {Oficio: "Profesion"}})

// Borrar
db.usuarios.deleteOne({Nombre: "Txomin"})

db.usuarios.updateMany({ Edad: { $lte: 18 }, {$set: {Edad: 18}} })