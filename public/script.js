const potionsGrid = document.getElementById("potionsGrid");
const listStatus = document.getElementById("listStatus");
const music = document.getElementById("music");
const musicMute = document.getElementById("music-sound");

const API_URL = "http://127.0.0.1:8080/potions";

let musicPlaying = false;

async function getPotions() {
    listStatus.textContent = "Abrindo o livro de poções...";
    potionsGrid.innerHTML = "";

    try {
        const response = await fetch(API_URL,
            { method: "GET" }
        );

        if (!response.ok)
            throw new Error("Fetch error, status: " + response.status);

        const potions = await response.json();

        if (potions.length === 0) {
            listStatus.textContent = "Nenhuma poção cadastrada.";
            return;
        }

        listStatus.textContent = "";
        return potions;
    } catch (error) {
        console.error("Failed to get potions: " + error);
        listStatus.textContent = "Não foi possível carregar as poções cadastradas.";
    }
}

function createPotionCard(potion) {
    const potionCard = document.createElement("div");
    potionCard.className = "potion-card";

    const potionName = document.createElement("h2");
    potionName.className = "potion-name";
    potionName.textContent = potion.name;

    const potionDesc = document.createElement("p");
    potionDesc.className = "potion-desc";
    potionDesc.textContent = potion.description;

    const potionImg = document.createElement("img");
    potionImg.className = "potion-img";
    potionImg.src = potion.photo;
    potionImg.alt = potion.name;

    const potionPrice = document.createElement("span");
    potionPrice.className = "potion-price";
    potionPrice.textContent = "R$ " + (potion.price).toFixed(2);

    const potionBtn = document.createElement("button");
    potionBtn.className = "potion-btn";
    potionBtn.type = "button";
    potionBtn.textContent = "Comprar";

    potionCard.append(potionName, potionDesc, potionPrice, potionImg, potionBtn);

    return potionCard;
}

(async () => {
    try {
        const potions = await getPotions();

        potions.forEach((potion) => {
            const card = createPotionCard(potion);

            potionsGrid.append(card);
        });

    } catch (error) {
        console.error("Process of creating elements failed.");
    }

})();

musicMute.addEventListener("click", () => {
    music.volume = 0.05;

    if (musicPlaying) {
        musicMute.innerText = "🔇";
        music.pause();
        musicPlaying = false;
    }
    else {
        musicMute.innerText = "🔊";
        music.play();
        musicPlaying = true;
    }
});