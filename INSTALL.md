# Instalación del sistema web para control de accesos

* Creación de certificados
```sh
export CERT_NOMBRE="frontend_control_accesos"
export CERT_DIR="certs"
export CERT_CLAVE=admin
export CERT_TAMANO=1024
export CERT_EXPIRACION=365
export CERT_DATOS="/C=BO/ST=La_Paz/L=LP/O=agetic/CN=empresa.com"
mkdir certs
cd certs
openssl req -new -passout pass:$CERT_PASS -newkey rsa:$CERT_TAMANO -days $CERT_EXPIRACION -nodes -x509 -subj "${CERT_DATOS}" -keyout "${CERT_NOMBRE}.key" -out "${CERT_NOMBRE}.crt"
cd ..
```

* Modificar los datos del archivo de configuración (recomendado)
```sh
cp src/app/configuracion.json.ejemplo src/app/configuracion.json
```

* Ejecución del proyecto
```sh
npm start
```
