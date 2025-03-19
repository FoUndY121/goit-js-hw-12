import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

/**
 * @param {Array} images
 * @returns {string}
 */
export function createMarkup(images) {
  return images
    .map(
      ({
         webformatURL,
         largeImageURL,
         tags,
         likes,
         views,
         comments,
         downloads,
       }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="thumb-block">
          <div class="block"><h2 class="title">Likes</h2><p class="amount">${likes}</p></div>
          <div class="block"><h2 class="title">Views</h2><p class="amount">${views}</p></div>
          <div class="block"><h2 class="title">Comments</h2><p class="amount">${comments}</p></div>
          <div class="block"><h2 class="title">Downloads</h2><p class="amount">${downloads}</p></div>
        </div>
      </li>`
    )
    .join('');
}


export function clearGallery() {
  gallery.innerHTML = '';
}

/**
 * @param {Array} images
 * @param {boolean} isNewSearch
 */
export function renderGallery(images, isNewSearch = false) {
  if (isNewSearch) {
    clearGallery();
  }
  gallery.insertAdjacentHTML('beforeend', createMarkup(images));
  refreshLightbox();
}


export function refreshLightbox() {
  lightbox.refresh();
}


export function scrollToNewImages() {
  const lastItem = gallery.lastElementChild;
  if (lastItem) {
    lastItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}