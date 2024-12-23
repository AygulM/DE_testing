class Menu {
  constructor(menuBtnSelector, menuSelector) {
    this.menuBtn = document.querySelector(menuBtnSelector);
    this.menu = document.querySelector(menuSelector);
    this.menuItems = document.querySelectorAll(".menu__item");

    this.menuClick = this.menuClick.bind(this);
    this.init();
  }

  init() {
    this.menuBtn.addEventListener("click", this.menuClick);
    this.menuItems.forEach((item) => {
      item.addEventListener("click", this.menuClick);
    });
  }

  menuClick() {
    this.menuBtn.classList.toggle("active");
    this.menu.classList.toggle("active");
  }
}

const menu = new Menu(".menu__btn", ".menu");
