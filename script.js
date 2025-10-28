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


// --- 4. Desktop Dark Mode Toggle ---
toggleButton?.addEventListener('click', toggleTheme);


// --- 5. Mobile Dark Mode Toggle ---
const mobileToggleButton = document.getElementById('mobile-dark-mode-toggle');
const mobileSunIcon = document.getElementById('mobile-sun-icon');
const mobileMoonIcon = document.getElementById('mobile-moon-icon');

const updateMobileThemeIcons = () => {
    if (root.classList.contains('dark')) {
        mobileMoonIcon?.classList.remove('hidden');
        mobileSunIcon?.classList.add('hidden');
    } else {
        mobileSunIcon?.classList.remove('hidden');
        mobileMoonIcon?.classList.add('hidden');
    }
};

mobileToggleButton?.addEventListener('click', () => {
    toggleTheme();
    updateMobileThemeIcons();
});

// Initialize mobile theme icons
updateMobileThemeIcons();


// --- 6. Mobile Sidebar Navigation ---
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNavSidebar = document.getElementById('mobile-nav-sidebar');
const mobileNavClose = document.getElementById('mobile-nav-close');
const navOverlay = document.getElementById('nav-overlay');
const mobileNavLinks = document.getElementById('mobile-nav-links');

let sidebarOpen = false;

const openSidebar = () => {
    sidebarOpen = true;
    mobileNavSidebar.classList.add('open');
    navOverlay.classList.remove('hidden');
    navOverlay.classList.add('open');
    mobileMenuToggle?.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeSidebar = () => {
    sidebarOpen = false;
    mobileNavSidebar.classList.remove('open');
    navOverlay.classList.add('hidden');
    navOverlay.classList.remove('open');
    mobileMenuToggle?.classList.remove('active');
    document.body.style.overflow = '';
};

// Toggle sidebar on menu button click
mobileMenuToggle?.addEventListener('click', () => {
    if (sidebarOpen) closeSidebar();
    else openSidebar();
});

// Close sidebar on close button click
mobileNavClose?.addEventListener('click', closeSidebar);

// Close sidebar when clicking on overlay
navOverlay?.addEventListener('click', closeSidebar);

// Close sidebar when clicking a link
mobileNavLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarOpen) closeSidebar();
});