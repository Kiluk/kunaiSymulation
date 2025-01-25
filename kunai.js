const canvas = document.getElementById("kunaiCanvas");
const ctx = canvas.getContext("2d");

const gravity = 9.8; // Przyspieszenie grawitacyjne (m/s^2)
let kunai = {
    x: 50,
    y: canvas.height - 50,
    angle: 45, // Kąt w stopniach (domyślny)
    speed: 20, // Prędkość początkowa (domyślna)
    vx: 0,
    vy: 0,
    rotation: 0, // Kąt obrotu kunai
};

let animationFrame; // Referencja do animacji
let maxDistance = 0; // Maksymalna odległość

function calculateDistance() {
    // Oblicz odległość na podstawie wzoru d = (v^2 * sin(2*theta)) / g
    const radianAngle = (kunai.angle * Math.PI) / 180; // Kąt w radianach
    const sin2Theta = Math.sin(2 * radianAngle);
    maxDistance = (Math.pow(kunai.speed, 2) * sin2Theta) / gravity;

    // Zaktualizuj wynik w HTML
    const distanceResult = document.getElementById("distanceResult");
    distanceResult.textContent = `Obliczona odległość: ${maxDistance.toFixed(2)} m`;
}

function initKunai() {
    // Reset pozycji kunai
    kunai.x = 50;
    kunai.y = canvas.height - 50;

    // Pobranie wartości z pól tekstowych
    const angleInput = document.getElementById("angleInput").value;
    const speedInput = document.getElementById("speedInput").value;

    kunai.angle = parseFloat(angleInput) || 45; // Ustawienie kąta
    kunai.speed = parseFloat(speedInput) || 20; // Ustawienie prędkości

    // Obliczenie składowych prędkości początkowej
    const radianAngle = (kunai.angle * Math.PI) / 180; // Przekształcenie kąta na radiany
    kunai.vx = kunai.speed * Math.cos(radianAngle); // Składowa pozioma
    kunai.vy = -kunai.speed * Math.sin(radianAngle); // Składowa pionowa

    calculateDistance(); // Oblicz odległość
}

function drawKunai() {
    ctx.save();
    ctx.translate(kunai.x, kunai.y);
    ctx.rotate(kunai.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -5); // Główna część kunai
    ctx.lineTo(20, 0);
    ctx.lineTo(0, 5);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();
}

function drawDistance() {
    ctx.save();
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(`Odległość: ${maxDistance.toFixed(2)} m`, 10, 30);
    ctx.restore();
}

function updateKunai() {
    // Aktualizacja pozycji
    kunai.x += kunai.vx;
    kunai.y += kunai.vy;
    kunai.vy += gravity / 60; // Dodanie grawitacji (podzielone na klatki)
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
    drawDistance();
    updateKunai();

    // Zatrzymanie animacji, gdy kunai zatrzyma się na ziemi
    if (kunai.y < canvas.height - 10 || Math.abs(kunai.vy) > 0.1) {
        animationFrame = requestAnimationFrame(animate);
    }
}

document.getElementById("startSimulation").addEventListener("click", () => {
    cancelAnimationFrame(animationFrame); // Zatrzymanie poprzedniej animacji (jeśli istnieje)
    initKunai(); // Inicjalizacja kunai z nowymi wartościami
    animate(); // Rozpoczęcie animacji
});
