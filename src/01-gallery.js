import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#form');
const input = document.querySelector('#form-input');
const loader = document.querySelector('#loader');
const gallery = document.querySelector('#gallery');

let searchString = '';
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

form.addEventListener('submit', e => {
  e.preventDefault();
  gallery.innerHTML = '';
  if (gallery.innerHTML !== '') {
    simpleLightbox.refresh();
  }
  searchString = input.value;
  const params = new URLSearchParams({
    key: '35169635-92091552d9eccdba3eb57d7a9',
    q: searchString,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  if (searchString !== '') {
    loader.classList.remove('visibility');
    fetch(APIURL + '?' + params)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status, response.statusText);
        }
        loader.classList.add('visibility');
        return response.json();
      })
      .then(response => {
        if (response.hits.length === 0) {
          iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        }
        const hits = response.hits;
        input.value = '';
        return hits;
      })
      .then(hits => {
        renderElements(hits, gallery);
        const elemLink = document.querySelectorAll('a.lightbox-link');
        const lightbox = new SimpleLightbox(elemLink, {
          captionsData: 'alt',
          captionDelay: 250,
          animationSpeed: 250,
          fadeSpeed: 250,
          scrollZoom: false,
        });
      })
      .catch(error => console.log(error));
  } else {
    iziToast.info({
      message: 'Type search params!',
    });
  }
});
