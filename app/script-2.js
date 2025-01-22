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

let actionsData = {}; // Declare a global variable to store datasets

fetch('assets/actions.json') // Adjust the path if needed
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    actionsData = data; // Assign the loaded data to the global variable
    console.log('Loaded datasets:', actionsData);
  })
  .catch((error) => {
    console.error('Error loading datasets.json:', error);
  });

// Selected actions array
let selectedActions = [];

// Get the input and results elements
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const selectedActionsContainer = document.getElementById("selected-actions");

// Function to update the results
function updateResults(query) {
  // Clear the current results
  resultsContainer.innerHTML = "";

  // Filter actions matching the query
  const results = actionsData.filter((action) =>
    action.toLowerCase().includes(query.toLowerCase())
  );

  // Display the results as cards
  if (results.length > 0) {
    results.forEach((result) => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = result;

      // Check if this action is already selected
      if (selectedActions.includes(result)) {
        card.classList.add("selected");
      }

      // Add click event listener to toggle selection
      card.addEventListener("click", () => {
        toggleSelection(result);
      });

      resultsContainer.appendChild(card);
    });
  } else {
    const noResult = document.createElement("div");
    noResult.textContent = "No actions found.";
    resultsContainer.appendChild(noResult);
  }
}

// Function to toggle selection of an action
function toggleSelection(action) {
  if (selectedActions.includes(action)) {
    // Remove from selected actions
    selectedActions = selectedActions.filter((item) => item !== action);
  } else {
    // Add to selected actions
    selectedActions.push(action);
  }
  // Update both result and selected actions display
  updateSelectedActions();
  updateResults(searchInput.value.trim());
}

// Function to update selected actions display
function updateSelectedActions() {
  // Clear the selected actions container
  selectedActionsContainer.innerHTML = "";

  // Display selected actions as cards
  selectedActions.forEach((action) => {
    const card = document.createElement("div");
    card.className = "card selected";
    card.textContent = action;

    // Add click event to deselect
    card.addEventListener("click", () => {
      toggleSelection(action);
    });

    selectedActionsContainer.appendChild(card);
  });
}

// Add an event listener to detect the Enter key press
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      updateResults(query);
    }
  }
});

document.getElementById("calculate-score").addEventListener("click", () => {
  const actions = selectedActions

  fetch("http://127.0.0.1:5000/compute-top-types", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actions }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        document.getElementById("top3").textContent = `Error: ${data.error}`;
      } else {
        const results = data.top_personalities
          .map(([type, score]) => `${type}: ${score.toFixed(2)}`)
          .join("<br>");
        document.getElementById("top3").innerHTML = `<h3>Top 3 Personality Types:</h3>${results}`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("top3").textContent = "An error occurred.";
    });
});