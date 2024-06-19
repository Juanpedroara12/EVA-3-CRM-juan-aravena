var g_id_resultado = "";
function agregarResultado(){
//Obtenemos el nombre de resultado desde interfaz 

var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

if (nombre_resultado.trim() == ""){
  const alertError = `
  <div class="alert alert-danger" role="alert">
  El nombre de resultado no puede estar vacío.

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
  "nombre_resultado": nombre_resultado,
  "fecha_registro": fechaHoraActual
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      const alertaSucces = `
    <div class="alert alert-primary" role="alert">
    El resultado fue agregado Correctamente!! Redireccionando....:

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


// AGREGAR FUNCION DE ALERTA
function alertaDanger(){

}
function alertaSucces(){

}
//Agregar un nuevo método para listar los datos ingresados
function listarResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
  var fechaFormateada = formatearFechaHora(element.fecha_registro);

arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML += 
`<tr>
<td>${element.id_resultado}</td>
<td>${element.nombre_resultado}</td>
<td>${fechaFormateada}</td>
<td>
<a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}
function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;

  obtenerDatosActualizacion(p_id_resultado);
}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;

  obtenerDatosEliminacion(p_id_resultado);
}
function obtenerDatosEliminacion(id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreResultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este resultado? <b>"+nombreResultado +"</b>";
   }
function completarFormularioActualizar(element,index,arr){
 var nombreResultado = element.nombre_resultado;
 document.getElementById('txt_nombre_resultado').value = nombreResultado;
  }

function actualizarResultado(){
  //Obtenemos el nombre del tipo de gestión desde interfaz 
var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

if (nombre_resultado.trim() == ""){
  const alertError = `
  <div class="alert alert-danger" role="alert">
  El nombre de resultado no puede estar vacío.

    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
`;
document.getElementById('ActualizarContainer').innerHTML = alertError;
return; // Detiene la ejecución si el campo está vacío
}



const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"nombre_resultado": nombre_resultado
});

const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
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

function eliminarResultado(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
.then((response) => {
  if(response.status == 200) {
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