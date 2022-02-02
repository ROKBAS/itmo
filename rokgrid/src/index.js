const $header = document.querySelector("header");

const $actionsArr = document.querySelectorAll(".header .tab");
const $home = document.querySelector(".home-tab");
const $saved = document.querySelector(".saved-tab");

const $burger = document.querySelector(".burger");
const $menu = document.querySelector(".header-menu");

const remmoveActiveAll = () => {
    $actionsArr.forEach((item) => item.classList.remove("active"));
    $home.classList.add("hide");
    $saved.classList.add("hide");
};

const switchTab = (tabIndex = 0) => {
    remmoveActiveAll();
    $menu.classList.remove("show");
    $header.classList.remove("active");
    switch (tabIndex) {
        case 0:
            $header.classList.remove("header-saved");
            $actionsArr[tabIndex].classList.add("active");
            $home.classList.remove("hide");
            return;
        case 1:
            $actionsArr[tabIndex].classList.add("active");
            $header.classList.add("header-saved");
            $saved.classList.remove("hide");
            return;
        default:
            return;
    }
};

$actionsArr.forEach((item) => {
    console.log(item);
    item.addEventListener("click", (e) => {
        const idx = e.target.dataset.idx;
        switchTab(+idx);
    });
});

$burger.addEventListener("click", () => {
    if ($menu.classList.contains("show")) {
        $header.classList.remove("active");
        $menu.classList.remove("show");
        return;
    }
    $header.classList.add("active");
    $menu.classList.add("show");
});

switchTab();
