import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search term!' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchImages();
});

async function fetchImages() {
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found for your query.' });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    totalHits = data.totalHits;
    const loadedImages = document.querySelectorAll(
      '.gallery .photo-card'
    ).length;

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    if (currentPage > 1) {
      const { height: cardHeight } = document
        .querySelector('.gallery .photo-card')
        .getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({ message: 'Failed to fetch images.' });
  }
}
