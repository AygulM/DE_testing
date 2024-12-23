class FormValidator {
  constructor(form) {
    this.form = document.querySelector(form);
    this.nameInput = this.form.querySelector("#name");
    this.emailInput = this.form.querySelector("#email");
    this.messageInput = this.form.querySelector("#message");

    this.submitButton = this.form.querySelector(".submit__btn");

    this.validateForm();
  }
  validateForm() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.clearError();

      const isNameValid = this.validateName();
      const isEmailValid = this.validateEmail();
      const isMessageValid = this.validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        this.submitForm();
      } else {
        console.warn("Form submitted NOOOOOOOO successfully!");
      }
    });
  }

  validateName() {
    let valid = true;
    const valueName = this.nameInput.value.trim();
    if (valueName.length < 4) {
      this.showError(this.nameInput, "Name must be at least 4 characters long");
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }
  validateEmail() {
    let valid = true;

    const valueEmail = this.emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(valueEmail)) {
      this.showError(this.emailInput, "email is not correct");
      valid = false;
    } else {
      valid = true;
    }

    return valid;
  }
  validateMessage() {
    let valid = true;

    const valueMess = this.messageInput.value.trim();
    if (valueMess.length < 10) {
      this.showError(this.messageInput, "Minimum 10 symbols");
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }

  showError(input, message) {
    input.classList.add("error");
    let errorMessage = input.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains("error__message")) {
      errorMessage = document.createElement("span");
      errorMessage.className = "error__message";
      input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    errorMessage.innerText = message;
  }

  clearError() {
    const errorSpan = this.form.querySelectorAll(".error__message");
    if (errorSpan) {
      errorSpan.forEach((e) => e.remove());
    }
  }

  submitForm() {
    this.form.reset();

    const formData = {
      name: name,
      email: email,
      message: message,
    };
    localStorage.setItem("formData", JSON.stringify(formData));

    this.openPopup();
  }

  openPopup() {
    const popup = document.getElementById("popup");

    popup.classList.add("show__popup");
    popup.textContent = "Your message successfully sent";

    setTimeout(function () {
      popup.classList.remove("show__popup");
    }, 5000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FormValidator("#contactForm");
});

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

class Modal {
  constructor(modalElement) {
    this.modalElement = modalElement;
    this.closeButton = modalElement.querySelector("[data-close]");
    this.modalContainer = modalElement.parentElement;
    this.isOpen = false;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.closeButton.addEventListener("click", this.closeModal.bind(this));
    this.modalContainer.addEventListener(
      "click",
      this.onContainerClick.bind(this)
    );
    this.modalElement.addEventListener("click", this.onModalClick.bind(this));

    this.closeButton.addEventListener(
      "click",
      this.onCloseButtonClick.bind(this)
    );
  }

  openModal() {
    // this.modalContainer.style.display = "block";
    this.modalContainer.classList.add("opened");
    document.body.classList.add("open__modal");
    this.isOpen = true;
    this.modalElement.focus();
  }

  closeModal() {
    // this.modalContainer.style.display = "none";
    this.modalContainer.classList.remove("opened");
    document.body.classList.remove("open__modal");
    this.isOpen = false;
  }

  onContainerClick(event) {
    if (event.target === this.modalContainer) {
      this.closeModal();
    }
  }

  onModalClick(event) {
    event.stopPropagation();
  }

  onCloseButtonClick() {
    this.closeModal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modalElement = document.querySelector(".modal");
  const modalInstance = new Modal(modalElement);

  const openModalButton = document.querySelector(".btn__open");
  openModalButton.addEventListener("click", () => {
    modalInstance.openModal();
  });
});
