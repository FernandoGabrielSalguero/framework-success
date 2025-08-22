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

    // Habilitar botón de publicación si campos requeridos están completos
    const formPublicacion = document.getElementById('form-publicacion');
    const btnGuardar = document.getElementById('btn-guardar');

    if (formPublicacion && btnGuardar) {
        const camposRequeridos = formPublicacion.querySelectorAll('[required]');

        const validarCampos = () => {
            let completo = true;
            camposRequeridos.forEach(campo => {
                if (!campo.value.trim()) {
                    completo = false;
                }
            });

            if (completo) {
                btnGuardar.disabled = false;
                btnGuardar.classList.remove('btn-disabled');
                btnGuardar.classList.add('btn-aceptar');
                btnGuardar.textContent = 'Publicar';
            } else {
                btnGuardar.disabled = true;
                btnGuardar.classList.add('btn-disabled');
                btnGuardar.classList.remove('btn-aceptar');
                btnGuardar.textContent = 'Completar datos...';
            }
        };

        formPublicacion.addEventListener('input', validarCampos);
        validarCampos(); // Verifica al cargar
    }
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
                        input.setAttribute("pattern", "^[0-9]{10}$");
                        input.setAttribute("maxlength", "10");
                        input.setAttribute("inputmode", "tel");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-date":
                        input.setAttribute("type", "date");
                        input.setAttribute("required", "true");
                        break;

                    case "input-icon-cuit":
                        input.setAttribute("type", "text");
                        input.setAttribute("inputmode", "numeric");
                        input.setAttribute("pattern", "^[0-9]{11}$");
                        input.setAttribute("maxlength", "11");
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

// === TUTORIAL GUIADO POR PASOS ===

const tourSteps = [
    {
        element: ".sidebar", // menú lateral
        message: "Este es el menú lateral. Desde aquí navegás por todo el dashboard.",
        position: "right"
    },
    {
        element: "#btn-guardar", // botón guardar del formulario
        message: "Este botón te permite guardar la publicación cuando los datos están completos.",
        position: "top"
    },
];

let currentTourIndex = 0;

function startTour() {
    currentTourIndex = 0;
    createOverlay();
    showTourStep(currentTourIndex);
}

function createOverlay() {
    if (!document.getElementById("tour-overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "tour-overlay";
        document.body.appendChild(overlay);
    }
}

function removeTour() {
    const existing = document.querySelector(".tour-tooltip");
    if (existing) existing.remove();
    const overlay = document.getElementById("tour-overlay");
    if (overlay) overlay.remove();
}

function showTourStep(index) {
    removeTour();

    const step = tourSteps[index];
    const target = document.querySelector(step.element);
    if (!target) return;

    const tooltip = document.createElement("div");
    tooltip.className = "tour-tooltip";
    tooltip.innerHTML = `
    <p>${step.message}</p>
    <div class="tour-actions">
      ${index > 0 ? `<button onclick="prevTourStep()">Anterior</button>` : ""}
      <button onclick="${index < tourSteps.length - 1 ? "nextTourStep()" : "endTour()"}">
        ${index < tourSteps.length - 1 ? "Siguiente" : "Finalizar"}
      </button>
    </div>
  `;

    document.body.appendChild(tooltip);

    // Posicionar tooltip
    const rect = target.getBoundingClientRect();
    const tt = tooltip.getBoundingClientRect();
    let top = 0, left = 0;

    switch (step.position) {
        case "top":
            top = rect.top - tt.height - 10;
            left = rect.left + rect.width / 2 - tt.width / 2;
            break;
        case "right":
            top = rect.top + rect.height / 2 - tt.height / 2;
            left = rect.right + 10;
            break;
        case "bottom":
            top = rect.bottom + 10;
            left = rect.left + rect.width / 2 - tt.width / 2;
            break;
        default:
            top = rect.top - tt.height - 10;
            left = rect.left + rect.width / 2 - tt.width / 2;
    }

    tooltip.style.top = `${Math.max(top, 20)}px`;
    tooltip.style.left = `${Math.max(left, 20)}px`;
}

function nextTourStep() {
    if (currentTourIndex < tourSteps.length - 1) {
        currentTourIndex++;
        showTourStep(currentTourIndex);
    }
}

function prevTourStep() {
    if (currentTourIndex > 0) {
        currentTourIndex--;
        showTourStep(currentTourIndex);
    }
}

function endTour() {
    removeTour();
    showToast("success", "¡Tutorial finalizado!");
}


// funciones de las metricas

function toggleRoundMetric(btn) {
    const card = btn.closest('.metric-round');
    const panel = card.querySelector('.metric-extra-round');
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    // Toggle aria
    btn.setAttribute('aria-expanded', String(!expanded));

    // Abrir/cerrar con altura animada
    if (!expanded) {
        panel.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
        panel.style.maxHeight = panel.scrollHeight + 'px'; // set actual height first
        // force reflow para que la transición ocurra hacia 0
        void panel.offsetHeight;
        panel.style.maxHeight = '0px';
        // al terminar, removemos .open para resetear opacidad
        panel.addEventListener('transitionend', function onEnd(e) {
            if (e.propertyName === 'max-height') {
                panel.classList.remove('open');
                panel.removeEventListener('transitionend', onEnd);
            }
        });
    }
}


/* ===== Google Forms-like ===== */
document.addEventListener('DOMContentLoaded', () => {
    initGForm();
});

function initGForm() {
    const form = document.getElementById('gform-demo');
    if (!form) return;

    // “Otros” -> mostrar/ocultar input
    const otrosChk = document.getElementById('g_motivo_otros_chk');
    const otrosInp = document.getElementById('g_motivo_otros');
    if (otrosChk && otrosInp) {
        otrosChk.addEventListener('change', () => {
            if (otrosChk.checked) {
                otrosInp.classList.remove('oculto');
                otrosInp.focus();
            } else {
                otrosInp.value = '';
                otrosInp.classList.add('oculto');
            }
        });
    }

    // Borrar estado de error cuando el usuario interactúa
    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => clearError(el));
        el.addEventListener('change', () => clearError(el));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = validateGForm(form);
        if (!ok) {
            showToast?.('error', 'Revisá los campos obligatorios');
            return;
        }
        showToast?.('success', 'Formulario válido (demo)');
    });
}

function clearError(input) {
    const q = input.closest('.gform-question');
    if (q) q.classList.remove('is-error');
}

function validateGForm(form) {
    let valid = true;

    // Cada bloque con data-required=true
    form.querySelectorAll('.gform-question[data-required="true"]').forEach(q => {
        let blockValid = true;

        // 1) Si hay radio dentro, exige uno tildado
        const radios = q.querySelectorAll('input[type="radio"]');
        if (radios.length) {
            blockValid = Array.from(radios).some(r => r.checked);
        }

        // 2) Si hay checkboxes dentro (ej: quincenas/motivos), exige al menos uno
        const checks = q.querySelectorAll('input[type="checkbox"]');
        if (checks.length && !radios.length) {
            blockValid = Array.from(checks).some(c => c.checked);
        }

        // 3) Inputs/select/textarea individuales
        const single = q.querySelector('input.gform-input:not([type="radio"]):not([type="checkbox"]), select, textarea');
        if (single && !single.value.trim()) {
            blockValid = false;
        }

        if (!blockValid) {
            q.classList.add('is-error');
            valid = false;
        }
    });

    return valid;
}

(function () {
    function toggle(el, show) {
        el.hidden = !show;
        // deshabilito/rehabilito inputs dentro para no mandar basura al submit
        el.querySelectorAll('input, select, textarea').forEach(i => i.disabled = !show);
    }

    // Mostrar/ocultar el "complemento" cuando tildan/destildan la quincena
    document.addEventListener('change', function (e) {
        // a) checkbox principal
        if (e.target.matches('.gform-option input[type="checkbox"][data-complement]')) {
            const comp = document.querySelector(e.target.dataset.complement);
            if (!comp) return;

            if (e.target.checked) {
                toggle(comp, true);
                // Por defecto SVE seleccionado; oculto marca
                const brandWrap = comp.querySelector('.gform-brand');
                const yo = comp.querySelector('input[type="radio"][value="yo"]');
                const sve = comp.querySelector('input[type="radio"][value="sve"]');
                if (sve) sve.checked = true;
                if (brandWrap) {
                    toggle(brandWrap, false);
                    const brandInput = brandWrap.querySelector('input');
                    if (brandInput) brandInput.value = '';
                }
            } else {
                // Al destildar, cierro todo y limpio
                toggle(comp, false);
                const brandWrap = comp.querySelector('.gform-brand');
                if (brandWrap) {
                    toggle(brandWrap, false);
                    const brandInput = brandWrap.querySelector('input');
                    if (brandInput) brandInput.value = '';
                }
                // reseteo radios a SVE
                const sve = comp.querySelector('input[type="radio"][value="sve"]');
                if (sve) sve.checked = true;
            }
        }

        // b) radios SVE / YO dentro del complemento
        if (e.target.matches('.gform-complement input[type="radio"]')) {
            const comp = e.target.closest('.gform-complement');
            const brandWrap = comp.querySelector('.gform-brand');
            toggle(brandWrap, e.target.value === 'yo');
            if (e.target.value !== 'yo') {
                const brandInput = brandWrap?.querySelector('input');
                if (brandInput) brandInput.value = '';
            }
        }
    });

    // Inicializo estados por si el form viene con valores
    document.querySelectorAll('.gform-option input[type="checkbox"][data-complement]').forEach(cb => {
        cb.dispatchEvent(new Event('change', { bubbles: true }));
    });
})();


// Geolocalización
(function () {
    const yesSel = 'input[name="en-finca"][value="si"]';
    const noSel = 'input[name="en-finca"][value="no"]';

    const statusEl = document.getElementById('ubicacion_status');
    const latEl = document.getElementById('ubicacion_lat');
    const lngEl = document.getElementById('ubicacion_lng');
    const accEl = document.getElementById('ubicacion_acc');
    const tsEl = document.getElementById('ubicacion_ts');

    function resetCoords() {
        latEl.value = lngEl.value = accEl.value = tsEl.value = '';
    }

    function captureCoords() {
        if (!('geolocation' in navigator)) {
            statusEl.textContent = 'Tu navegador no soporta geolocalización.';
            return;
        }
        statusEl.textContent = 'Capturando ubicación…';

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude, accuracy } = pos.coords;
                latEl.value = latitude.toFixed(6);
                lngEl.value = longitude.toFixed(6);
                accEl.value = Math.round(accuracy);
                tsEl.value = new Date(pos.timestamp).toISOString();

                statusEl.innerHTML =
                    `Coordenadas guardadas: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} · ±${Math.round(accuracy)} m. ` +
                    `<a href="https://maps.google.com/?q=${latitude},${longitude}" target="_blank" rel="noopener">Ver en Maps</a>`;
            },
            (err) => {
                resetCoords();
                let msg = 'No se pudo capturar la ubicación.';
                if (err.code === 1) msg = 'Permiso de ubicación denegado.';
                if (err.code === 2) msg = 'No se pudo determinar la ubicación (señal débil).';
                if (err.code === 3) msg = 'Tiempo de espera agotado al obtener la ubicación.';
                statusEl.textContent = msg + ' Podés intentar nuevamente.';
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    }

    const yes = document.querySelector(yesSel);
    const no = document.querySelector(noSel);

    if (yes && no) {
        yes.addEventListener('change', (e) => { if (e.target.checked) captureCoords(); });
        no.addEventListener('change', (e) => { if (e.target.checked) { resetCoords(); statusEl.textContent = 'No se capturarán coordenadas.'; } });
    }
})();