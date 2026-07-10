// ====================================
// BOLÃO DO MALACUBACO
// SCRIPT.JS
// PARTE 1
// ====================================

const cards = document.querySelectorAll(".player-card");

const gold = document.querySelector("#gold");
const silver = document.querySelector("#silver");
const bronze = document.querySelector("#bronze");

const copyButton = document.querySelector("#copyButton");
const resetButton = document.querySelector("#resetButton");

const shareCard = document.querySelector("#shareCard");

const shareName = document.querySelector("#shareName");

const shareGoldImg = document.querySelector("#shareGoldImg");
const shareGoldPlayer = document.querySelector("#shareGoldPlayer");
const shareGoldCountry = document.querySelector("#shareGoldCountry");

const shareSilverImg = document.querySelector("#shareSilverImg");
const shareSilverPlayer = document.querySelector("#shareSilverPlayer");
const shareSilverCountry = document.querySelector("#shareSilverCountry");

const shareBronzeImg = document.querySelector("#shareBronzeImg");
const shareBronzePlayer = document.querySelector("#shareBronzePlayer");
const shareBronzeCountry = document.querySelector("#shareBronzeCountry");

const playerName = document.querySelector("#playerName");

let podium = [];

cards.forEach(card => {

    card.addEventListener("click", selecionar);

});

function selecionar(e){

    const card = e.currentTarget;

    const country = card.dataset.country;

    const player = card.dataset.player;

    const photo = card.querySelector(".player-photo").src;

    const flag = card.querySelector(".flag").src;

    const indice = podium.findIndex(p => p.country === country);

    // Remove do pódio
    if(indice !== -1){

        podium.splice(indice,1);

        atualizar();

        return;

    }

    // Limite de 3 jogadores
    if(podium.length === 3){

        return;

    }

    podium.push({

        country,
        player,
        photo,
        flag

    });

    card.classList.add("selected");

    atualizar();

    if(podium.length === 3){

        confetti({

            particleCount:180,
            spread:90,
            origin:{y:.65}

        });

    }

}

function atualizar(){

    cards.forEach(card=>{

        card.classList.remove("selected");

    });

    podium.forEach(item=>{

        const c = document.querySelector(
            `[data-country="${item.country}"]`
        );

        if(c){

            c.classList.add("selected");

        }

    });

    atualizarCard(
        gold,
        podium[0],
        "🥇",
        "Campeão"
    );

    atualizarCard(
        silver,
        podium[1],
        "🥈",
        "Vice"
    );

    atualizarCard(
        bronze,
        podium[2],
        "🥉",
        "Terceiro"
    );

}

// ====================================
// PARTE 2
// ====================================

function atualizarCard(container,dados,medalha,titulo){

    if(!dados){

        container.innerHTML=`

            <div class="medal">

                ${medalha}

            </div>

            <div class="podium-image vazio"></div>

            <div class="podium-country">

                ${titulo}

            </div>

        `;

        return;

    }

    container.innerHTML=`

        <div class="medal">

            ${medalha}

        </div>

        <div class="podium-image fade-in">

            <img
                src="${dados.photo}"
                alt="${dados.player}">

        </div>

        <div class="podium-country">

            <img
                class="podium-flag"
                src="${dados.flag}"
                alt="${dados.country}">

            <strong>

                ${dados.player}

            </strong>

            <br>

            <span>

                ${dados.country}

            </span>

        </div>

    `;

}

copyButton.addEventListener("click",async()=>{

    if(podium.length<3){

        alert("Complete o pódio antes de compartilhar.");

        return;

    }

    shareName.textContent=

        "Palpite de "+

        (playerName.value.trim()||"Sem nome");

    // Campeão

    shareGoldImg.src=podium[0].photo;
    shareGoldPlayer.textContent=podium[0].player;
    shareGoldCountry.textContent=podium[0].country;

    // Vice

    shareSilverImg.src=podium[1].photo;
    shareSilverPlayer.textContent=podium[1].player;
    shareSilverCountry.textContent=podium[1].country;

    // Terceiro

    shareBronzeImg.src=podium[2].photo;
    shareBronzePlayer.textContent=podium[2].player;
    shareBronzeCountry.textContent=podium[2].country;

    shareCard.style.left="0";

    const canvas=await html2canvas(shareCard,{

        scale:3,

        backgroundColor:null,

        useCORS:true

    });

    shareCard.style.left="-99999px";

    const link=document.createElement("a");

    const nome=

        playerName.value.trim()||

        "Palpite";

    link.download=`${nome}.png`;

    link.href=canvas.toDataURL("image/png");

    link.click();

});

// ====================================
// PARTE 3
// ====================================

// Reiniciar

resetButton.addEventListener("click",()=>{

    podium=[];

    cards.forEach(card=>{

        card.classList.remove("selected");

    });

    atualizar();

});


// Inicializa o pódio vazio

atualizar();


// ======================
// MODAL DE REGRAS
// ======================

const rulesButton=document.querySelector("#rulesButton");
const rulesModal=document.querySelector("#rulesModal");
const closeRules=document.querySelector("#closeRules");

if(rulesButton){

    rulesButton.addEventListener("click",()=>{

        rulesModal.style.display="flex";

    });

}

if(closeRules){

    closeRules.addEventListener("click",()=>{

        rulesModal.style.display="none";

    });

}

if(rulesModal){

    rulesModal.addEventListener("click",(e)=>{

        if(e.target===rulesModal){

            rulesModal.style.display="none";

        }

    });

}


// ======================
// ANIMAÇÃO DE ENTRADA
// ======================

cards.forEach(card=>{

    card.addEventListener("mousedown",()=>{

        card.style.transform="scale(.96)";

    });

    card.addEventListener("mouseup",()=>{

        card.style.transform="";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


// ======================
// GLOW DO CAMPEÃO
// ======================

const observer=new MutationObserver(()=>{

    const img=gold.querySelector("img");

    if(img){

        gold.classList.add("champion");

    }else{

        gold.classList.remove("champion");

    }

});

observer.observe(gold,{

    childList:true,

    subtree:true

});