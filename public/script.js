const potionsGrid = document.getElementById("potionsGrid");

async function getPotions() {
    try {
        const response = await fetch("http://127.0.0.1:8080/potions",
            {
                method: "GET"
            });

        if (!response.ok)
            throw new Error("Fetch error, status: " + response.status);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to get potions: " + error);
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

    const potionPrice = document.createElement("span");
    potionPrice.className = "potion-price";
    potionPrice.textContent = "R$ " + (potion.price).toFixed(2);

    potionCard.append(potionName, potionDesc, potionPrice, potionImg);

    return potionCard;
}

(async () => {
    try {
        const potions = await getPotions();
        console.log(potions);

        potions.forEach((potion) => {
            const card = createPotionCard(potion);

            potionsGrid.append(card);
        });

    } catch (error) {
        console.log("Process of creating elements failed.");
    }

})();