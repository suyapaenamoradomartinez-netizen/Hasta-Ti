const app = document.getElementById("app");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const petalContainer = document.getElementById("petalContainer");

let stars = 0;

const completed = {
    memory: false,
    code: false,
    hearts: false,
    star: false,
    puzzle: false
};

/* =====================
   PETALOS
===================== */

function createPetal() {
    if (!petalContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");

    
    const size = Math.random() * 8 + 8; 
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (7 + Math.random() * 5) + "s, " + (2 + Math.random() * 2) + "s";

    petalContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}

setInterval(createPetal, 400);

/* =====================
   MUSICA
===================== */

let musicEnabled = false;

musicToggle.addEventListener("click", () => {

    if (!musicEnabled) {

    music.play().catch(error => {
        console.log(error);
    });

    musicEnabled = true;

    musicToggle.textContent =
    "🔇 Pausar";

}else{

    music.pause();

    musicEnabled = false;

        musicToggle.textContent =
        "🔊 Música";
    }

});
   
/* =====================
   INTRO
===================== */

const introQuestion =
    document.getElementById("introQuestion");

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const noMessages = [

    "¿Seguroooo? 🥺",
    "¿De verdad? 🌸",
    "¿Completamente seguro? ☕",
    "¿Segurísimo? 💖",
    "Creo que deberías pensarlo otra vez 🌷"

];

let noScale = 1;
let noIndex = 0;

noBtn.addEventListener("click", () => {

    if (noIndex < noMessages.length) {

        introQuestion.textContent =
            noMessages[noIndex];

        noIndex++;
    }

    noScale *= 0.55;

    noBtn.style.transform =
        `scale(${noScale})`;

    if (noScale < 0.08) {

        noBtn.style.display =
            "none";
    }
});

yesBtn.addEventListener("click", () => {

    if (!musicEnabled) {

        music.play();
        musicEnabled = true;
    }

    showHub();

});
 
function showHub(){

    const template =
    document.getElementById("hubTemplate");

    app.innerHTML =
    template.innerHTML;

    updateStars();

    document.getElementById("memoryBtn").onclick = startMemory;
    document.getElementById("codeBtn").onclick = startCode;
    document.getElementById("heartsBtn").onclick = startHearts;
    document.getElementById("starBtn").onclick = startStarGame;
    document.getElementById("puzzleBtn").onclick = startPuzzle;
}
   

/* =====================
   ESTRELLAS
===================== */

 function updateStars(){

    for(let i = 1; i <= 5; i++){

        const star =
        document.getElementById(
            `star${i}`
        );

        if(!star){
            continue;
        }

        if(i <= stars){

            star.textContent =
            "⭐";

        }else{

            star.textContent =
            "☆";

        }

    }
}

function addStar(){

    stars++;
    
    console.log("ESTRELLAS:", stars);

    if(stars > 5){
        stars = 5;
    }

    updateStars();

if(stars >= 5){

        setTimeout(() => {

            showFinal();

        },1000);

    }

 }

 
/* =====================
   MEMORIA
===================== */

function startMemory() {

    const template =
        document.getElementById(
            "memoryTemplate"
        );

    app.innerHTML =
        template.innerHTML;

    document
        .getElementById("memoryBack")
        .onclick = showHub;

    const board =
        document.getElementById(
            "memoryBoard"
        );

    const message =
        document.getElementById(
            "memoryMessage"
        );

    const cards = [

        "🍰","🍰",
        "🦐","🦐",
        "🐢","🐢",
        "👓","👓",
        "🍓","🍓",
        "🍌","🍌"

    ];

    cards.sort(() =>
        Math.random() - 0.5
    );

    let opened = [];
    let matches = 0;

    const phrases = {

        "🍰":
        "<strong>Pastelito</strong><br>Mi pastelito, siempre tan dulce.",

        "🦐":
        "<strong>Camarón</strong><br>Mi primer apodo, y todavía mi favorito.",

        "🐢":
        "<strong>Tortuga</strong><br>Mi tortuguita, siempre tan bonita siendo tú.",

        "👓":
        "<strong>Lentes</strong><br>Dos pares de lentes, un mismo lugar donde mirar.",

        "🍓":
        "<strong>Fresa</strong><br>Mi fruta favorita, igual que tú eres de mis personas favoritas.",

        "🍌":
        "<strong>Banana</strong><br>Para mi Juanobanano. Sí, tenía que estar."

    };

    cards.forEach(icon => {

        const card =
            document.createElement("div");

        card.className =
            "memory-card";

        card.textContent = "❔";

        card.dataset.icon =
            icon;

        card.addEventListener(
            "click",
            () => {

                if (
                    opened.includes(card)
                ) return;

                if (
                    card.classList.contains("matched")
                ) return;

                card.textContent =
                    icon;

                opened.push(card);

                if (
                    opened.length === 2
                ) {

                    const first =
                        opened[0];

                    const second =
                        opened[1];

                    setTimeout(() => {

                        if (
                            first.dataset.icon ===
                            second.dataset.icon
                        ) {

                            first.classList.add(
                                "matched"
                            );

                            second.classList.add(
                                "matched"
                            );

                            matches++;

                            message.innerHTML =
                                phrases[icon];

                            if (matches === 6) {
    showStarModal("¡Completaste el juego de memoria y desbloqueaste la primera estrella! ⭐", () => {
        showHub();
    });
}
                                if (
                                    !completed.memory
                                ) {

                                    completed.memory = true;

                                    addStar();
                                }
                            }

                        } else {

                            first.textContent = "❔";
                            second.textContent = "❔";
                        }

                        opened = [];

                    }, 800);
                }

            }
        );

        board.appendChild(card);
    });
}function startCode(){

    const template =
        document.getElementById("codeTemplate");

    app.innerHTML =
        template.innerHTML;

    document
        .getElementById("codeBack")
        .onclick = showHub;

    let currentCode = "";

    const display =
        document.getElementById("codeDisplay");

    const message =
        document.getElementById("codeMessage");

    document
        .querySelectorAll("[data-key]")
        .forEach(btn => {

            btn.onclick = () => {

                if(currentCode.length >= 8) return;

                currentCode += btn.dataset.key;

                updateDisplay();
            };

        });

    document
        .getElementById("clearCode")
        .onclick = () => {

            currentCode = "";
            updateDisplay();
        };

   document.getElementById("submitCode").onclick = () => {
        if (currentCode === "28012025") {
           
            if (!completed.code) {
                completed.code = true;
                addStar();
            }
          
            showStarModal("¡Código correcto! Esa fecha lo cambió todo. Segunda estrella obtenida ⭐", () => {
                showHub();
            });
        } else {

            document.getElementById("codeMessage").textContent = "Código incorrecto. ¡Piensa en una fecha clave!";
        }
    }; 
   
    function updateDisplay(){

        let txt = currentCode;

        if(txt.length > 2){

            txt =
            txt.slice(0,2)
            + " / "
            + txt.slice(2);
        }

        if(txt.length > 7){

            txt =
            txt.slice(0,7)
            + " / "
            + txt.slice(7);
        }

        display.textContent = txt;
    }
}function startHearts(){

    const template =
        document.getElementById("heartsTemplate");

    app.innerHTML =
        template.innerHTML;

    document
        .getElementById("heartsBack")
        .onclick = showHub;

    const area =
        document.getElementById("heartGameArea");

    const scoreText =
        document.getElementById("heartScore");

    const timerText =
        document.getElementById("heartTimer");

    let score = 0;
    let time = 30;

    const basket =
        document.createElement("div");

    basket.id = "basket";
    basket.innerHTML = "🧺";

    area.appendChild(basket);

    area.addEventListener("mousemove",(e)=>{

        const rect =
            area.getBoundingClientRect();

        basket.style.left =
            (e.clientX - rect.left - 40)
            + "px";
    });

    const spawn = setInterval(()=>{

        const heart =
            document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = "❤️";

        let x =
            Math.random()
            *
            (area.clientWidth - 50);

        let y = -20;

        heart.style.left = x + "px";
        heart.style.top = y + "px";

        area.appendChild(heart);

        const fall = setInterval(()=>{

            y += 5;

            heart.style.top =
                y + "px";

            const basketX =
                basket.offsetLeft;

            if(
                y > area.clientHeight - 120 &&
                Math.abs(x - basketX) < 60
            ){

                score++;

                scoreText.textContent =
                `${score} / 10 ❤️`;

                clearInterval(fall);
                heart.remove();

                if (score >= 10) {
                    clearInterval(spawn); 
                    clearInterval(timer);

                    if(!completed.hearts){
                        completed.hearts = true;
                        addStar();
                    }

    showStarModal("¡Atrapaste suficientes corazones! Tercera estrella obtenida ⭐", () => {
        showHub();
    });
}

            if(y > area.clientHeight){

                clearInterval(fall);
                heart.remove();
            }

        },20);

    },800);

    const timer = setInterval(()=>{

        time--;

        timerText.textContent =
            time + "s";

        if(time <= 0){

            clearInterval(timer);
            clearInterval(spawn);

        }

    },1000);
}function startStarGame(){

    const template =
        document.getElementById("starTemplate");

    app.innerHTML =
        template.innerHTML;

    document
        .getElementById("starBack")
        .onclick = showHub;

    const star =
        document.getElementById("bouncingStar");

    let y = 200;
    let velocity = 0;

    star.style.top =
        y + "px";

    document.addEventListener("click", () => {

    velocity = -7;

});

document.addEventListener("keydown", (e) => {

       if (e.code === "Space") {

        e.preventDefault();

        velocity = -7;
    }

});

    const physics = setInterval(()=>{

        velocity += 0.18;
        y += velocity;

        star.style.top =
            y + "px";

        if(y > 430){

            clearInterval(physics);
            clearInterval(countdown);

            alert("La estrella cayó.");
        }

    },20);

    let time = 20;

    const countdown = setInterval(()=>{

        time--;

        document
        .getElementById("starCountdown")
        .textContent = time;


            if (time <= 0) {
    clearInterval(physics);
    clearInterval(countdown);
    
    if (!completed.star) {
        completed.star = true;
        addStar();
  }
    showStarModal("¡Increíble balance! Mantuviste la estrella a salvo. Cuarta estrella obtenida ⭐", () => {
        showHub();
    });
}

    },1000);
}function startPuzzle(){

    const template =
        document.getElementById("puzzleTemplate");

    app.innerHTML =
        template.innerHTML;

    document
        .getElementById("puzzleBack")
        .onclick = showHub;

    const board =
        document.getElementById("puzzleBoard");

    const pieces = [];

    for(let i=0;i<9;i++){

        pieces.push(i);
    }

    pieces.sort(() =>
        Math.random() - 0.5);

    let selected = null;

    render();

    function render(){

        board.innerHTML = "";

        pieces.forEach((piece,index)=>{

            const div =
                document.createElement("div");

            div.className =
                "puzzle-piece";

            const row =
                Math.floor(piece/3);

            const col =
                piece%3;

            div.style.backgroundPosition =
                `${col*50}% ${row*50}%`;

            div.onclick = ()=>{

                if(selected === null){

                    selected = index;
                    div.style.outline =
                    "4px solid gold";

                    return;
                }

                [pieces[selected],pieces[index]]
                =
                [pieces[index],pieces[selected]];

                selected = null;

                render();

                checkVictory();
            };

            board.appendChild(div);

        });
    }

    function checkVictory(){

        let correct = true;

        for(let i=0;i<9;i++){

            if(pieces[i] !== i){

                correct = false;
                break;
            }
        }

console.log(pieces);

       if(correct){

    document
        .getElementById("puzzleMessage")
        .innerHTML =
        "⭐ Has recuperado todos los recuerdos.";

    if (!completed.puzzle) {
                completed.puzzle = true;
                addStar();
            }

            showStarModal("¡El rompecabezas está completo! Has conseguido la estrella ⭐", () => {
                showHub();
            });
        }
    } 
} 

function showFinal(){

    const template =
        document.getElementById("finalTemplate");

    app.innerHTML =
        template.innerHTML;

    const poemContainer =
        document.getElementById("poemContainer");

    const poem = `
Llegaste hasta aquí.

Y quizá eso sea lo que más quiero decirte.

Que aunque haya kilómetros entre nosotros,
nunca has estado lejos de mi corazón.

El camino hacia ti puede ser largo,
pero si al final del camino estás tú,
cada paso vale la pena.

Eres la persona más increíble que conozco,
y una de las razones por las que cada día
quiero ser un poquito mejor.

Me inspiras.
Me haces soñar.
Me haces creer en todo lo que todavía nos queda por vivir.

Y si alguna vez la distancia pesa,
recuerda esto:

yo sigo aquí.

Amándote desde lejos,
eligiéndote cada día,
esperando el momento en que ya no tengamos que despedirnos.

Porque no importa cuánto dure el camino.

Si me lleva hasta ti,
siempre habrá valido la pena.

Te amo.

Y volvería a elegirte
en cada versión de nuestra historia.
`;

    let index = 0;

    const writer = setInterval(()=>{

        poemContainer.textContent =
            poem.slice(0,index);

        index++;

    const modal = document.getElementById("starModal");
    const msg = document.getElementById("modalMessage");
    const btn = document.getElementById("modalCloseBtn");

    if (!modal) return;

    msg.innerHTML = textoMensaje;
    modal.classList.remove("hidden");

    const cerrar = () => {
        modal.classList.add("hidden");
        btn.removeEventListener("click", cerrar);
        if (alCerrar) alCerrar();
    };

    btn.addEventListener("click", cerrar);
}
