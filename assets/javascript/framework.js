// navbar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('collapseIcon');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.toggle('collapsed');
        // Cambia el ícono según el estado
        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.textContent = 'chevron_right';
        } else {
            toggleIcon.textContent = 'chevron_left';
        }
    }
}

// Modales

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

// spinner
function showSpinner() {
    document.getElementById("globalSpinner").classList.remove("hidden");
}

function hideSpinner() {
    document.getElementById("globalSpinner").classList.add("hidden");
}


// Tabs
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");

            // Activar botón
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Mostrar contenido
            const contents = document.querySelectorAll(".tab-content");
            contents.forEach(content => {
                content.classList.remove("active");
                if (content.id === tabId) {
                    content.classList.add("active");
                }
            });
        });
    });
});


// select pro
function toggleCustomSelect(container) {
    const options = container.querySelector('.custom-options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function selectOption(li) {
    const input = li.closest('.custom-select').querySelector('input');
    input.value = li.textContent;
    li.closest('.custom-options').style.display = 'none';
}

function filterOptions(input) {
    const filter = input.value.toLowerCase();
    const options = input.closest('.custom-select').querySelectorAll('li');
    options.forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(filter) ? 'block' : 'none';
    });
}


// JS para validaciones en tiempo real

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('correo-validado');
    const group = document.getElementById('group-email-validado');
    const errorText = group.querySelector('.input-error-text');

    // Mostrar el error inicialmente si está vacío
    if (!emailInput.value.trim()) {
        group.classList.add('error');
        errorText.style.display = 'block';
    }

    emailInput.addEventListener('input', () => {
        if (emailInput.validity.valid) {
            group.classList.remove('error');
            errorText.style.display = 'none';
        } else {
            group.classList.add('error');
            errorText.style.display = 'block';
        }
    });
});

function validateNombre() {
    const input = document.getElementById("nombre-validado");
    const error = document.getElementById("error-nombre");
    error.style.display = input.value.trim().length < 3 ? "block" : "none";
}

function validateEdad() {
    const input = document.getElementById("edad-validada");
    const error = document.getElementById("error-edad");
    const value = parseInt(input.value);
    error.style.display = isNaN(value) || value < 18 || value > 30 ? "block" : "none";
}


// acordeon
function toggleAccordion(element) {
    const body = element.nextElementSibling;
    body.style.display = body.style.display === "block" ? "none" : "block";
}

// objeto selector con buscador interno
document.querySelectorAll('.smart-selector').forEach(selector => {
    const input = selector.querySelector('.smart-selector-search');
    const options = selector.querySelectorAll('.smart-selector-list label');

    input.addEventListener('input', () => {
        const search = input.value.toLowerCase();
        options.forEach(label => {
            const text = label.textContent.toLowerCase();
            label.style.display = text.includes(search) ? 'flex' : 'none';
        });
    });
});

// Floating Alert
// ShowAlert
function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `floating-alert ${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);

    // Nueva duración: 5 segundos (5000ms)
    setTimeout(() => {
        alert.remove();
    }, 6000);
}
// ShowToast
function showToast(type = 'info', message = 'Mensaje') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Eliminar el toast después de 15 segundos
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// ShowToastBoton
function showToastBoton(type = 'info', message = 'Mensaje') {
    console.log('Ejecutando showToastBoton:', type, message);
    const container = document.getElementById('toast-container-boton');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-boton ${type}`;
    toast.innerHTML = `
        <button class="toast-close material-icons" onclick="this.parentElement.remove()">close</button>
        <span>${message}</span>
    `;
    container.appendChild(toast);
}

