const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");

const toggleColors = document.getElementById("toggle-colors");

const rootStyles = document.documentElement.style;

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(toggleIcon.src.includes("moon.svg")){
        toggleIcon.src = "assets/icons/sun.svg";
        toggleText.textContent = "Light Mode";
    }
    else{
        toggleIcon.src = "assets/icons/moon.svg";
        toggleText.textContent = "Dark Mode";
    }
});

toggleColors.addEventListener("click", (e) => {
    rootStyles.setProperty("--primary-color", e.target.dataset.color);
});

// La función fetch se usa para cargar archivos externos (como nuestro JSON)
fetch('translations.json')
    .then(response => response.json())
    .then(translations => {
        // La variable "translations" contiene todo el contenido del JSON
        
        // Función principal para cambiar el idioma
        function setLanguage(lang) {
            document.querySelectorAll('[data-section]').forEach(element => {
                const section = element.getAttribute('data-section');
                const value = element.getAttribute('data-value');

                // Busca el texto en el objeto JSON
                if (translations[lang] && translations[lang][section] && translations[lang][section][value]) {
                    element.textContent = translations[lang][section][value];
                }
            });
        }

        // Asigna eventos a los botones
        document.getElementById('lang-es').addEventListener('click', () => {
            setLanguage('es');
        });

        document.getElementById('lang-en').addEventListener('click', () => {
            setLanguage('en');
        });

        // Configura el idioma por defecto al cargar la página (por ejemplo, español)
        setLanguage('es');

    })
    .catch(error => console.error('Error al cargar el archivo de traducciones:', error));