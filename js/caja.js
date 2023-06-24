const url = '../api/api_caja.php';
var data = [];

function readAllUsers() {
    console.log("LLegamos aqui");
    axios({
        method: 'GET',
        url: url,
        responseType: 'json'
    }).then(res => {
        console.log("Hola dentro del then");
        console.log(res.data);
        data = res.data.data;
        console.log(res.data.status);
        if (res.data.status == "error")
            window.location.href = "401.html";
        else
            llenarTabla(data);
    }).catch(error => {
        console.log("No se pudo hacer la petición");
        console.error(error);
    });
}


function llenarTabla(data) {
    const tableBody = document.querySelector('#table-caja tbody');
    let html = '';

    for (let i = 0; i < data.length; i++) {
        html += `
        <tr>
            <td>${data[i].id}</td>
            <td>${data[i].cliente}</td>
            <td>${data[i].producto}</td>
            <td>${data[i].ubicacion}</td>
            <td>${data[i].precio}</td>
            <td>${data[i].fecha}</td>
            <td>
                <button type="button" onclick="deleteUser(${data[i].id})">Borrar</button>
                <button type="button" onclick="updateUser(${data[i].id})">Actualizar</button> 
                <button type="button" onclick="readUserById(${data[i].id})">Leer</button>
            </td>
        </tr>`;
    }
    tableBody.innerHTML = html;
}

function deleteUser(id_del) {
    let user = {
        id: id_del
    };
    axios({
        method: 'DELETE',
        url: url,
        responseType: 'json',
        data: user
    }).then(res => {
        console.log(res.data);
        readAllUsers();
    }).catch(error => {
        console.error(error);
    });
}

function createUser() {
    let cliente = document.getElementById("cliente").value;
    let producto = document.getElementById("producto").value;
    let ubicacion = document.getElementById("ubicacion").value;
    let precio = document.getElementById("precio").value;
    let fecha = document.getElementById("fecha").value;
    // Verificar que los campos requeridos no estén vacíos
    if (cliente === "" || producto === "" || ubicacion === "" || precio === "" || fecha === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }
    let user = {
        cliente: cliente,
        producto: producto,
        ubicacion: ubicacion,
        precio: precio,
        fecha: fecha,
    };

    axios({
        method: 'POST',
        url: url,
        responseType: 'json',
        data: user
    }).then(res => {
        console.log(res.data);
        if (res.data.message === 'Duplicate data')
            alert('Dato duplicado.');
        else
            readAllUsers();
    }).catch(error => {
        console.error(error);
    });
    // Limpiar los campos
    document.getElementById("cliente").value = "";
    document.getElementById("producto").value = "";
    document.getElementById("ubicacion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("fecha").value = "";
}

function updateUser(id_update) {
    cliente_update = document.getElementById('cliente').value;

    if (cliente_update != "") {

        let user = {
            id: id_update,
            cliente: cliente_update,
            producto: document.getElementById('producto').value,
            ubicacion: document.getElementById('ubicacion').value,
            precio: document.getElementById('precio').value,
            fecha: document.getElementById('fecha').value,
        };

        axios({
            method: 'PUT',
            url: url,
            responseType: 'json',
            data: user
        }).then(res => {
            console.log(res.data);
            if (res.data.status === 'error')
                alert('Dato duplicado.');
            else
                readAllUsers();
        }).catch(error => {
            console.error(error);
        });
    }
    else
        alert("Debe colocar un nombre")

}

function readUserById(id) {
    axios({
        method: 'GET',
        url: url + '?id=' + id,
        responseType: 'json'
    }).then(res => {
        console.log(res.data);
        document.getElementById('cliente').value = res.data.data[0].cliente;
        document.getElementById('producto').value = res.data.data[0].producto;
        document.getElementById('ubicacion').value = res.data.data[0].ubicacion;
        document.getElementById('precio').value = res.data.data[0].precio;
        document.getElementById('fecha').value = res.data.data[0].fecha;
    }).catch(error => {
        console.error(error);
    });
}