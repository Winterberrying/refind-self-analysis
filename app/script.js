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

const dropdown = document.getElementById('custom-dropdown');
const button = document.getElementById('dropdown-button');
const options = document.getElementById('dropdown-options');

// Toggle dropdown visibility
button.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});

// Update the button text when an option is selected
options.addEventListener('click', (event) => {
  if (event.target.dataset.value) {
    button.textContent = event.target.textContent;
    dropdown.classList.remove('active');
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});


// Example datasets for different personality types
const datasets = {
  Adventurer: [
    { action: "Explored a new trail", value: 15 },
    { action: "Helped someone lost", value: 20 },
    { action: "Got injured while hiking", value: -10 },
  ],
  Researcher: [
    { action: "Published a paper", value: 25 },
    { action: "Missed a deadline", value: -5 },
    { action: "Attended a conference", value: 10 },
  ],
  Leader: [
    { action: "Motivated the team", value: 30 },
    { action: "Missed an important meeting", value: -15 },
    { action: "Won a project bid", value: 20 },
  ],
  Philosopher: [
    { action: "Had a deep conversation", value: 10 },
    { action: "Ignored a friend's advice", value: -5 },
    { action: "Wrote an insightful essay", value: 20 },
  ],
};

// Select dropdown elements
const dropdownButton = document.getElementById("dropdown-button");
const dropdownOptions = document.getElementById("dropdown-options");
const positiveColumn = document.getElementById("positive-column");
const negativeColumn = document.getElementById("negative-column");

// Toggle the dropdown visibility
dropdownButton.addEventListener("click", () => {
  dropdownOptions.classList.toggle("open");
});

// Handle selecting a personality type from the dropdown
dropdownOptions.addEventListener("click", (event) => {
  const selectedValue = event.target.getAttribute("data-value");
  if (selectedValue) {
    dropdownButton.textContent = selectedValue;
    dropdownOptions.classList.remove("open");
    populateCards(selectedValue);
  }
});

// Function to populate cards
function populateCards(personalityType) {
  // Clear previous cards
  positiveColumn.innerHTML = "<h3>Positive</h3>";
  negativeColumn.innerHTML = "<h3>Negative</h3>";

  // Get dataset for the selected personality type
  const dataset = datasets[personalityType] || [];

  // Populate cards
  dataset.forEach(({ action, value }) => {
    const card = document.createElement("div");
    card.className = `card ${value > 0 ? "positive" : "negative"}`;
    card.innerHTML = `
      <div class="action">${action}</div>
      <div class="value">Value: ${value}</div>
    `;

    if (value > 0) {
      positiveColumn.appendChild(card);
    } else {
      negativeColumn.appendChild(card);
    }
  });
}