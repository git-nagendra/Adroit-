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
   SIDEBAR TOGGLE (MOBILE)
========================================================== */
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("mobileOverlay");

menuToggle.addEventListener("click", () => {
  if (window.innerWidth <= 820) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("show");
  }
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("show");
});


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





// Get elements
const notificationBtn = document.getElementById("notificationBtn");
const notificationDropdown = document.getElementById("notificationDropdown");
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");

// Toggle notification dropdown
notificationBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notificationDropdown.classList.toggle("show");
  profileDropdown.classList.remove("show");
});

// Toggle profile dropdown
profileBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("show");
  notificationDropdown.classList.remove("show");
});

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  notificationDropdown.classList.remove("show");
  profileDropdown.classList.remove("show");
});

// Prevent dropdown from closing when clicking inside
notificationDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
});

profileDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Handle notification item clicks
document.querySelectorAll(".notification-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.remove("unread");
    // Update badge count
    const badge = document.querySelector(".notification-badge");
    const unreadCount = document.querySelectorAll(
      ".notification-item.unread"
    ).length;
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
    } else {
      badge.style.display = "none";
    }
  });
});

// Handle profile dropdown item clicks
document.querySelectorAll(".profile-dropdown-item").forEach((item) => {
  item.addEventListener("click", () => {
    // const text = item.textContent.trim();
    // if (text === "Sign Out") {
    //   alert("Signing out...");
    //   // Add your sign out logic here
    // } else {
    //   alert(`Navigating to: ${text}`);
    //   // Add your navigation logic here
    // }
  });
});




      function toggleChat() {
        const chat = document.getElementById("chatBox");
        chat.style.display = chat.style.display === "flex" ? "none" : "flex";
      }

      function resetChat() {
        document.getElementById("chatBody").innerHTML = `
    <div class="message bot-msg">Hello , i'm here to assist you.</div>
    <div class="message bot-msg">May I know your name?</div>
  `;
      }















