const breedInput = document.getElementById('breedInput');
const autocomplete = document.getElementById('autocomplete');
const showImagesBtn = document.getElementById('showImagesBtn');
const imageContainer = document.getElementById('imageContainer');
let breedsList = [];
let intervalId;

fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    breedsList = Object.keys(data.message);
  });


breedInput.addEventListener('input', () => {
  const inputText = breedInput.value.toLowerCase();
  const matchedBreeds = breedsList.filter(breed => breed.toLowerCase().startsWith(inputText));
  autocomplete.innerHTML = '';
  matchedBreeds.slice(0, 5).forEach(breed => {
    const suggestion = document.createElement('div');
    suggestion.textContent = breed;
    suggestion.classList.add('suggestion');
    suggestion.addEventListener('click', () => {
      breedInput.value = breed;
      autocomplete.innerHTML = '';
    });
    autocomplete.appendChild(suggestion);
  });
});


function fetchAndDisplayImages(selectedBreed) {
  imageContainer.innerHTML = '';
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/1`)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.message;
      const img = document.createElement('img');
      img.src = imageUrl;
      imageContainer.appendChild(img);
    })
    .catch(error => {
      console.error('Error fetching image:', error);
      imageContainer.innerHTML = '<p>Error fetching image</p>';
    });
}

showImagesBtn.addEventListener('click', () => {
  const selectedBreed = breedInput.value.toLowerCase();
  clearInterval(intervalId);
  if (breedsList.includes(selectedBreed)) {
    fetchAndDisplayImages(selectedBreed);
    intervalId = setInterval(() => {
      fetchAndDisplayImages(selectedBreed);
    }, 5000);
  } else {
    imageContainer.innerHTML = '<p>No such breed</p>';
  }
});