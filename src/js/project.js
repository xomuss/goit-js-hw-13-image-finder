import ApiService from './apiService';
import cardsTpl from '../templates/cardsTpl.hbs';

const refs = {
  form: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.js-container'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

console.log(refs.galleryContainer);

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearContainer();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchArticles().then(appendHitsMarkup);
}

function onLoadMore() {
  apiService.fetchArticles().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', cardsTpl(hits));
}

function clearContainer() {
  refs.galleryContainer.innerHTML = '';
}
