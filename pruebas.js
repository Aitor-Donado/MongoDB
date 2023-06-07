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

