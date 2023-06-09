import json

  
# Apertura del archivo
f = open('partido.json')
  
# Conversión en diccionario
data = json.load(f)
  
# Cierre del archivo
f.close()


#print(data)

json_data =json.dumps(data)
import pandas as pd

df = pd.json_normalize(json.loads(json_data), sep='_')

print(df.head())