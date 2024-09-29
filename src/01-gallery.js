import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('#form');
const input = document.querySelector('#form-input');
const loader = document.querySelector('#loader');
const gallery = document.querySelector('#gallery');
const moreBtn = document.querySelector('#more');

let scrollBy = 0;
let searchString = '';
let pageIndex = 0;
const per_page = 15;
const APIURL = `https://pixabay.com/api/`;

const element = (tag, props) =>
  Object.assign(document.createElement(tag), props);

const createGalEl = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  const elemLink = element('a', {
    className: 'lightbox-link',
    href: largeImageURL,
  });
  const galEl = element('li', { className: 'result' });

  const img = element('img', {
    className: 'result-pic',
    src: webformatURL,
    alt: tags,
  });

  const description = element('div', { className: 'result-desc' });

  const likesEl = element('div', { className: 'desc-el' });
  const likesHead = element('p', {
    className: 'desc-header',
    textContent: 'Likes',
  });
  const likesVal = element('p', {
    className: 'desc-value',
    textContent: likes,
  });

  likesEl.append(likesHead, likesVal);

  const viewsEl = element('div', { className: 'desc-el' });
  const viewsHead = element('p', {
    className: 'desc-header',
    textContent: 'Views',
  });
  const viewsVal = element('p', {
    className: 'desc-value',
    textContent: views,
  });

  viewsEl.append(viewsHead, viewsVal);

  const comEl = element('div', { className: 'desc-el' });
  const comHead = element('p', {
    className: 'desc-header',
    textContent: 'Comments',
  });
  const comVal = element('p', {
    className: 'desc-value',
    textContent: comments.toString(),
  });

  comEl.append(comHead, comVal);

  const downloadEl = element('div', { className: 'desc-el' });
  const downloadHead = element('p', {
    className: 'desc-header',
    textContent: 'Downloads',
  });
  const downloadVal = element('p', {
    className: 'desc-value',
    textContent: downloads,
  });

  downloadEl.append(downloadHead, downloadVal);

  description.append(likesEl, viewsEl, comEl, downloadEl);

  elemLink.append(img);
  galEl.append(elemLink, description);

  return galEl;
};

const renderElements = (images, rootList) => {
  const fragment = document.createDocumentFragment();
  fragment.append(...images.map(createGalEl));

  rootList.append(fragment);
};

let lightbox = new SimpleLightbox('#gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 250,
  fadeSpeed: 250,
  scrollZoom: false,
});

const getPics = async () => {
  try {
    pageIndex++;
    const params = new URLSearchParams({
      key: '35169635-92091552d9eccdba3eb57d7a9',
      q: searchString,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: pageIndex,
      per_page: per_page,
    });
    return (await axios.get(`${APIURL}?${params}`)).data.hits;
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'Oh no! There is an error: ' + error,
    });
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  searchString = input.value.trim();
  gallery.innerHTML = '';
  pageIndex = 0;
  scrollBy = 0;
  moreBtn.classList.add('visibility');
  if (searchString !== '') {
    loader.classList.remove('visibility');
    getPics().then(hits => {
      loader.classList.add('visibility');
      input.value = '';
      renderElements(hits, gallery);
      lightbox.refresh();
      if (hits.length >= per_page) {
        moreBtn.classList.remove('visibility');
      } else {
        if (gallery.childElementCount > 0)
          iziToast.info({
            message:
              "We're sorry, but you've reached the end of search results.",
          });
      }
      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      scrollBy =
        2 * document.querySelector('.result').getBoundingClientRect().height;
    });
  } else {
    iziToast.info({
      message: 'Type correct search params!',
    });
  }
});

moreBtn.addEventListener('click', () => {
  loader.classList.remove('visibility');

  getPics()
    .then(hits => {
      renderElements(hits, gallery);
      loader.classList.add('visibility');
      lightbox.refresh();
      window.scrollBy({ top: scrollBy, behavior: 'smooth' });
      if (hits.length < per_page) {
        moreBtn.classList.add('visibility');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    })
    .then(window.scrollBy({ top: scrollBy, behavior: 'smooth' }));
});
