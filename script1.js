const breedInput = document.getElementById('breedInput');
const autocomplete = document.getElementById('autocomplete');
const showImagesBtn = document.getElementById('showImagesBtn');
const imageContainer = document.getElementById('imageContainer');

let breedsList = [];

// Fetch dog breeds list from Dog CEO API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(response => response.json())
  .then(data => {
    breedsList = Object.keys(data.message);
  });

// Autocomplete function
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

// Show Images button click event
showImagesBtn.addEventListener('click', () => {
  const selectedBreed = breedInput.value.toLowerCase();
  if (breedsList.includes(selectedBreed)) {
    imageContainer.innerHTML = '';
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/2`)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          imageContainer.appendChild(img);
        });
      });
  } else {
    imageContainer.innerHTML = '<p>No such breed found</p>';
  }
});