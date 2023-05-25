# -*- coding: utf-8 -*-
import paho.mqtt.publish as publish

# Definir los valores de usuario y contraseña
username = "kevin"
password = "kevin"

# Publicar mensajes con autenticación
publish.single("Led", "1", hostname="34.141.155.221", auth={'username': username, 'password': password})
publish.single("Analogico","Mensaje desde python", hostname="34.141.155.221", auth={'username': username, 'password': password})
