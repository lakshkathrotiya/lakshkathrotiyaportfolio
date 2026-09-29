// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Typing effect (edit these words!) ----------
const words = ["Developer", "Creator", "Designer", "Problem Solver"];
const typed = document.getElementById("typed");
let wordIndex = 0, charIndex = words[0].length, deleting = true;

function type() {
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);
  if (deleting) {
    charIndex--;
    if (charIndex < 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; charIndex = 0; }
  } else {
    charIndex++;
    if (charIndex > words[wordIndex].length) { deleting = true; setTimeout(type, 1600); return; }
  }
  setTimeout(type, deleting ? 50 : 100);
}
if (!reduceMotion) setTimeout(type, 1600);

// ---------- Cursor glow ----------
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- Card tilt ----------
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    if (reduceMotion) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
});

// ---------- Floating glowing sparks ----------
const canvas = document.getElementById("sparks");
const ctx = canvas.getContext("2d");
const colors = ["0,240,255", "180,76,255", "255,62,165"];
let sparks = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 22000));
  sparks = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vy: -(Math.random() * 0.35 + 0.1),
    vx: (Math.random() - 0.5) * 0.2,
    c: colors[Math.floor(Math.random() * colors.length)],
    a: Math.random() * Math.PI * 2,
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of sparks) {
    s.x += s.vx; s.y += s.vy; s.a += 0.02;
    if (s.y < -10) { s.y = canvas.height + 10; s.x = Math.random() * canvas.width; }
    const alpha = 0.4 + Math.sin(s.a) * 0.3;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${s.c},${alpha})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `rgba(${s.c},1)`;
    ctx.fill();
  }
  if (!reduceMotion) requestAnimationFrame(draw);
}
window.addEventListener("resize", resize);
resize();
draw();

// ---------- Contact form (Netlify Forms, AJAX) ----------
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";
  status.textContent = "Sending…";
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    status.classList.add("ok");
    status.textContent = "Thanks! Your message was sent ✨";
  } catch {
    status.classList.add("err");
    status.textContent = "Oops, something went wrong. Please try again.";
  }
});
