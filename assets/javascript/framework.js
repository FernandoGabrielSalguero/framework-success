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

// alertas
function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `floating-alert ${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);

    // Nueva duración: 5 segundos (5000ms)
    setTimeout(() => {
        alert.remove();
    }, 5000);
}


// Modales

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}