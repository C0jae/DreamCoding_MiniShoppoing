// Fetch the items from the JSON file
function loadItems() {
    return fetch("data/data.json")
        .then((response) => response.json())
        .then((json) => json.items);
}

function displayItems(items) {
    // items라는 이름의 클래스를 가진 단위를 container라는 변수에 정의
    const container = document.querySelector(".items");

    // 각각의 아이템 데이터를 li요소로 변환
    container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// main
loadItems()
    .then((items) => {
        displayItems(items);
        //setEventListners(items);
    })
    .catch(console.log);
