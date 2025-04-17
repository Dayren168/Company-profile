// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) return;

    // Get all searchable content
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, .nav-links a');
    let found = false;

    searchableElements.forEach(element => {
        const content = element.textContent.toLowerCase();
        if (content.includes(searchTerm)) {
            found = true;
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.style.backgroundColor = '#fff3cd';
            setTimeout(() => {
                element.style.backgroundColor = '';
            }, 2000);
            return;
        }
    });

    if (!found) {
        alert('No results found for: ' + searchTerm);
    }
}

// Add search event listeners
if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Add scroll-based animations for sections
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, options);

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-in-out';
    observer.observe(section);
});

// Testimonial slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    testimonials[currentIndex].classList.add('active');

    function updateTestimonials(direction) {
        // Remove all classes first
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active', 'previous', 'next');
        });

        // Add new classes
        testimonials[currentIndex].classList.add('active');
        
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (currentIndex + 1) % testimonials.length;
        
        testimonials[prevIndex].classList.add('previous');
        testimonials[nextIndex].classList.add('next');
    }

    function goToNextTestimonial() {
        testimonials[currentIndex].classList.add('previous');
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonials('next');
    }

    function goToPrevTestimonial() {
        testimonials[currentIndex].classList.add('next');
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonials('prev');
    }

    // Event listeners for buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToPrevTestimonial();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            goToNextTestimonial();
            startAutoSlide();
        });
    }

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoSlideInterval);
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                goToPrevTestimonial();
            } else {
                goToNextTestimonial();
            }
        }
        startAutoSlide();
    });

    // Auto slide functionality
    let autoSlideInterval;

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(goToNextTestimonial, 5000);
    }

    // Pause auto-slide on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Start auto-slide on page load
    startAutoSlide();
});

// Services slider functionality
const servicesGrid = document.querySelector('.services-grid');
const serviceCards = document.querySelectorAll('.service-card');
const prevServiceBtn = document.querySelector('.services-prev');
const nextServiceBtn = document.querySelector('.services-next');

let currentServiceIndex = 0;
const cardsToShow = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
const serviceCardWidth = 100 / cardsToShow; // Percentage width

function updateServicesSlider() {
    servicesGrid.style.transform = `translateX(-${currentServiceIndex * serviceCardWidth}%)`;
}

function nextService() {
    const maxIndex = serviceCards.length - cardsToShow;
    currentServiceIndex = Math.min(currentServiceIndex + 1, maxIndex);
    updateServicesSlider();
    updateServiceButtons();
}

function prevService() {
    currentServiceIndex = Math.max(currentServiceIndex - 1, 0);
    updateServicesSlider();
    updateServiceButtons();
}

function updateServiceButtons() {
    if (prevServiceBtn && nextServiceBtn) {
        prevServiceBtn.style.opacity = currentServiceIndex === 0 ? '0.5' : '1';
        prevServiceBtn.style.cursor = currentServiceIndex === 0 ? 'default' : 'pointer';
        
        const maxIndex = serviceCards.length - cardsToShow;
        nextServiceBtn.style.opacity = currentServiceIndex >= maxIndex ? '0.5' : '1';
        nextServiceBtn.style.cursor = currentServiceIndex >= maxIndex ? 'default' : 'pointer';
    }
}

if (prevServiceBtn && nextServiceBtn) {
    prevServiceBtn.addEventListener('click', () => {
        if (currentServiceIndex > 0) prevService();
    });
    
    nextServiceBtn.addEventListener('click', () => {
        if (currentServiceIndex < serviceCards.length - cardsToShow) nextService();
    });
}

// Update cards to show on window resize
window.addEventListener('resize', () => {
    const newCardsToShow = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
    if (newCardsToShow !== cardsToShow) {
        currentServiceIndex = 0;
        updateServicesSlider();
        updateServiceButtons();
    }
});

// Initialize service buttons state
updateServiceButtons();

// Touch support for services slider
let servicesStartX = 0;
let servicesEndX = 0;

if (servicesGrid) {
    servicesGrid.addEventListener('touchstart', (e) => {
        servicesStartX = e.touches[0].clientX;
    });

    servicesGrid.addEventListener('touchmove', (e) => {
        servicesEndX = e.touches[0].clientX;
    });

    servicesGrid.addEventListener('touchend', () => {
        const swipeDistance = servicesEndX - servicesStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0 && currentServiceIndex > 0) {
                prevService();
            } else if (swipeDistance < 0 && currentServiceIndex < serviceCards.length - cardsToShow) {
                nextService();
            }
        }
    });
}

// User session management
function setLoggedInUser(userData) {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
}

function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

function updateNavAuth() {
    const navAuth = document.querySelector('.nav-auth');
    const user = getLoggedInUser();

    if (navAuth && user) {
        navAuth.innerHTML = `
            <div class="user-profile">
                <span class="user-name">${user.fullName}</span>
                <button class="logout-btn" onclick="handleLogout()">Logout</button>
            </div>
        `;
    }
}

function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavAuth();

    // Login form functionality
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Valid credentials
    const validCredentials = {
        email: 'dayrenlg@gmail.com',
        password: '123456'
    };

    if (togglePassword && passwordInput) {
        // Toggle password visibility
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Check if credentials match
            if (email === validCredentials.email && password === validCredentials.password) {
                // Get the stored user data
                const userData = JSON.parse(localStorage.getItem('registeredUser'));
                if (userData && userData.email === email) {
                    setLoggedInUser(userData);
                    alert('Login successful! Welcome back.');
                    window.location.href = 'index.html';
                } else {
                    alert('User data not found. Please sign up first.');
                }
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }

    // Signup form functionality
    const signupForm = document.getElementById('signupForm');
    const togglePasswords = document.querySelectorAll('.toggle-password');
    
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            toggle.classList.toggle('fa-eye');
            toggle.classList.toggle('fa-eye-slash');
        });
    });

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            // Basic validation
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            if (!terms) {
                alert('Please agree to the Terms and Conditions');
                return;
            }

            // Store user data
            const userData = {
                fullName,
                email,
                password
            };
            localStorage.setItem('registeredUser', JSON.stringify(userData));

            alert('Account created successfully! You can now sign in.');
            window.location.href = 'login.html';
        });

        // Password strength indicator
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                let strength = 0;
                
                if (password.length >= 6) strength++;
                if (password.match(/[A-Z]/)) strength++;
                if (password.match(/[0-9]/)) strength++;
                
                const requirements = document.querySelector('.password-requirements');
                if (requirements) {
                    if (strength === 0) {
                        requirements.textContent = 'Password must be at least 6 characters long';
                    } else if (strength === 1) {
                        requirements.textContent = 'Weak password';
                    } else if (strength === 2) {
                        requirements.textContent = 'Medium password';
                    } else {
                        requirements.textContent = 'Strong password';
                    }
                }
            });
        }
    }
});
