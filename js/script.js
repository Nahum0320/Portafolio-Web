// Navegación responsiva
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Botón de volver arriba
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Formulario de contacto
document.getElementById('formContact').addEventListener('submit', function(e) {
e.preventDefault();

const form = this;
const submitBtn = form.querySelector('.submit-btn');
const originalText = submitBtn.textContent;

submitBtn.textContent = 'Enviando...';
submitBtn.disabled = true;

const formData = new FormData(form);
const data = new URLSearchParams(formData);

fetch('https://formspree.io/f/xqaqggae', {
    method: 'POST',
    body: data,
    headers: {
    'Accept': 'application/json'
    }
})
.then(response => {
    if (response.ok) {
    alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
    form.reset();
    } else {
    return response.json().then(data => {
        throw new Error(data.error || 'Ocurrió un error al enviar el formulario');
    });
    }
})
.catch(error => {
    alert('Error al enviar el mensaje: ' + error.message);
})
.finally(() => {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
});
});

// Animación de aparición al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Función para abrir un modal específico
function openModal(modalId, event) {
event.preventDefault(); // Previene el comportamiento por defecto del enlace
document.getElementById(modalId).style.display = 'block';
}

// Función para cerrar los modales
function closeModal(modalId) {
document.getElementById(modalId).style.display = 'none';
}

// Cierra el modal si el usuario hace clic fuera del contenido
window.onclick = function(event) {
// Verificar todos los modales
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    if (event.target == modal) {
    modal.style.display = 'none';
    }
});
}


// Inicialmente aplicamos estilos para la animación
document.querySelectorAll('.project-card, .timeline-item, .skill-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Ejecutamos la función al cargar la página y al hacer scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);