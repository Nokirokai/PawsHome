// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Set Active Navigation Link Based on Current Page
function setActiveNavLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Get the href of the link
        const linkPage = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'home.html') ||
            (currentPage === 'index.html' && linkPage === 'home.html')) {
            link.classList.add('active');
        }
    });
}

// Call the function when page loads
setActiveNavLink();

// Donation Page Modal Functionality
const donateBtn = document.getElementById('donateBtn');
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const completeBtn = document.getElementById('completeBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

const paymentForm = document.querySelector('#paymentModal form'); // form inside modal

// Open payment modal
if (donateBtn) {
    donateBtn.addEventListener('click', () => {
        paymentModal.classList.add('active');
    });
}

// Close payment modal
[closeModalBtn, cancelBtn].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            paymentModal.classList.remove('active');
        });
    }
});

// Complete button triggers form submission
if (completeBtn) {
    completeBtn.addEventListener('click', () => {
        if (paymentForm) {
            paymentForm.dispatchEvent(new Event('submit')); // trigger validation
        }
    });
}

// Close success modal
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

// Close modals when clicking outside
[paymentModal, successModal].forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});

// Text input-only validation on form submit
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent page reload

        let isValid = true;

        // Clear previous error messages
        const errorMsgs = paymentForm.querySelectorAll('.error-msg');
        errorMsgs.forEach(msg => msg.remove());

        // Name on Card validation
        const nameInput = paymentForm.querySelector('input[placeholder="John Doe"]');
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, 'Name is required');
        } else if (!nameRegex.test(nameInput.value.trim())) {
            isValid = false;
            showError(nameInput, 'Name must contain only letters and spaces');
        }

        // Card Number validation
        const cardInput = paymentForm.querySelector('input[placeholder="1234 5678 9012 3456"]');
        const cardRegex = /^\d{16}$/;
        const cardValue = cardInput.value.replace(/\s+/g, ''); // remove spaces
        if (!cardValue) {
            isValid = false;
            showError(cardInput, 'Card number is required');
        } else if (!cardRegex.test(cardValue)) {
            isValid = false;
            showError(cardInput, 'Card number must be 16 digits');
        }

        // Expiry Date validation
        const expiryInput = paymentForm.querySelector('input[placeholder="MM/YY"]');
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryInput.value.trim()) {
            isValid = false;
            showError(expiryInput, 'Expiry date is required');
        } else if (!expiryRegex.test(expiryInput.value.trim())) {
            isValid = false;
            showError(expiryInput, 'Expiry must be in MM/YY format');
        }

        // CVV validation
        const cvvInput = paymentForm.querySelector('input[placeholder="123"]');
        const cvvRegex = /^\d{3}$/;
        if (!cvvInput.value.trim()) {
            isValid = false;
            showError(cvvInput, 'CVV is required');
        } else if (!cvvRegex.test(cvvInput.value.trim())) {
            isValid = false;
            showError(cvvInput, 'CVV must be 3 digits');
        }

        if (!isValid) return;

        // If valid, show success modal
        paymentModal.classList.remove('active');
        successModal.classList.add('active');

        // Optional: reset the form
        paymentForm.reset();
    });
}

// Helper function to show error
function showError(input, message) {
    input.style.border = '2px solid red';
    const error = document.createElement('div');
    error.className = 'error-msg';
    error.style.color = 'red';
    error.style.fontSize = '0.9rem';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

// ADOPTION POPUP FUNCTIONALITY (UPDATED FOR CARD MODAL STYLE)
const adoptBtns = document.querySelectorAll('.btn-adopt');
const adoptionModal = document.querySelector('.popup');
const adoptionOverlay = document.querySelector('.overlay');
const adoptionForm = adoptionModal ? adoptionModal.querySelector('form') : null;
const adoptionCancelBtn = adoptionModal ? adoptionModal.querySelector('.cancel-btn') : null;
const adoptionSubmitBtn = adoptionModal ? adoptionModal.querySelector('.submit-btn') : null;

// Open adoption modal when any "Adopt" button is clicked
if (adoptBtns.length > 0 && adoptionModal) {
    adoptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            adoptionModal.classList.add('active');
            if (adoptionOverlay) {
                adoptionOverlay.classList.add('active');
            }
        });
    });
}

// Close adoption modal function
function closeAdoptionModal() {
    if (adoptionModal) {
        adoptionModal.classList.remove('active');
    }
    if (adoptionOverlay) {
        adoptionOverlay.classList.remove('active');
    }
}

// Close modal when cancel button is clicked
if (adoptionCancelBtn) {
    adoptionCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAdoptionModal();
    });
}

// Close modal when clicking on overlay
if (adoptionOverlay) {
    adoptionOverlay.addEventListener('click', (e) => {
        if (e.target === adoptionOverlay) {
            closeAdoptionModal();
        }
    });
}

// Handle adoption form submission
if (adoptionForm) {
    adoptionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Clear previous error messages and borders
        const errorMsgs = adoptionForm.querySelectorAll('.error-msg');
        errorMsgs.forEach(msg => msg.remove());
        
        const inputs = adoptionForm.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.style.border = '';
        });

        // Validate all required fields
        const requiredFields = adoptionForm.querySelectorAll('input[required], textarea[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.border = '2px solid red';
                showError(field, 'This field is required');
            }
        });

        // Email validation
        const emailInput = adoptionForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.style.border = '2px solid red';
                showError(emailInput, 'Please enter a valid email address');
            }
        }

        if (!isValid) {
            return;
        }

        // If valid, show success message
        alert('Application submitted successfully! We will review your application and contact you within 2-3 business days.');
        adoptionForm.reset();
        closeAdoptionModal();
    });
}

// Contact Us Button
const contactBtn = document.querySelector('.btn-contact');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}

// Surrender Form Submission
const surrenderForm = document.querySelector('.surrender-form');
if (surrenderForm) {
    surrenderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for submitting your surrender request. We will review your application and contact you within 2-3 business days.');
        surrenderForm.reset();
    });
}

// Pagination Functionality for Find a Pet Page
const petCards = document.querySelectorAll('.pet-card');
const pageButtons = document.querySelectorAll('.page-btn');
const pageNumbers = document.querySelectorAll('.page-number');
let currentPage = 1;
const petsPerPage = 6;

function showPage(pageNum) {
    // Hide all pet cards first
    petCards.forEach(card => {
        card.style.display = 'none';
    });

    // Calculate which pets to show
    const start = (pageNum - 1) * petsPerPage;
    const end = start + petsPerPage;

    // Show pets for current page
    for (let i = start; i < end && i < petCards.length; i++) {
        petCards[i].style.display = 'block';
    }

    // Update active page number styling
    pageNumbers.forEach((num, index) => {
        if (index + 1 === pageNum) {
            num.style.fontWeight = 'bold';
            num.style.color = '#e07843';
        } else {
            num.style.fontWeight = 'normal';
            num.style.color = '#666';
        }
    });

    currentPage = pageNum;
}

// Initialize pagination if pet cards exist
if (petCards.length > 0) {
    // Show first page initially
    showPage(1);

    // Add click events to page numbers
    pageNumbers.forEach((num, index) => {
        num.style.cursor = 'pointer';
        num.addEventListener('click', () => {
            const pageNum = index + 1;
            showPage(pageNum);
            // Scroll to top of pets section
            document.querySelector('.pets-section').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add click events to Previous/Next buttons
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('Previous') && currentPage > 1) {
                showPage(currentPage - 1);
            } else if (buttonText.includes('Next') && currentPage < pageNumbers.length) {
                showPage(currentPage + 1);
            }
            
            // Scroll to top of pets section
            document.querySelector('.pets-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}