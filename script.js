const start = document.querySelector("#startBtn");
const holes = document.querySelectorAll(".hole");
const mole = document.querySelectorAll(".mole")
const scoreBoard = document.querySelector(".score")
const pan = document.querySelector(".pan")
const sound = document.querySelector(".sound")

let lastHole;
let timeUp = false
let score = 0

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length)
    const hole = holes[index]
    if (lastHole === hole) {
        console.log("same");
        randomHole(holes)
    }
    lastHole = hole
    return hole
}

function panMove(e) {
    const coords = {
        top: e.clientY,
        left: e.clientX
    }
    pan.style.top = `${coords.top}px`
    pan.style.left = `${coords.left}px`
}

function peep() {
    const time = randomTime(200, 800)
    const hole = randomHole(holes)
    hole.classList.add("up");
    document.body.classList.add("cross")
    start.style.display = "none"
    setTimeout(() => {
        start.style.display = "block"
        document.body.classList.remove("cross")
        hole.classList.remove("up")
        if (!timeUp) peep();
    }, time)
}

function startGame() {
    score = 0
    scoreBoard.textContent = 0;
    timeUp = false
    peep()
    setTimeout(() => timeUp = true, 30000)
}

function pewpew(e) {
    if (!e.isTrusted) return
    score++
    sound.play()
    this.classList.remove("up")
    scoreBoard.innerHTML = score
}



window.addEventListener("mousemove", panMove)
start.addEventListener("click", startGame)
mole.forEach(mole => mole.addEventListener("click", pewpew))
