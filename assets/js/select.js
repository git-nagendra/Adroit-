/* ==========================================================
   AUTO ACTIVE BASED ON URL
========================================================== */
function setActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-item, .sub-item")
    .forEach(el => el.classList.remove("active"));

  // Activate submenu page (desktop support only)
  document.querySelectorAll(".sub-item[href]").forEach(sub => {
    if (sub.getAttribute("href") === currentPage) {
      sub.classList.add("active");
      const parent = sub.closest(".menu-with-sub").querySelector(".has-sub");
      parent.classList.add("active");
    }
  });

  // Activate main menu
  document.querySelectorAll(".nav-item[href]").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}
setActiveMenu();




/* ==========================================================
   PARENT MENU CLICK (NO SUBMENU OPEN)
========================================================== */
document.querySelectorAll(".has-sub").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Highlight parent only
    document.querySelectorAll(".nav-item").forEach(x => x.classList.remove("active"));
    this.classList.add("active");

    // Always hide submenu on click
    const submenu = this.nextElementSibling;
    submenu.classList.remove("open");
  });
});


/* ==========================================================
   SUBMENU ITEM CLICK (Desktop)
========================================================== */
document.querySelectorAll(".sub-item").forEach(item => {
  item.addEventListener("click", function () {
    // Remove active from others
    document.querySelectorAll(".sub-item").forEach(x => x.classList.remove("active"));
    this.classList.add("active");

    // Parent menu active
    const parent = this.closest(".menu-with-sub").querySelector(".has-sub");
    document.querySelectorAll(".nav-item").forEach(x => x.classList.remove("active"));
    parent.classList.add("active");
  });
});


/* ==========================================================
   CLOSE SUBMENU ON OUTSIDE CLICK (Desktop only)
========================================================== */
document.addEventListener("click", e => {
  if (window.innerWidth <= 820) return; // mobile skip

  if (!e.target.closest(".menu-with-sub")) {
    document.querySelectorAll(".submenu").forEach(m => m.classList.remove("open"));
  }
});






// Function to initialize all custom dropdowns
function initCustomDropdowns(container = document) {
  const dropdowns = container.querySelectorAll(".custom-dropdown");

  dropdowns.forEach(dropdown => {
    // Skip if already initialized
    if (dropdown.dataset.initialized) return;
    dropdown.dataset.initialized = true;

    const selected = dropdown.querySelector(".dropdown-selected");
    const optionsContainer = dropdown.querySelector(".dropdown-options");
    const options = dropdown.querySelectorAll(".dropdown-option");
    const hiddenInput = dropdown.querySelector("input[type='hidden']");
    const arrow = selected.querySelector(".dropdown-arrow svg");

    // Toggle dropdown open/close
    selected.addEventListener("click", () => {
      // Close all other dropdowns
      document.querySelectorAll(".custom-dropdown.open").forEach(dd => {
        if (dd !== dropdown) {
          dd.classList.remove("open");
          dd.querySelector(".dropdown-options").style.display = "none";
        }
      });

      // Toggle this dropdown
      dropdown.classList.toggle("open");
      optionsContainer.style.display = dropdown.classList.contains("open") ? "block" : "none";
    });

    // Select an option
    options.forEach(option => {
      option.addEventListener("click", () => {
        // Remove active from all options in this dropdown
        options.forEach(opt => opt.classList.remove("active"));

        // Set clicked option as active
        option.classList.add("active");

        // Update selected text
        selected.childNodes[0].nodeValue = option.textContent;

        // Update hidden input for form submission
        hiddenInput.value = option.dataset.value;

        // Close dropdown
        dropdown.classList.remove("open");
        optionsContainer.style.display = "none";
      });
    });
  });
}

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".custom-dropdown.open").forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      dropdown.querySelector(".dropdown-options").style.display = "none";
    }
  });
});

// Initialize dropdowns on page load
document.addEventListener("DOMContentLoaded", () => {
  initCustomDropdowns();
});



document.addEventListener("click", function (e) {

  // Close ALL dropdowns first
  document.querySelectorAll(".dropdown-menu-custom").forEach(menu => {
    if (!menu.contains(e.target) && !e.target.closest(".dropdown-toggle-btn")) {
      menu.style.display = "none";
    }
  });

  // Toggle only the clicked dropdown
  const toggleBtn = e.target.closest(".dropdown-toggle-btn");
  if (toggleBtn) {
    const parent = toggleBtn.closest(".action-dropdown");
    const menu = parent.querySelector(".dropdown-menu-custom");

    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
});
