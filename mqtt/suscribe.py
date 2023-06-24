# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt

def on_message(mosq, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

# Definir los valores de usuario y contraseña
username = "kevin"
password = "kevin"

mqttc = mqtt.Client()
mqttc.username_pw_set(username, password)  # Establecer usuario y contraseña
mqttc.on_message = on_message
mqttc.connect("34.141.155.221", 1883, 60)
mqttc.subscribe("#", 0)

mqttc.loop_forever()

