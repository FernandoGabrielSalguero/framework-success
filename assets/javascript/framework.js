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
    initInputIcons();

    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        const id = textarea.id;
        const max = parseInt(textarea.getAttribute('maxlength'), 10);
        const counter = document.querySelector(`.char-count[data-for="${id}"]`);

        if (!counter) return;

        const updateCount = () => {
            const currentLength = textarea.value.length;
            const remaining = max - currentLength;
            counter.textContent = `Quedan ${remaining} caracteres.`;
            counter.classList.toggle('warning', remaining <= 20);
        };

        textarea.addEventListener('input', updateCount);
        updateCount(); // inicial
    });
});

// input icons
function initInputIcons() {
    const mappings = {
        "input-icon-name": "person",
        "input-icon-dni": "badge",
        "input-icon-age": "hourglass_bottom",
        "input-icon-email": "mail",
        "input-icon-phone": "phone",
        "input-icon-date": "event",
        "input-icon-address": "home",
        "input-icon-cuit": "badge",
        "input-icon-cp": "markunread_mailbox",
        "input-icon-globe": "public",
        "input-icon-city": "location_city",
        "input-icon-comment": "comment"
    };

    document.querySelectorAll(".input-icon").forEach(wrapper => {
        const input = wrapper.querySelector("input, select, textarea");
        if (!input) return;

        for (const cls in mappings) {
            if (wrapper.classList.contains(cls)) {
                // Añadir ícono si no existe
                if (!wrapper.querySelector("span.material-icons")) {
                    const icon = document.createElement("span");
                    icon.classList.add("material-icons");
                    icon.textContent = mappings[cls];
                    wrapper.prepend(icon);
                }

                // Aplicar atributos extra por tipo
                switch (cls) {
                    case "input-icon-dni":
                        input.setAttribute("type", "text");
                        input.setAttribute("maxlength", "8");
                        input.setAttribute("pattern", "^[0-9]{7,8}$");
                        input.setAttribute("inputmode", "numeric");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-age":
                        input.setAttribute("type", "number");
                        input.setAttribute("min", "0");
                        input.setAttribute("max", "120");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-name":
                        input.setAttribute("type", "text");
                        input.setAttribute("minlength", "2");
                        input.setAttribute("maxlength", "60");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-email":
                        input.setAttribute("type", "email");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-phone":
                        input.setAttribute("type", "tel");
                        input.setAttribute("pattern", "[0-9\\+\\-\\s]{7,20}");
                        input.setAttribute("inputmode", "tel");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-date":
                        input.setAttribute("type", "date");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-cuit":
                        input.setAttribute("type", "text");
                        input.setAttribute("pattern", "^[0-9]{2}-[0-9]{8}-[0-9]{1}$");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-cp":
                        input.setAttribute("type", "text");
                        input.setAttribute("pattern", "^[0-9]{4,6}$");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-address":
                        input.setAttribute("type", "text");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-city":
                        input.setAttribute("type", "text");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-comment":
                        input.setAttribute("maxlength", "233");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-globe":
                        // Generalmente es un <select>, validamos que tenga "required"
                        input.setAttribute("required", "true");
                        break;
                }

            }
        }
    });
}


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

// document.addEventListener('DOMContentLoaded', () => {
//     const emailInput = document.getElementById('correo-validado');
//     const group = document.getElementById('group-email-validado');
//     const errorText = group.querySelector('.input-error-text');

//     // Mostrar el error inicialmente si está vacío
//     if (!emailInput.value.trim()) {
//         group.classList.add('error');
//         errorText.style.display = 'block';
//     }

//     emailInput.addEventListener('input', () => {
//         if (emailInput.validity.valid) {
//             group.classList.remove('error');
//             errorText.style.display = 'none';
//         } else {
//             group.classList.add('error');
//             errorText.style.display = 'block';
//         }
//     });
// });

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


// categorias de productos
function toggleSubcategorias(btn) {
    const all = document.querySelectorAll('.subcategorias');
    all.forEach(ul => {
        if (ul !== btn.nextElementSibling) {
            ul.style.display = 'none';
        }
    });

    const sub = btn.nextElementSibling;
    sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
}