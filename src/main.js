import iziToast from 'izitoast';
import { createMarkup, refreshLightbox, scrollToNewImages } from './js/render-functions';
import { getPictures } from './js/pixabay-api';
import { randomizeGalleryItems } from './js/gallery-randomizer';

const formSearch = document.querySelector('.form');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn2');

let page = 1;
let query = '';
const perPage = 15;

loader.style.display = 'none';
btnLoadMore.classList.add('is-hidden');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function onSearch(event) {
  event.preventDefault();
  listImages.innerHTML = '';
  showLoader();
  btnLoadMore.classList.add('is-hidden');

  query = event.target.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Input cannot be empty!',
      color: '#ff0000',
    });
    hideLoader();
    return;
  }

  try {
    const data = await getPictures(query, page);
    hideLoader();

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    listImages.innerHTML = createMarkup(data.hits);
    randomizeGalleryItems();
    refreshLightbox();

    if (data.totalHits > page * perPage) {
      btnLoadMore.classList.remove('is-hidden');
    }

    formSearch.reset();
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message });
  }
}

async function onLoadMore() {
  showLoader();
  page++;

  try {
    const data = await getPictures(query, page);
    hideLoader();

    if (!data.hits.length || data.hits.length < perPage) {
      btnLoadMore.classList.add('is-hidden');
      btnLoadMore.removeEventListener('click', onLoadMore);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    listImages.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    randomizeGalleryItems();
    refreshLightbox();
    scrollToNewImages(); // Прокрутка к загруженным изображениям
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message });
  }
}

formSearch.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);