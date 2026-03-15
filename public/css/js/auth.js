/* auth.js — shared script for login.ejs and signup.ejs */

/* ── Animated dot grid ─────────────────────────── */
(function () {
  const canvas = document.getElementById("dotCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let raf;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function draw() {
    const W = canvas.width,
      H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const spacing = 28;
    const t = Date.now() / 2200;

    for (let x = 0; x <= W; x += spacing) {
      for (let y = 0; y <= H; y += spacing) {
        const dist = Math.sqrt(
          Math.pow(x - W * 0.5, 2) + Math.pow(y - H * 0.62, 2),
        );
        const wave = Math.sin(dist / 58 - t) * 0.5 + 0.5;
        const alpha = 0.05 + wave * 0.14;
        const r = 0.9 + wave * 1.3;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,83,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    }
    raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    resize();
  });
})();

/* ── Toggle password visibility ───────────────── */
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  const isText = input.type === "text";
  input.type = isText ? "password" : "text";
  btn.querySelector(".eye-icon").style.opacity = isText ? "1" : "0.45";
}

/* ── Password strength meter (signup only) ─────── */
(function () {
  const passInput = document.getElementById("password");
  const fill = document.getElementById("strengthFill");
  const label = document.getElementById("strengthLabel");
  if (!passInput || !fill || !label) return;

  const levels = [
    { min: 0, w: "0%", bg: "transparent", text: "" },
    { min: 1, w: "25%", bg: "#e05c5c", text: "Too weak" },
    { min: 6, w: "50%", bg: "#e09a3a", text: "Fair" },
    { min: 8, w: "75%", bg: "#d4c23a", text: "Good" },
    { min: 10, w: "100%", bg: "#5ca87a", text: "Strong" },
  ];

  passInput.addEventListener("input", function () {
    const v = this.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (v.length >= 10) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    const lvl =
      score === 0
        ? levels[0]
        : score <= 1
          ? levels[1]
          : score <= 2
            ? levels[2]
            : score <= 3
              ? levels[3]
              : levels[4];

    fill.style.width = lvl.w;
    fill.style.background = lvl.bg;
    label.textContent = lvl.text;
    label.style.color = lvl.bg || "var(--smoke4)";
  });
})();

/* ── Helpers ───────────────────────────────────── */
function showErr(inputId, errId) {
  const el = document.getElementById(inputId);
  const msg = document.getElementById(errId);
  if (el) el.classList.add("invalid");
  if (msg) msg.classList.add("visible");
}

function clearErr(inputId, errId) {
  const el = document.getElementById(inputId);
  const msg = document.getElementById(errId);
  if (el) el.classList.remove("invalid");
  if (msg) msg.classList.remove("visible");
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const txt = btn.querySelector(".btn-text");
  const loader = btn.querySelector(".btn-loader");
  btn.disabled = loading;
  if (txt) txt.style.display = loading ? "none" : "";
  if (loader) loader.style.display = loading ? "flex" : "none";
}

/* ── Clear errors on input ─────────────────────── */
["email", "password", "firstName", "username"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", function () {
    this.classList.remove("invalid");
    const errEl = document.getElementById(
      id === "email"
        ? "email-err"
        : id === "password"
          ? "pass-err"
          : id === "firstName"
            ? "fname-err"
            : id === "username"
              ? "username-err"
              : "",
    );
    if (errEl) errEl.classList.remove("visible");
  });
});

/* ── Login form validation ─────────────────────── */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    let valid = true;

    const email = document.getElementById("email").value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      showErr("email", "email-err");
      valid = false;
    } else clearErr("email", "email-err");

    const pass = document.getElementById("password").value;
    if (!pass) {
      showErr("password", "pass-err");
      valid = false;
    } else clearErr("password", "pass-err");

    if (!valid) {
      e.preventDefault();
      return;
    }
    setLoading("submitBtn", true);
  });
}

/* ── Signup form validation ────────────────────── */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    let valid = true;

    const fname = document.getElementById("firstName").value.trim();
    if (!fname) {
      showErr("firstName", "fname-err");
      valid = false;
    } else clearErr("firstName", "fname-err");

    const email = document.getElementById("email").value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      showErr("email", "email-err");
      valid = false;
    } else clearErr("email", "email-err");

    const username = document.getElementById("username").value.trim();
    const usernameOk = /^[a-zA-Z0-9_]{3,20}$/.test(username);
    if (!usernameOk) {
      showErr("username", "username-err");
      valid = false;
    } else clearErr("username", "username-err");

    const pass = document.getElementById("password").value;
    if (pass.length < 8) {
      showErr("password", "pass-err");
      valid = false;
    } else clearErr("password", "pass-err");

    if (!valid) {
      e.preventDefault();
      return;
    }
    setLoading("submitBtn", true);
  });
}
