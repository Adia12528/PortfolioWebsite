// --- 1. Dark Mode Toggle Logic ---

const root = document.documentElement;
const toggleButton = document.getElementById('dark-mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

const initializeTheme = () => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        root.classList.add('dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    } else {
        root.classList.remove('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
};

const toggleTheme = () => {
    if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
};

toggleButton.addEventListener('click', toggleTheme);

// Initialize theme immediately
initializeTheme();


// --- 2. Scroll Reveal Animation Logic ---

const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% of element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            
            // Apply delay before making it visible
            setTimeout(() => {
                entry.target.classList.add('is-visible');
            }, delay);
            
            // Stop observing once it's visible
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

scrollRevealElements.forEach(element => {
    observer.observe(element);
});


// --- 3. Contact Form Submission (Simulated) ---

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Simulate a successful API call delay
    formStatus.classList.remove('hidden', 'text-red-500', 'text-green-500');
    formStatus.classList.add('text-gray-500', 'animate-pulse');
    formStatus.textContent = 'Sending message...';

    setTimeout(() => {
        // Successful submission simulation
        formStatus.classList.remove('text-gray-500', 'animate-pulse');
        formStatus.classList.add('text-green-500');
        formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
        
        // Clear the form fields
        contactForm.reset();
        
        // Hide status after a few seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);

    }, 1500); // 1.5 second delay
});