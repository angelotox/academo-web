document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        '"Conocer nos Hace Libres"',
        '"Knowledge makes us Free"',
        '"Connaissance nous rend libres"',
        '"La Conoscenza ci rende liberi"',
        '"Scientia nos Liberos"'
    ];

    let index = 0;
    const heroText = document.getElementById("hero-text");

    setInterval(() => {
        heroText.style.opacity = 0; // Suaviza la transición saliente
        setTimeout(() => {
            index = (index + 1) % phrases.length;
            heroText.textContent = phrases[index];
            heroText.style.opacity = 1; // Suaviza la transición entrante
        }, 1000);
    }, 5000); // Cambia cada 4 segundos

    // Código para mantener el enlace activo
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const pageMap = {
        'cursos.html': 'link-cursos',
        'blog.html': 'link-blog',
        'contacto.html': 'link-contacto',
        'academos.html': 'link-academos',
        'activismo.html': 'link-activismo'
    };

    const activeLinkId = pageMap[page];
    if (activeLinkId) {
        const activeLink = document.getElementById(activeLinkId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Código para colapsar la barra de navegación al hacer scroll
    const header = document.querySelector("header");
    const logoContainer = document.getElementById("logo-img-container");
    const logoImg = document.getElementById("logo-img");

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                header.classList.add("scrolled");
                logoContainer.classList.add("scrolled");
                logoImg.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
                logoContainer.classList.remove("scrolled");
                logoImg.classList.remove("scrolled");
            }
        },
        { threshold: [0, 1] }
    );

    observer.observe(document.querySelector(".observer"));

    // Smooth scrolling for "VER CLASES" button
    document.getElementById("btn-ver-clases").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("clases").scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("link-clases").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("clases").scrollIntoView({ behavior: "smooth" });
    });
    // Smooth scrolling for "Contacto" and "Activismo" links
    document.getElementById("link-contacto").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("link-activismo").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("activism").scrollIntoView({ behavior: "smooth" });
    });

    // Smooth scrolling for "Academos" link
    document.getElementById("link-academos").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("academos-section").scrollIntoView({ behavior: "smooth" });
    });

    // Function to open the enrollment form in a new tab
    function openEnrollmentForm() {
        window.open("https://forms.gle/E1iFppByHGe9h2beA", "_blank");
    }

    // Add click event listener to each class element
    document.querySelectorAll(".clase").forEach(clase => {
        clase.addEventListener("click", openEnrollmentForm);
    });
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        effect: 'slide',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Function to open the donation modal
    function openDonationModal() {
        document.getElementById("donation-modal").style.display = "flex";
    }

    // Function to close the donation modal
    function closeDonationModal() {
        document.getElementById("donation-modal").style.display = "none";
    }

    // Add click event listener to the "DONACIONES" button
    document.getElementById("btn-donaciones").addEventListener("click", function(event) {
        event.preventDefault();
        openDonationModal();
    });

    document.getElementById("btn-donaciones-activismo").addEventListener("click", function(event) {
        event.preventDefault();
        openDonationModal();
    });

    // Add click event listener to the close button of the donation modal
    document.getElementById("close-donation-modal").addEventListener("click", function() {
        closeDonationModal();
    });

    // Close the modal when clicking outside of it
    window.addEventListener("click", function(event) {
        if (event.target === document.getElementById("donation-modal")) {
            closeDonationModal();
        }
    });

    // Function to toggle the dropdown menu
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector("nav ul");

    menuIcon.addEventListener("click", function () {
        menuIcon.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Function to close the dropdown menu when a link is clicked
    navMenu.addEventListener("click", function (event) {
        if (event.target.tagName === 'A') {
            menuIcon.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Close the dropdown menu before navigating
                menuIcon.classList.remove("active");
                navMenu.classList.remove("active");
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
