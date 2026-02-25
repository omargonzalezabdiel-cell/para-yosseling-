document.addEventListener("DOMContentLoaded", () => {
    // Observador general para los párrafos de la carta
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToFade = document.querySelectorAll('.fade-in:not(#seccion-firma)');
    elementsToFade.forEach(el => observer.observe(el));

    // Observador especial para la firma (efecto Typewriter)
    const firmaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Activar el efecto de máquina de escribir con un pequeño retraso
                setTimeout(() => {
                    const textoFirma = document.getElementById('firma-texto');
                    textoFirma.className = 'typewriter-active';
                }, 800); // Espera casi 1 segundo para que ella preste atención

                firmaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando ve el 50% de la zona final

    const seccionFirma = document.getElementById('seccion-firma');
    if (seccionFirma) {
        firmaObserver.observe(seccionFirma);
    }
});