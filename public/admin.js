const API_URL = "http://127.0.0.1:8080/potions";

const potionForm = document.getElementById("potionForm");
const formError = document.getElementById("formError");
const potionList = document.getElementById("potionList");
const listStatus = document.getElementById("listStatus");

function formatPrice(value) {
    return "R$ " + Number(value).toFixed(2);
}

function createPotionRow(potion) {
    const potionRow = document.createElement("div");
    potionRow.className = "potion-row";

    const potionImg = document.createElement("img");
    potionImg.src = potion.photo || "";
    potionImg.alt = potion.name;

    const potionInfo = document.createElement("div");
    potionInfo.className = "potion-row-info";

    const potionName = document.createElement("div");
    potionName.className = "potion-row-name";
    potionName.textContent = potion.name;

    const potionDesc = document.createElement("div");
    potionDesc.className = "potion-row-desc";
    potionDesc.textContent = potion.description;

    potionInfo.append(potionName, potionDesc);

    const potionPrice = document.createElement("span");
    potionPrice.className = "potion-row-price";
    potionPrice.textContent = formatPrice(potion.price);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "potion-row-delete";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Remover";
    deleteBtn.onclick = () => deletePotion(potion.id, potionRow);

    potionRow.append(potionImg, potionInfo, potionPrice, deleteBtn);

    return potionRow;
}

async function loadPotions() {
    listStatus.textContent = "Abrindo o livro de poções...";
    potionList.innerHTML = "";

    try {
        const response = await fetch(API_URL,
            { method: "GET" }
        );

        if (!response.ok)
            throw new Error("Fetch error, status: " + response.status);

        const potions = await response.json();

        if (potions.length === 0) {
            listStatus.textContent = "Nenhuma poção cadastrada ainda.";
            return;
        }

        listStatus.textContent = "";
        potions.forEach((potion) => potionList.append(createPotionRow(potion)));
    } catch (error) {
        console.error("Failed to get potions: " + error);
        listStatus.textContent = "Não foi possível carregar as poções cadastradas.";
    }
};

async function createPotion(potionData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(potionData)
    });

    if (!response.ok)
        throw new Error("Create error, status: " + response.status);

    return response.json();
}

async function deletePotion(id, row) {
    const confirmed = confirm("Remover esta poção do catálogo?");
    if (!confirmed)
        return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok)
            throw new Error("Delete error, status: " + response.status);

        row.remove();

        if (potionList.children.length === 0)
            listStatus.textContent = "Nenhuma poção cadastrada ainda.";
    } catch (error) {
        console.error("Failed to delete potion: " + error);
        alert("Não foi possível remover a poção. Tente novamente.");
        loadPotions();
    }
}

potionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formError.textContent = "";

    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const photo = document.getElementById("photo").value.trim();
    const price = parseFloat(document.getElementById("price").value);

    if (!name || !description || isNaN(price)) {
        formError.textContent = "Preencha nome, descrição e preço corretamente.";
        return;
    }

    try {
        await createPotion({ name, description, photo, price });
        potionForm.reset();
        loadPotions();
        alert("Poção criada com sucesso!");
    } catch (error) {
        console.error("Failed to create potion: " + error);
        formError.textContent = "Não foi possível cadastrar a poção. Tente novamente.";
    }
});

loadPotions();