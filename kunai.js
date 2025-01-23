const canvas = document.getElementById("kunaiCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5; // Przyspieszenie grawitacyjne
let kunai = {
    x: 50,
    y: canvas.height - 50,
    angle: 45, // Kąt w stopniach
    speed: 20, // Prędkość początkowa
    vx: 0,
    vy: 0,
    rotation: 0, // Kąt obrotu kunai
};

function initKunai() {
    const radianAngle = (kunai.angle * Math.PI) / 180; // Przekształcenie na radiany
    kunai.vx = kunai.speed * Math.cos(radianAngle);
    kunai.vy = -kunai.speed * Math.sin(radianAngle);
}

function drawKunai() {
    ctx.save();
    ctx.translate(kunai.x, kunai.y);
    ctx.rotate(kunai.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -10); // Główna część kunai
    ctx.lineTo(20, 0);
    ctx.lineTo(0, 10);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();
}

function updateKunai() {
    // Aktualizacja pozycji
    kunai.x += kunai.vx;
    kunai.y += kunai.vy;
    kunai.vy += gravity; // Dodanie grawitacji
    kunai.rotation += 0.1; // Obroty kunai

    // Sprawdzenie kolizji z ziemią
    if (kunai.y > canvas.height - 10) {
        kunai.y = canvas.height - 10;
        kunai.vy *= -0.5; // Odbicie z tłumieniem
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawKunai();
    updateKunai();
    requestAnimationFrame(animate);
}

// Inicjalizacja
initKunai();
animate();
