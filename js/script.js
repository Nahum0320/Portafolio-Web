// Navegación responsiva
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
// Objeto con las imágenes de cada proyecto
const projectImages = {
    'project-1': [
        '/imagenes/ticalModal.png',
        '/imagenes/ticalModal2.png'
    ],
    'project-2': [
        '/imagenes/clinicaSeger1.png',
        '/imagenes/clinicaSeger2.png',
        '/imagenes/clinicaSeger3.png',
        '/imagenes/clinicaSeger4.png'
    ],
    'project-3': [
        '/imagenes/Screenmatch1.png',
        '/imagenes/Screenmatch2.png',
        '/imagenes/Screenmatch3.png'
    ],
    'project-4': [
        '/imagenes/RecursosHumanos1.png',
        '/imagenes/RecursosHumanos2.png',
        '/imagenes/RecursosHumanos3.png'
    ],
    'project-5': [
        '', 
        ''
    ],
    'project-6': [
        '',
        ''
    ]
};

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

// Función para cerrar el modal - versión corregida
function closeProjectLightbox() {
    const modal = document.getElementById('projectLightbox');
    modal.classList.remove('show');
    
    // En lugar de ocultar el modal inmediatamente, esperamos a que termine la animación
    setTimeout(() => {
        modal.style.display = 'none'; // Ocultamos el modal después de la animación
    }, 300); // Tiempo aproximado de la animación
    
    document.body.style.overflow = 'auto';
}

// Función para abrir el modal con el carrusel - versión corregida
function openProjectPreview(projectId) {
    const modal = document.getElementById('projectLightbox');
    const carouselContainer = document.getElementById('lightboxCarousel');
    const images = projectImages[projectId];

    // Asegurarse de que el modal sea visible antes de abrirlo
    modal.style.display = 'flex'; // Restablecer display para que se pueda mostrar
    
    // Limpiar el contenedor del carrusel
    carouselContainer.innerHTML = `
        <div class="carousel-images"></div>
        <div class="carousel-nav">
            <button class="carousel-btn prev"><</button>
            <button class="carousel-btn next">></button>
        </div>
        <div class="carousel-dots"></div>
    `;

    const carouselImages = carouselContainer.querySelector('.carousel-images');
    const carouselDots = carouselContainer.querySelector('.carousel-dots');
    const prevBtn = carouselContainer.querySelector('.carousel-btn.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    // Añadir imágenes al carrusel
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagen ${index + 1} del proyecto`;
        img.className = 'carousel-image';
        carouselImages.appendChild(img);

        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        carouselDots.appendChild(dot);
    });

    function updateCarousel() {
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar los puntos de navegación
        Array.from(carouselDots.children).forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Mostrar el modal después de configurar el carrusel
    setTimeout(() => {
        modal.classList.add('show');
    }, 10); // Pequeño retraso para asegurar que display: flex se aplique primero

    document.body.style.overflow = 'hidden';
    updateCarousel();
}

// Cerrar el modal al hacer clic fuera o en el botón de cerrar
document.getElementById('projectLightbox').addEventListener('click', function(event) {
    if (event.target === this || event.target.classList.contains('lightbox-close')) {
        closeProjectLightbox();
    }
});

// Cerrar el modal con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.getElementById('projectLightbox').classList.contains('show')) {
        closeProjectLightbox();
    }
});

// Función para abrir el modal de certificados - versión corregida
function openCertificateLightbox(modalId, event) {
    event.preventDefault();
    const modal = document.getElementById(modalId);
    
    // Primero aseguramos que el modal sea visible antes de añadir la clase show
    modal.style.display = 'flex'; // o 'block' dependiendo de tu CSS
    
    // Pequeño retraso para asegurar que el cambio de display se aplique primero
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal de certificados - versión corregida
function closeCertificateLightbox(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    
    // Esperamos a que termine la animación antes de ocultar el modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); // Ajusta este tiempo al de tu animación
    
    document.body.style.overflow = 'auto';
}

// Cerrar el modal al hacer clic fuera o en el botón de cerrar
document.querySelectorAll('.certificate-lightbox').forEach(modal => {
    modal.addEventListener('click', function(event) {
        if (event.target === this || event.target.classList.contains('lightbox-close')) {
            closeCertificateLightbox(this.id);
        }
    });
});

// Cerrar el modal con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.certificate-lightbox.show').forEach(modal => {
            closeCertificateLightbox(modal.id);
        });
    }
});
