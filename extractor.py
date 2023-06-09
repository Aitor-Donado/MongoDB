import json

  
# Apertura del archivo
f = open('/home/laptop/Proyectos Python/MongoDB/partido.json')
  
# Conversión en diccionario
data = json.load(f)
  
# Cierre del archivo
f.close()


#print(data)

json_data =json.dumps(data)
import pandas as pd

# Normalize no nos satisface
df = pd.json_normalize(json.loads(json_data), sep='_')


data = data["statistics"]
all = data[0]["groups"]

json_all =json.dumps(all)
df = pd.json_normalize(json.loads(json_all), sep='_')

statistics_items = df["statisticsItems"].tolist()
statistics_items

items = []
for elemento in statistics_items:
    items.extend(elemento)

# Prueba 1 convertir la lista de diccionarios en Dataframe
datos_final = pd.DataFrame(items)

# Prueba2 convertir la lista en json y usar normalize
json_items =json.dumps(items)
df = pd.json_normalize(json.loads(json_items), sep='_')

datos_final = datos_final.T


# Establecer la primera fila como nombres de columna
datos_final.columns = datos_final.iloc[0]
datos_final = datos_final[1:]

# Reiniciar los índices si es necesario
#datos_final = datos_final.reset_index(drop=True)


datos_final_home = datos_final.loc["home"].T
datos_final_away = datos_final.loc["away"].T


print(df.head())