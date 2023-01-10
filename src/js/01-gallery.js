// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';
// Change code below this line

// ! 1 - Creation and rendering markup

// * get gallery container
const galleryEl = document.querySelector('.gallery');

// * Function - create gallery item
function createGalleryItem(item) {
  const { preview, original, description } = item;
  let itemToInsert = `
      <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
        title = "${description}"
      />
    </a>
  `;

  return itemToInsert;
}

// * Container for all elements
const imagesWrapper = galleryItems.map(createGalleryItem).join('');

galleryEl.insertAdjacentHTML('afterbegin', imagesWrapper);

// ! 2 - Prevent default behavior for the link element, SimpleLightbox

// * use SimpleLightbox library
let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionDelay: 300,
});

// * Prevent default behavior for the links <a>
const links = document.querySelectorAll('.gallery__link');
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
  });
});
