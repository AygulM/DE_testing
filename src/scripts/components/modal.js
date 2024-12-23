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
