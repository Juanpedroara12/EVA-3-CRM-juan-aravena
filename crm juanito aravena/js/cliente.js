var g_id_cliente = "";

function agregarCliente(){
                //Obtenemos el nombre de cliente desde interfaz 
var dvUser = document.getElementById("txt_Dv").value;                
var nombre_cliente = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var userEmail = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;


if (nombre_cliente.trim(), apellidos.trim() == ""){
  const alertError = `
  <div class="alert alert-danger" role="alert">
  El nombre del cliente o el apeliido no puede estar vacío.

    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
document.getElementById('CrearContainer').innerHTML = alertError;
return; // Detiene la ejecución si el campo está vacío
}

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var fechaHoraActual = obtenerFechaHora();
const raw = JSON.stringify({
  "nombre_cliente": nombre_cliente,
  "dv": dvUser,
  "apellidos": apellidos, 
  "email": userEmail,
  "celular": celular,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      const alertaSucces = `
    <div class="alert alert-primary" role="alert">
    El nombre de cliente fue agregado Correctamente!! Redireccionando....:

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
    document.getElementById('CrearContainer').innerHTML = alertaSucces;
    setTimeout(() => {
      location.href = "listar.html";
    }, 5000);
  }
  if(response.status == 400){
    const alertError = `
    <div class="alert alert-danger" role="alert">
    No es posible realizar esta accion.

      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.getElementById('CrearContainer').innerHTML = alertError; // Agregar alerta al contenedor deseado
}
  

  }
  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}


//Agregar un nuevo método para listar los datos ingresados


function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);
arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML += 
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}


function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosActualizacion(p_id_cliente);



}



function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosEliminacion(p_id_cliente);




}
function obtenerDatosEliminacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


function obtenerDatosActualizacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreCliente = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este cliente? <b>"+nombreCliente +"</b>";
   }
function completarFormularioActualizar(element,index,arr){
 var nombreCliente = element.nombres;
 document.getElementById('txt_nombres').value = nombreCliente;
  }



function actualizarCliente(){
  //Obtenemos el nombre del cliente desde interfaz 
var nombre_cliente = document.getElementById("txt_nombres").value;

if (nombre_cliente.trim(), apellidos.trim() == ""){
  const alertError = `
  <div class="alert alert-danger" role="alert">
  El nombre del cliente o el apellido no puede estar vacío.

    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
document.getElementById('ActualizarContainer').innerHTML = alertError;
return; // Detiene la ejecución si el campo está vacío
}


const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"nombres": nombre_cliente
});

const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
.then((response) => {
  if(response.status == 200) {
    const alertaSucces = `
    <div class="alert alert-primary" role="alert">
    El tipo de gestion fue actualizado Correctamente!! Redireccionando....:
  
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
    document.getElementById('ActualizarContainer').innerHTML = alertaSucces;
    setTimeout(() => {
    location.href = "listar.html";
    }, 5000);
  
  }
  if(response.status == 400){
    const alertError = `
    <div class="alert alert-danger" role="alert">
    No es posible Actualizar!!.
  
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.getElementById('ActualizarContainer').innerHTML = alertError;
  }
  }
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  }

function eliminarCliente(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
.then((response) => {if(response.status == 200) {
  const alertaSucces = `
  <div class="alert alert-primary" role="alert">
  El tipo de gestion fue eliminado Correctamente!!:

    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
  document.getElementById('alertContainer').innerHTML = alertaSucces;
  location.href = "listar.html";
}
//En caso de error
if(response.status == 400){
  const alertError = `
  <div class="alert alert-danger" role="alert">
  No es posible eliminar. El registro esta siendo utilizado!!.

    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
document.getElementById('alertContainer').innerHTML = alertError; // Agregar alerta al contenedor deseado
}
}
)
.then((result) => console.log(result))
.catch((error) => console.error(error));
}


function obtenerFechaHora(){
  var fechaHoraActual = new Date();
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');

 return fechaFormateada;
}
function formatearFechaHora(fecha_registro){
  var fechaHoraActual = new Date(fecha_registro);
  var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit', 
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit', 
    second:'2-digit',
    timeZone:'UTC'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5');

 return fechaFormateada;
}