const inputTarea = document.getElementById('nuevaTarea');
const botonAgregar = document.getElementById('agregarTarea');
const listaDeTareas = document.getElementById('listaDeTareas');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function renderizarTareas() {
    listaDeTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const tareaElemento = document.createElement('div');
        tareaElemento.className = 'tarea';
        if (tarea.completada) {
            tareaElemento.classList.add('completada');
        }
        
        tareaElemento.innerHTML = `
            <span>${tarea.texto}</span>
            <div style="display: flex; gap: 10px; margin-left: auto;">
                <button onclick="marcarCompletada(${index})">✔️</button>
                <button onclick="eliminarTarea(${index})">❌</button>
            </div>
        `;
        
        listaDeTareas.appendChild(tareaElemento);
    });
}
function agregarTarea() {
    const textoTarea = inputTarea.value.trim();
    if (textoTarea) {
        tareas.push({ texto: textoTarea, completada: false });
        inputTarea.value = '';
        actualizarLocalStorage();
        renderizarTareas();
    }
}

function marcarCompletada(index) {
    tareas[index].completada = !tareas[index].completada;
    actualizarLocalStorage();
    renderizarTareas();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarLocalStorage();
    renderizarTareas();
}

function actualizarLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

botonAgregar.addEventListener('click', agregarTarea);
document.addEventListener('DOMContentLoaded', renderizarTareas);
