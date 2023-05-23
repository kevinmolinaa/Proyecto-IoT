const url = '../api/api_caja.php';
var data = [];

function readAllUsers(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
        }).then(res =>{
            console.log(res.data);
            this.data = res.data.data;
            console.log(res.data.status);
            if((res.data.status=="error"))
                window.location.href = "401.html";
            else
                llenarTabla(data);            
        }).catch(error=>{
                console.error(error);
        });
}

function llenarTabla(data)
{
    document.querySelector('#table-caja tbody').innerHTML = '';
    for(let i=0;i<data.length;i++){
        document.querySelector('#table-caja tbody').innerHTML += 
        `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].cliente}</td>
            <td>${data[i].producto}</td>
            <td>${data[i].ubicacion}</td>
            <td>${data[i].precio}</td>
            <td>${data[i].fecha}</td>
            <td><button type="button" onclick="deleteUser(${data[i].id})">Borrar</button>
            <button type="button" onclick="updateUser(${data[i].id})">Actualizar</button> 
            <button type="button" onclick="readUserById(${data[i].id})">Leer</button> </td>
        </tr>`
    }
}

function deleteUser(id_del){
    let user = { 
        id : id_del };
    axios({
        method:'DELETE',
        url:url,
        responseType:'json',
        data: user
        }).then(res =>{
            console.log(res.data);
            readAllUsers();        
        }).catch(error=>{
            console.error(error);
        });        
}

function createUser(){
let user = { 
    cliente : document.getElementById('cliente').value,
    producto : document.getElementById('producto').value,
    ubicacion : document.getElementById('ubicacion').value,
    precio : document.getElementById('precio').value,
    fecha : document.getElementById('fecha').value,
    };

    axios({
        method:'POST',
        url:url,
        responseType:'json',
        data: user
        }).then(res =>{
            console.log(res.data);
            if(res.data.message==='Duplicate data')
                alert('Dato duplicado.');
            else
                readAllUsers();        
        }).catch(error=>{
            console.error(error);
        });
}

function updateUser(id_update){
    cliente_update = document.getElementById('cliente').value;

    if ( cliente_update!= "")
    {
    
    let user = { 
        id : id_update,
        cliente : cliente_update,
        producto : document.getElementById('producto').value,
        ubicacion : document.getElementById('ubicacion').value,
        precio : document.getElementById('precio').value,
        fecha : document.getElementById('fecha').value,
        };

    axios({
        method:'PUT',
        url:url,
        responseType:'json',
        data: user
        }).then(res =>{
            console.log(res.data);
            if(res.data.status==='error')
            alert('Dato duplicado.');
        else
            readAllUsers();         
        }).catch(error=>{
            console.error(error);
        });
    }
    else
    alert("Debe colocar un nombre")

}

function readUserById(id){
    axios({
        method:'GET',
        url:url + '?id='+ id,
        responseType:'json'
        }).then(res =>{
            console.log(res.data);
            document.getElementById('cliente').value = res.data.data[0].cliente;
            document.getElementById('producto').value = res.data.data[0].producto;
            document.getElementById('ubicacion').value = res.data.data[0].ubicacion;
            document.getElementById('precio').value = res.data.data[0].precio;
            document.getElementById('fecha').value = res.data.data[0].fecha;
        }).catch(error=>{
            console.error(error);
        });
}