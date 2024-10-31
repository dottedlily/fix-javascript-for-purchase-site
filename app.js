const addItemBtn = document.getElementById('add-item-btn');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const unpurchasedFilterBtn = document.getElementById('filter-unpurchased');
const purchasedFilterBtn = document.getElementById('filter-purchased');
const items = [];

function displayItems(listToDisplay) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    for (let i = 0; i < listToDisplay.length; i++) {
        const li = document.createElement('li');
        li.textContent = listToDisplay[i].name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', function() {
            itemList.removeChild(li)
        });

        const purchaseBtn = document.createElement('button');
        purchaseBtn.textContent = 'Purchase';

        purchaseBtn.addEventListener('click', function() {
            const itemName = li.textContent.trim();
            const actualitemName = itemName.replace("Delete", "").replace("Purchase", "").trim()

            console.log(actualitemName);
            const index = items.findIndex(item => item.name === actualitemName);
            items[index].purchased = true;
            displayItems(items);
        });

        const unpurchaseBtn = document.createElement('button');
        unpurchaseBtn.textContent = 'Unpurchase';

        unpurchaseBtn.addEventListener('click', function() {
            const itemName = li.textContent.trim();
            const actualitemName = itemName.replace("Delete", "").replace("Unpurchase", "").trim()
            console.log(actualitemName);
            const index = items.findIndex(item => item.name === actualitemName);
            items[index].purchased = false;
            displayItems(items);
        });

        li.appendChild(deleteBtn);

        if (listToDisplay[i].purchased) {
            li.appendChild(unpurchaseBtn);
        } else {
            li.appendChild(purchaseBtn);
        }

        itemList.appendChild(li);

    }

}
// Elnura Orozmamatova
unpurchasedFilterBtn.addEventListener('click', function() {
    const unpurchasedItems = [];

    for (let i = 0; i < items.length; i++) {
        if (!items[i].purchased) {
            unpurchasedItems.push(items[i]);
        }
    }
    displayItems(unpurchasedItems);

});

purchasedFilterBtn.addEventListener('click', function() {
    const purchasedItems = [];

    for (let i = 0; i < items.length; i++) {
        if (items[i].purchased) {
            purchasedItems.push(items[i]);
        }
    }
    displayItems(purchasedItems);
});


addItemBtn.addEventListener('click', function() {
    const itemName = itemInput.value.trim(); // Получаем текст из input

    if (itemName !== "") {
        const newItem = {
            name: itemName,
            purchased: false
        };

        items.push(newItem);
        displayItems(items);
        itemInput.value = "";
    } else {
        alert("Please enter an item name.");
    }
});