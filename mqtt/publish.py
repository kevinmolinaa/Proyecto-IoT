import paho.mqtt.publish as publish

publish.single("boton_bool", "1", hostname="34.141.155.221")
publish.single("valor_analog", "357", hostname="34.141.155.221")