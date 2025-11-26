
/* ---------------------------------------------------
   SIDEBAR TOGGLE (Mobile Only)
--------------------------------------------------- */
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("mobileOverlay");

menuToggle.addEventListener("click", () => {
  if (window.innerWidth <= 820) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("show");

    // Close all submenus on open
    document.querySelectorAll(".submenu").forEach((m) => m.classList.remove("open"));
  }
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("show");

  document.querySelectorAll(".submenu").forEach((m) => m.classList.remove("open"));
});

/* ---------------------------------------------------
   PAGE SWITCHING
--------------------------------------------------- */
const pages = {
  home: document.getElementById("homePage"),
  analytics: document.getElementById("analyticsPage"),
  files: document.getElementById("filesPage"),
  messages: document.getElementById("messagesPage"),
  settings: document.getElementById("settingsPage"),
};

const buttons = {
  home: document.getElementById("btnHome"),
  analytics: document.getElementById("btnAnalytics"),
  files: document.getElementById("btnFiles"),
  messages: document.getElementById("btnMessages"),
  settings: document.getElementById("btnSettings"),
};

/* ---------------------------------------------------
   DEFAULT ACTIVE MENU (HOME)
--------------------------------------------------- */
buttons.home.classList.add("active");
pages.home.classList.remove("d-none");

function showPage(pageName) {
  // Hide all pages
  Object.values(pages).forEach((p) => p.classList.add("d-none"));
  pages[pageName].classList.remove("d-none");

  // Update active menu
  Object.values(buttons).forEach((b) => b.classList.remove("active"));
  buttons[pageName].classList.add("active");

  // Close submenus
  document.querySelectorAll(".submenu").forEach((m) => m.classList.remove("open"));
  document.querySelectorAll(".sub-item").forEach((x) => x.classList.remove("active"));

  // Close sidebar (mobile)
  if (window.innerWidth <= 820) {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
  }
}

// Main menu clicks
buttons.home.onclick       = () => showPage("home");
buttons.analytics.onclick  = () => showPage("analytics");
buttons.files.onclick      = () => showPage("files");
buttons.messages.onclick   = () => showPage("messages");
buttons.settings.onclick   = () => showPage("settings");

/* ---------------------------------------------------
   SUBMENU TOGGLE (Mobile Only — Click Only)
--------------------------------------------------- */
document.querySelectorAll(".has-sub").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (window.innerWidth > 820) return; // desktop ignore
    e.stopPropagation();

    const submenu = this.parentElement.querySelector(".submenu");

    // Close all other submenus
    document.querySelectorAll(".submenu.open").forEach((m) => {
      if (m !== submenu) m.classList.remove("open");
    });

    submenu.classList.toggle("open");
  });
});

/* ---------------------------------------------------
   SUBMENU PAGE SWITCHING (Mobile)
--------------------------------------------------- */
document.querySelectorAll(".sub-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    if (window.innerWidth > 820) return; 
    e.stopPropagation();

    const pageName = this.dataset.page;

    // Active submenu item style
    document.querySelectorAll(".sub-item").forEach((x) => x.classList.remove("active"));
    this.classList.add("active");

    // Demo: load sub page
    alert(`Loaded Sub Page: ${pageName}`);

    // Close sidebar
    sidebar.classList.remove("active");
    overlay.classList.remove("show");

    // Close submenus
    document.querySelectorAll(".submenu").forEach((m) => m.classList.remove("open"));
  });
});

/* ---------------------------------------------------
   CLOSE SUBMENUS WHEN CLICKING OUTSIDE (Mobile)
--------------------------------------------------- */
document.addEventListener("click", (e) => {
  if (window.innerWidth > 820) return;
  if (!e.target.closest(".sidebar")) {
    document.querySelectorAll(".submenu").forEach((m) => m.classList.remove("open"));
  }
});

/* ---------------------------------------------------
   ESC KEY CLOSE SIDEBAR + SUBMENUS (Mobile Only)
--------------------------------------------------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && window.innerWidth <= 820) {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
    document.querySelectorAll(".submenu").forEach((m) => m.classList.remove("open"));
  }
});




// Get elements
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Toggle notification dropdown
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle('show');
      profileDropdown.classList.remove('show');
    });

    // Toggle profile dropdown
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('show');
      notificationDropdown.classList.remove('show');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      notificationDropdown.classList.remove('show');
      profileDropdown.classList.remove('show');
    });

    // Prevent dropdown from closing when clicking inside
    notificationDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    profileDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });


    
    // Handle notification item clicks
    document.querySelectorAll('.notification-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.remove('unread');
        // Update badge count
        const badge = document.querySelector('.notification-badge');
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        if (unreadCount > 0) {
          badge.textContent = unreadCount;
        } else {
          badge.style.display = 'none';
        }
      });
    });

    // Handle profile dropdown item clicks
    document.querySelectorAll('.profile-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const text = item.textContent.trim();
        if (text === 'Sign Out') {
          alert('Signing out...');
          // Add your sign out logic here
        } else {
          alert(`Navigating to: ${text}`);
          // Add your navigation logic here
        }
      });
    });