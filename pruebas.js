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

db.usuarios.find({Edad: {$gt: 34}}).sort({Nombre :1})

