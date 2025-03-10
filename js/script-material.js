console.log("Script cargado");

const hashedPassword = "4f485dee803c710e20979ba2ccdfe40997d64be4350db32cde1d8943988a41c3"; 
let attempts = 0;
const maxAttempts = 4;

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("passwordInput");
    const toggleIcon = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈"; 
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️"; 
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkPassword() {
    const userInput = document.getElementById("passwordInput").value;
    const errorElement = document.getElementById("error");
    document.getElementById("passwordInput").value = ""; 

    const hashedInput = await hashPassword(userInput);

    if (hashedInput === hashedPassword) {
        document.getElementById("overlay").style.display = "none"; 
    } else {
        attempts++;
        errorElement.textContent = `Contraseña incorrecta. Intento ${attempts} de ${maxAttempts}`;

        if (attempts >= maxAttempts) {
            errorElement.textContent = "Redirigiendo a la página principal...";
            setTimeout(() => window.location.href = "index.html", 2000);
        }
    }
}

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

document.addEventListener("DOMContentLoaded", function () {
    async function loadArticles() {
        const response = await fetch('articles.json');
        const data = await response.json();
        const articlesDiv = document.getElementById('articles');
        
        for (const category in data) {
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('category-container');
    
            const categoryTitle = document.createElement('h2');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            articlesDiv.appendChild(categoryTitle);
    
            data[category].forEach(article => {
                const articleCard = document.createElement('div');
                articleCard.className = 'article-card';
                articleCard.innerHTML = `<h3>${article.title}</h3>`;
                articleCard.onclick = () => loadArticle(article.file);
                articlesDiv.appendChild(articleCard);
            });
        }
    }

    async function loadArticle(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            
            // Extraer el título si empieza con #
            const lines = text.split('\n');
            let title = '';
            if (lines[0].startsWith('#')) {
                title = `<h2>${lines[0].replace('#', '').trim()}</h2>`;
                lines.shift(); // Eliminar la primera línea
            }
            
            document.getElementById('content').innerHTML = title + '<p>' + lines.join('<br>') + '</p>';
            document.getElementById('overlay').style.display = 'flex';
        } catch (error) {
            console.error('Failed to load article:', error);
        }
    }

    function closeModal() {
        document.getElementById('overlay').style.display = 'none';
    }

    document.getElementById('overlay').addEventListener('click', function(event) {
        if (event.target === document.getElementById('overlay')) {
            closeModal();
        }
    });

    document.getElementById('close-btn').addEventListener('click', closeModal); // Add event listener to close button

    loadArticles();

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
});