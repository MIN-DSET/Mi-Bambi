const pages = document.querySelectorAll(".page");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const firstButtons = document.getElementById("firstButtons");

const nextBtn = document.getElementById("nextBtn");

const finalYesBtn = document.getElementById("finalYesBtn");
const finalNoBtn = document.getElementById("finalNoBtn");

const notificationBtn = document.getElementById("notificationBtn");
const notification = document.getElementById("notification");
const closeNotification = document.getElementById("closeNotification");

const floatingHearts = document.getElementById("floatingHearts");

let yesJumps = 0;
let noMoves = 0;
let noTimer = null;
let yesTimer = null;
let finalNoTimer = null;

function showPage(pageNumber) {
pages.forEach(function(page) {
page.classList.remove("active");
});

document.getElementById("page" + pageNumber).classList.add("active");

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// PAGE 1: YES BUTTON JUMPS THREE TIMES

function jumpYesButton() {
if (yesJumps >= 3) {
return;
}

yesJumps++;

const messages = [
    "YES 💖",
    "YESSS! 🤭",
    "CATCH ME! 😂",
    "OKAY, SAY YES! 🥹❤️"
];

yesBtn.textContent = messages[yesJumps];

if (yesJumps < 3) {
    yesBtn.style.transform =
        "translate(" +
        (Math.random() * 100 - 50) + "px, " +
        (Math.random() * 70 - 35) + "px)";

    clearTimeout(yesTimer);

    yesTimer = setTimeout(function() {
        yesBtn.style.transform = "translate(0, 0)";
    }, 450);
} else {
    yesBtn.style.transform = "translate(0, 0)";
    yesBtn.textContent = "OKAY, SAY YES! 🥹❤️";
    yesBtn.classList.add("ready");
}

}

yesBtn.addEventListener("click", function() {
if (yesJumps < 3) {
jumpYesButton();
} else {
clearTimeout(yesTimer);
showPage(2);
}
});

// PAGE 1: NO BUTTON RUNS AWAY

function moveNoButton() {
const padding = 10;

const buttonWidth = noBtn.offsetWidth;
const buttonHeight = noBtn.offsetHeight;

const maxX = Math.max(
    padding,
    window.innerWidth - buttonWidth - padding
);

const maxY = Math.max(
    padding,
    window.innerHeight - buttonHeight - padding
);

noBtn.style.position = "fixed";
noBtn.style.left =
    padding + Math.random() * (maxX - padding) + "px";

noBtn.style.top =
    padding + Math.random() * (maxY - padding) + "px";

noBtn.style.zIndex = "20";

noMoves++;

const messages = [
    "NO 🙈",
    "Catch me! 😂",
    "Nope! 😜",
    "Hehehe 💗",
    "Try again! 🏃",
    "You can't catch me! 🤭"
];

noBtn.textContent =
    messages[Math.min(noMoves, messages.length - 1)];

}

noBtn.addEventListener("pointerenter", function(event) {
if (event.pointerType === "mouse") {
moveNoButton();
}
});

noBtn.addEventListener("pointerdown", function(event) {
event.preventDefault();
moveNoButton();
});

noBtn.addEventListener("click", function(event) {
event.preventDefault();
moveNoButton();
});

// PAGE 2: OPEN THE FINAL QUESTION

nextBtn.addEventListener("click", function() {
showPage(3);
});

// PAGE 3: FINAL YES

function celebrate() {
clearInterval(finalNoTimer);

showPage(4);

notification.classList.remove("hidden");

createConfetti();

}

finalYesBtn.addEventListener("click", celebrate);

// PAGE 3: FINAL NO KEEPS MOVING

function moveFinalNoButton() {
const buttonWidth = finalNoBtn.offsetWidth;
const buttonHeight = finalNoBtn.offsetHeight;
const padding = 10;

const maxX = Math.max(
    padding,
    window.innerWidth - buttonWidth - padding
);

const maxY = Math.max(
    padding,
    window.innerHeight - buttonHeight - padding
);

finalNoBtn.style.position = "fixed";
finalNoBtn.style.left =
    padding + Math.random() * (maxX - padding) + "px";

finalNoBtn.style.top =
    padding + Math.random() * (maxY - padding) + "px";

finalNoBtn.style.zIndex = "20";

}

finalNoBtn.addEventListener("pointerenter", function(event) {
if (event.pointerType === "mouse") {
moveFinalNoButton();
}
});

finalNoBtn.addEventListener("pointerdown", function(event) {
event.preventDefault();
moveFinalNoButton();
});

finalNoBtn.addEventListener("click", function(event) {
event.preventDefault();
moveFinalNoButton();
});

// FINAL NOTIFICATION

notificationBtn.addEventListener("click", function() {
notification.classList.remove("hidden");
});

closeNotification.addEventListener("click", function() {
notification.classList.add("hidden");
});

// FLOATING HEARTS

function createHeart() {
const heart = document.createElement("span");

heart.className = "float-heart";

const symbols = ["💗", "💕", "💖", "💓", "❤️", "🌸"];

heart.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

heart.style.left = Math.random() * 100 + "%";

heart.style.fontSize =
    (16 + Math.random() * 22) + "px";

heart.style.animationDuration =
    (5 + Math.random() * 5) + "s";

floatingHearts.appendChild(heart);

setTimeout(function() {
    heart.remove();
}, 11000);

}

setInterval(createHeart, 550);

// CELEBRATION CONFETTI

function createConfetti() {
const symbols = ["💖", "💕", "✨", "🎉", "💗"];

for (let i = 0; i < 40; i++) {
    const piece = document.createElement("span");

    piece.className = "float-heart";
    piece.style.position = "fixed";
    piece.style.bottom = "auto";
    piece.style.top = "-30px";

    piece.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "%";

    piece.style.animationDuration =
        (3 + Math.random() * 3) + "s";

    floatingHearts.appendChild(piece);

    setTimeout(function() {
        piece.remove();
    }, 6500);
}

}