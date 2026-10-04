const discordSdk = new window.discord.DiscordSDK("1555838141187760128");

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const welcomeMessage = document.getElementById("welcome-message");
const scoreCounter = document.getElementById("score-counter");

let score = 0;
let gameActive = false;
let player = { x: 0, y: 0, width: 60, height: 60 };
let lasers = [];
let meteors = [];
let particles = [];

// Load Visuals
const shipImg = new Image();
shipImg.src = 'ship.png';

const meteorImg = new Image();
meteorImg.src = 'meteor.png';

const bgImg = new Image();
bgImg.src = 'background.jpg';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    player.y = canvas.height - 80;
    if(!player.x) player.x = canvas.width / 2;
}
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => { player.x = e.clientX; });
window.addEventListener('touchmove', (e) => { if(e.touches.length > 0) player.x = e.touches.clientX; });

// Shoot loop
setInterval(() => {
    if (!gameActive) return;
    lasers.push({ x: player.x, y: player.y - 10, speed: 10 });
}, 180);

// Enemy spawn loop
setInterval(() => {
    if (!gameActive) return;
    meteors.push({
        x: Math.random() * canvas.width,
        y: -50,
        speed: 2 + Math.random() * 3,
        size: 30 + Math.random() * 30
    });
}, 600);

function createExplosion(x, y, color) {
    for(let i=0; i<12; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            alpha: 1,
            color: color
        });
    }
}

// Animation Loop
function updateFrame() {
    if (bgImg.complete) {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#0b0c10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (!gameActive) {
        requestAnimationFrame(updateFrame);
        return;
    }

    if (shipImg.complete) {
        ctx.drawImage(shipImg, player.x - player.width / 2, player.y, player.width, player.height);
    }

    ctx.fillStyle = '#ff007f';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff007f';
    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].y -= lasers[i].speed;
        ctx.fillRect(lasers[i].x - 2, lasers[i].y, 4, 15);
        if (lasers[i].y < 0) lasers.splice(i, 1);
    }
    ctx.shadowBlur = 0;

    for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].y += meteors[i].speed;
        
        if (meteorImg.complete) {
            ctx.drawImage(meteorImg, meteors[i].x - meteors[i].size, meteors[i].y - meteors[i].size, meteors[i].size * 2, meteors[i].size * 2);
        }

        for (let j = lasers.length - 1; j >= 0; j--) {
            let dist = Math.hypot(lasers[j].x - meteors[i].x, lasers[j].y - meteors[i].y);
            if (dist < meteors[i].size) {
                createExplosion(meteors[i].x, meteors[i].y, '#ffc107');
                meteors.splice(i, 1);
                lasers.splice(j, 1);
                score += 10;
                scoreCounter.innerText = score;
                break;
            }
        }

        if (meteors[i] && meteors[i].y > canvas.height + 50) meteors.splice(i, 1);
    }

    for(let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].alpha -= 0.04;
        if(particles[i].alpha <= 0) {
            particles.splice(i, 1);
        } else {
            ctx.fillStyle = particles[i].color;
            ctx.globalAlpha = particles[i].alpha;
            ctx.fillRect(particles[i].x, particles[i].y, 3, 3);
            ctx.globalAlpha = 1.0;
        }
    }

    requestAnimationFrame(updateFrame);
}

async function initActivity() {
    try {
        resizeCanvas();
        requestAnimationFrame(updateFrame);
        await discordSdk.ready();
        welcomeMessage.innerText = "COSMIC DEFENDER ACTIVE";
        gameActive = true;
    } catch (e) {
        console.error(e);
        welcomeMessage.innerText = "Dev Mode: Playing outside Discord";
        gameActive = true; 
    }
}

initActivity();
