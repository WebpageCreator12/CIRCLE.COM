/**
 * Main JavaScript for Circle.Com
 * This script handles the interactive features of the website,
 * including dynamic navigation, a responsive hamburger menu,
 * and a cookie consent pop-up.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selection ---
    // Get all navigation links with the 'data-section' attribute
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    // Get all content sections
    const contentSections = document.querySelectorAll('.content-section');
    
    // Get hamburger menu and navigation container for mobile responsiveness
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-links');

    // Get cookie pop-up elements
    const cookieModalBackdrop = document.getElementById('cookie-modal-backdrop');
    const acceptBtn = document.getElementById('accept-cookies-btn');
    const declineBtn = document.getElementById('decline-cookies-btn');


    // --- Navigation Logic ---
    /**
     * Handles clicks on the main navigation links.
     * Prevents default behavior and shows/hides the correct content section.
     */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            
            // Only proceed if the link has a data-section attribute
            if (!sectionId) return;

            // Remove 'active' class from all nav links and add to the clicked one
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Hide all content sections and show only the corresponding one
            contentSections.forEach(section => {
                if (section.id === sectionId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Close the hamburger menu on link click for mobile
            if(navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });


    // --- Hamburger Menu Toggle ---
    /**
     * Toggles the active class on the hamburger menu and the nav links,
     * showing or hiding the mobile navigation menu.
     */
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    // --- Cookie Pop-up Logic ---
    /**
     * Checks if the user has previously accepted or declined cookies
     * and shows the modal if no preference is found.
     */
    function showCookieModal() {
        // Check local storage for a cookie preference flag
        if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) {
            cookieModalBackdrop.classList.add('show');
        }
    }

    /**
     * Handles the 'Accept' button click, hides the modal, and
     * saves the user's preference to local storage.
     */
    acceptBtn.addEventListener('click', () => {
        cookieModalBackdrop.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'true');
    });

    /**
     * Handles the 'Decline' button click, hides the modal, and
     * saves the user's preference to local storage.
     */
    declineBtn.addEventListener('click', () => {
        cookieModalBackdrop.classList.remove('show');
        localStorage.setItem('cookiesDeclined', 'true');
    });

    // Show the cookie pop-up after a slight delay to ensure the page is fully rendered
    setTimeout(showCookieModal, 500);

});