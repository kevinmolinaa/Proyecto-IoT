import paho.mqtt.publish as publish

# Definir los valores de usuario y contraseña
username = "kevin"
password = "kevin"

# Publicar mensajes con autenticación
publish.single("boton_bool", "1", hostname="34.141.155.221", auth={'username': username, 'password': password})
publish.single("valor_analog", "357", hostname="34.141.155.221", auth={'username': username, 'password': password})
