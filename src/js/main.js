import SlimSelect from 'slim-select';
import 'slim-select/styles';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectLoaderEl = document.querySelector('.select-block .loader');
const infoLoaderEl = document.querySelector('.info-block .loader');
const infoContainer = document.querySelector('.info-container');
const selectEl = document.querySelector('#select');
const catsBreeds = [];

selectLoaderEl.style.display = 'block';
infoLoaderEl.style.display = 'none';
selectEl.classList.add('hidden');

fetchBreeds()
  .then(breeds => {
    onFetchBreeds(breeds);
  })
  .catch(error => {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
    selectLoaderEl.style.display = 'none';
  });

function onFetchBreeds(breeds) {
  selectLoaderEl.style.display = 'none';
  selectEl.classList.remove('hidden');

  catsBreeds.push(...breeds);

  const options = catsBreeds.map(breed => ({
    text: breed.name,
    value: breed.id,
  }));

  new SlimSelect({
    select: '#select',
    data: options,
    events: {
      afterChange: onChange,
    },
  });
}

function onChange(option) {
  const cat = catsBreeds.find(breed => breed.id === option[0].value);
  infoLoaderEl.style.display = 'block';
  infoContainer.innerHTML = '';

  fetchCatByBreed(cat.id)
    .then(image => {
      const catInfoEl = composeCatInfoEl(cat, image[0]);
      infoContainer.innerHTML = catInfoEl;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
      });
    })
    .finally(() => {
      infoLoaderEl.style.display = 'none';
    });
}

function composeCatInfoEl(cat, image) {
  return `
    <div class="cat-info-wrapper">
      <img class="cat-info-img" src="${image.url}" alt="${cat.name}">
      <div class="cat-info-details">
        <h3 class="cat-info-title">${cat.name}</h3>
        <p class="cat-info-text">${cat.description}</p>
        <p class="cat-info-text"><strong>Temperament:</strong> ${cat.temperament}</p>
      </div>
    </div>
  `;
}
