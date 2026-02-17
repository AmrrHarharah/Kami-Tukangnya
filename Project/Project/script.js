document.addEventListener("DOMContentLoaded", () => {
  // Utilities
  const $ = (selector) => document.querySelector(selector);

  // Year in footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const navToggle = $("#navToggle");
  const nav = $("#nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close nav when clicking a link
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // Tombol back-to-top dengan animasi muncul saat scroll
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // IntersectionObserver for .animate elements
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.12 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate").forEach((el) => observer.observe(el));

  // Contact form -> open WhatsApp with prefilled message + loading & alert
  const contactForm = $("#contactForm");
  if (contactForm) {
    const btn = contactForm.querySelector("button[type='submit']");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = encodeURIComponent((contactForm.name.value || "").trim());
      const phone = (contactForm.phone.value || "").replace(/\D/g, "").trim();
      const message = encodeURIComponent(
        (contactForm.message.value || "").trim()
      );

      if (!name || !phone || !message) {
        alert("⚠️ Mohon lengkapi semua kolom sebelum mengirim.");
        return;
      }

      // Tampilkan loading di tombol
      const oldText = btn.textContent;
      btn.textContent = "Mengirim...";
      btn.disabled = true;

      // Format nomor WA
      let waNumber = "6283894994917"; // nomor kamu
      const text = `Halo Kami Tukangnya,%0A%0ANama: ${name}%0ANo: ${phone}%0AProyek: ${message}`;
      const waUrl = `https://wa.me/${waNumber}?text=${text}`;

      // Simulasi loading 1 detik biar smooth
      setTimeout(() => {
        window.open(waUrl, "_blank", "noopener");

        // Reset tombol
        btn.textContent = oldText;
        btn.disabled = false;

        // Notifikasi sukses
        showNotif("✅ Pesan berhasil diarahkan ke WhatsApp kamu!");
        contactForm.reset();
      }, 1000);
    });
  }

  // 🔔 Fungsi notifikasi kecil (toast style)
  function showNotif(msg) {
    const notif = document.createElement("div");
    notif.textContent = msg;
    notif.style.position = "fixed";
    notif.style.bottom = "30px";
    notif.style.right = "30px";
    notif.style.background = "#4caf50";
    notif.style.color = "#fff";
    notif.style.padding = "14px 20px";
    notif.style.borderRadius = "10px";
    notif.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    notif.style.fontSize = "15px";
    notif.style.zIndex = "9999";
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.3s ease";
    document.body.appendChild(notif);

    setTimeout(() => (notif.style.opacity = "1"), 10);
    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 400);
    }, 3000);
  }

  // Smooth scroll for internal links (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        const yOffset = 80; // account for fixed navbar
        const y =
          targetEl.getBoundingClientRect().top + window.pageYOffset - yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
}); // Tombol animasi saat scroll (optional bisa dikembangkan)
window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 50);
});
// Data foto tiap proyek
const projects = {
  proyek1: [
    "./image-proyek/foto2.jpg",
    "./image-proyek/foto3.jpg",
    "./image-proyek/foto4.jpg",
    "./image-proyek/foto5.jpg",
    "./image-proyek/foto6.jpg",
    "./image-proyek/foto7.jpg",
  ],
  proyek2: [
    "./image/proyek2-1.jpg",
    "./image/proyek2-2.jpg",
    "./image/proyek2-3.jpg",
    "./image/proyek2-4.jpg",
  ],
  proyek3: [
    "./image/proyek3-1.jpg",
    "./image/proyek3-2.jpg",
    "./image/proyek3-3.jpg",
    "./image/proyek3-4.jpg",
  ],
};

// Elemen
const modal = document.getElementById("galleryModal");
const modalGallery = document.querySelector(".modal-gallery");
const closeBtn = document.querySelector(".close");

// Klik kartu proyek
document.querySelectorAll(".proyek-card").forEach((card) => {
  card.addEventListener("click", () => {
    const projectName = card.getAttribute("data-project");
    const imgs = projects[projectName];
    modalGallery.innerHTML = imgs
      .map((src) => `<img src="${src}" alt="">`)
      .join("");
    modal.style.display = "block";
  });
});

// Tutup modal
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

// Tutup saat klik di luar modal
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  // Toggle navbar
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      navToggle.classList.toggle("active");
    });

    // Tutup menu saat klik link
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.classList.remove("active");
      });
    });
  }

  // Tombol back to top
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
