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

// 버튼을 클릭할때마다 데이터가 업데이트가 되어버림 => 해결방안 강구
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    // object는 배열처럼 key를 이용하여 데이터에 접근할 수 있다.
    displayItems(items.filters((item) => item[key] == value));
}

function onButtonClick2(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    updateItems(items, key, value);
}

function updateItems(items, key, value) {
    items.forEach((item) => {
        if (item.dataset[key] === value) {
            item.classList.remove("invisible");
        } else {
            item.classList.add("invisible");
        }
    });
}

function setEventListners(items) {
    // 하나하나의 이벤트 리스너를 반복해서 등록하는것 보단 컨테이너에 이벤트 리스너를 등록해서 한곳에서만 핸들링 할 수 있도록 한다.
    const logo = document.querySelector(".logo");
    const buttons = document.querySelector(".buttons");

    logo.addEventListener("click", () => displayItems(items));
    buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
    .then((items) => {
        displayItems(items);
        setEventListners(items);
    })
    .catch(console.log);
