// Select the hamburger button and nav links
const hamburgerButton = document.getElementById('hamburger-button');
const navLinks = document.getElementById('nav-links');

// Add an event listener to toggle the menu visibility
hamburgerButton.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // Toggle the 'active' class on the nav
  navLinks.setAttribute('aria-hidden', navLinks.classList.contains('active') ? 'false' : 'true');
});

// Optional: Close the nav menu when a link is clicked
const navItems = document.querySelectorAll('#nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active'); // Close the menu
    navLinks.setAttribute('aria-hidden', 'true');
  });
});

// Get the input element
const searchInput = document.getElementById('search-input');

// Add an event listener to detect the Enter key press
searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // Trigger search functionality
    const query = searchInput.value.trim();
    if (query) {
      console.log(`Search triggered for: ${query}`);
      // Add your search logic here
    }
  }
});
