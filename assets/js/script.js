let lista = [
    { id: 1, nombre: 'Hacer mercado'},
    { id: 2, nombre: 'Estudiar para la prueba' },
    { id: 3, nombre: 'Sacar a pasear a Tobby' },
];

const inputTarea = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const totalTareas = document.getElementById('total-tareas');
const tareasRealizadas = document.getElementById('tareas-realizadas');

// Inicializa ultimoIdAsignado buscando el máximo ID en la lista inicial
let ultimoIdAsignado = lista.length > 0 ? Math.max(...lista.map(tarea => tarea.id)) : 0;

//Se agrega nueva tarea sin repetir nombre
const tareaExiste = (nombreTarea) => {
    return lista.some(tarea => tarea.nombre.toLowerCase() === nombreTarea.toLowerCase());
};

btnAgregar.addEventListener("click", () => {
    const nuevaTarea = inputTarea.value;
    if (nuevaTarea.trim() === "") {
        alert("Por favor, ingresa una tarea.");
        return;
    }

    if (tareaExiste(nuevaTarea)) {
        alert("Esta tarea ya existe en la lista.");
    } else {
        ultimoIdAsignado++;
        lista.push({ id: ultimoIdAsignado, nombre: nuevaTarea });
        renderTask();
        inputTarea.value = '';
    }
});

//Muestra todas las tareas que estan en la lista Todo
const renderTask = () => {
    listaTareas.innerHTML = lista.map((elemento, index) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${elemento.id}</span>
            <span>${elemento.nombre}</span>
            <div class="cajas">
                <input class="form-check-input me-4" type="checkbox" id="flexCheckDefault-${index}" ${elemento.completed ? 'checked' : ''}>
                <span class="cruz" style="color: red; font-size: 1em; cursor: pointer;">✘</span>
            </div>
        </li>
    `).join('');

    totalTareas.textContent = lista.length;
    tareasRealizadas.textContent = lista.filter(tarea => tarea.completed).length;

    listaTareas.querySelectorAll('.form-check-input').forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            lista[index].completed = checkbox.checked;
            tareasRealizadas.textContent = lista.filter(tarea => tarea.completed).length;
        });
    });
};

//Para eliminar la linea completa de la tarea en caso de apretar la cruz
listaTareas.addEventListener('click', (event) => {
    if (event.target.classList.contains('cruz')) {
        const tareaParaBorrar = event.target.closest('.list-group-item');
        const index = Array.from(listaTareas.children).indexOf(tareaParaBorrar);
        if (index > -1) {
            lista.splice(index, 1);
            renderTask();
        }
    }
});

renderTask();