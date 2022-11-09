import galleryItems from "./app.js";

const galRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const modalImgRef = document.querySelector(".lightbox__image");
const modalBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const modalOverlayRef = document.querySelector(".lightbox__overlay");

let index;

galleryItems.forEach((img) => {
  const galItemRef = document.createElement("li");
  galItemRef.classList.add("gallery__item");

  const galLinkRef = document.createElement("a");
  galLinkRef.href = img.preview;
  galLinkRef.classList.add("gallery__link");

  const galImgRef = document.createElement("img");
  galImgRef.src = img.preview;
  galImgRef.dataset.source = img.original;
  galImgRef.dataset.index = img.dataindex;
  galImgRef.alt = img.description;
  galImgRef.classList.add("gallery__image");

  galItemRef.append(galLinkRef);
  galLinkRef.append(galImgRef);
  galRef.append(galItemRef);
});

galRef.addEventListener("click", openZoomedImg);
modalBtnRef.addEventListener("click", closeZoomedImg);
modalOverlayRef.addEventListener("click", closeZoomedImg);

function openZoomedImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  modalRef.classList.add("is-open");
  modalImgRef.src = event.target.dataset.source;
  modalImgRef.dataset.index = event.target.dataset.index;
  modalImgRef.alt = event.target.alt;

  index = +event.target.dataset.index;

  window.addEventListener("keydown", closeOnEscape);
  window.addEventListener("keydown", swipeOnArrows);
}

function closeZoomedImg() {
  window.removeEventListener("keydown", closeOnEscape);
  window.removeEventListener("keydown", swipeOnArrows);

  modalRef.classList.remove("is-open");
  modalImgRef.src = "";
  modalImgRef.alt = "";
}

function closeOnEscape(event) {
  if (event.code === "Escape") {
    closeZoomedImg();
  }
}

function swipeOnArrows(event) {
  if (event.code === "ArrowRight" && index < galleryItems.length - 1) {
    index += 1;
    modalImgRef.src = galleryItems[index].original;
  } else if (event.code === "ArrowLeft" && index > 0) {
    index -= 1;
    modalImgRef.src = galleryItems[index].original;
  }
}
