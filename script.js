
function showConfirmation() {
    document.getElementById('proposalPage').style.display = 'none';
    document.getElementById('confirmationPage').style.display = 'flex';

    // Transisi warna background

    // Efek lemparan dari tombol "Mau"
    startHeartSplash();

    // Efek love dari pojok kanan & kiri atas ❤️
    startHeartEffect();

    // Lagu romantis saat diklik
    const audio = document.getElementById('loveSong');
    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(err => console.log("Autoplay dicegah:", err));
    }
}

// =========================
// EFEK LOVE DARI KANAN & KIRI
// =========================
function startHeartEffect() {
    const container = document.getElementById("heartParticles");
    if (!container) return;

    // kiri atas
    for (let i = 0; i < 15; i++) {
        spawnHeart(0, 0, container);
    }

    // kanan atas
    for (let i = 0; i < 15; i++) {
        spawnHeart(window.innerWidth, 0, container);
    }
}

function spawnHeart(xStart, yStart, container) {
    const heart = document.createElement("div");
    heart.classList.add("heart-particle");
    heart.innerHTML = "♡";
    heart.style.position = "fixed";
    heart.style.left = `${xStart}px`;
    heart.style.top = `${yStart}px`;
    heart.style.fontSize = `${Math.random() * 3 + 1}rem`;
    heart.style.color = "#ad5123ff";
    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";
    container.appendChild(heart);

    const xEnd = xStart === 0
        ? Math.random() * window.innerWidth * 0.8 // kalau dari kiri, ke kanan
        : -Math.random() * window.innerWidth * 0.8; // kalau dari kanan, ke kiri
    const yEnd = Math.random() * window.innerHeight * 0.9;

    const duration = Math.random() * 2 + 3;
    heart.animate(
        [
            { transform: "translate(0, 0)", opacity: 1 },
            { transform: `translate(${xEnd}px, ${yEnd}px)`, opacity: 0 }
        ],
        {
            duration: duration * 1000,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    setTimeout(() => heart.remove(), duration * 1000);
}

// =========================
// EFEK SPLASH HATI GLOBAL
// =========================
function startHeartSplash() {
    const heartContainer = document.getElementById('heartParticles');
    const button = document.querySelector('.yes-button');
    if (!heartContainer || !button) return;

    // Ambil posisi tombol "MAU"
    const rect = button.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // Buat 40 partikel hati
    for (let i = 0; i < 40; i++) {
        setTimeout(() => createHeart(originX, originY, heartContainer), i * 30);
    }
}

// =========================
// FUNGSI BUAT PARTIKEL HATI
// =========================
function createHeart(originX, originY, heartContainer) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '♡';

    heart.style.position = 'fixed';
    heart.style.left = `${originX}px`;
    heart.style.top = `${originY}px`;
    heart.style.pointerEvents = 'none';
    heart.style.color = '#ad5123ff';
    heart.style.fontSize = `${Math.random() * 3.5 + 0.8}rem`;
    heart.style.zIndex = '9999';
    heartContainer.appendChild(heart);

    // Fisika sederhana
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4;
    const gravity = 0.35;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed * -1;

    let x = originX;
    let y = originY;
    const duration = 1600 + Math.random() * 600;
    const start = performance.now();

    function animate(now) {
        const elapsed = now - start;
        if (elapsed > duration) {
            heart.remove();
            return;
        }

        x += vx;
        y += vy;
        vy += gravity;

        heart.style.transform = `translate(${x - originX}px, ${y - originY}px) rotate(${elapsed / 5}deg)`;
        heart.style.opacity = 1 - elapsed / duration;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// =========================
// TOMBOL "TIDAK" NGELAK
// =========================
function handleNo() {
    const noButton = document.querySelector('.no-button');
    const container = document.getElementById('proposalPage');
    noButton.style.position = 'absolute';

    const maxX = container.clientWidth - noButton.clientWidth;
    const maxY = container.clientHeight - noButton.clientHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.transform = `rotate(${Math.random() * 360}deg)`;
}

// =========================
// EFEK KERTAS VINTAGE
// =========================
document.addEventListener('DOMContentLoaded', function() {
    const frames = document.querySelectorAll('.vintage-frame');
    frames.forEach(frame => {
        frame.style.transform = 'none';
    });
});

