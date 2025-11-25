const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const difficultySelect = document.getElementById('difficulty-select');
const setInfo = document.getElementById('set-info');
const pics = [
  document.getElementById('pic1'),
  document.getElementById('pic2'),
  document.getElementById('pic3'),
  document.getElementById('pic4')
];

const sets = {
  easy: [
    { pics: ['Red fruit', 'Apple logo', 'Apple tree', 'Apple pie'], word: 'Apple' },
    { pics: ['Bright star', 'Beach', 'Flower', 'Clock'], word: 'Sun' },
    { pics: ['Ocean', 'Water', 'Drink', 'Swim'], word: 'Blue' },
    { pics: ['Pet', 'Bark', 'Tail', 'Bone'], word: 'Dog' },
    { pics: ['Fly', 'Wings', 'Beak', 'Feathers'], word: 'Bird' },
    { pics: ['Read', 'Pages', 'Story', 'Library'], word: 'Book' }
  ],

  medium: [
    { pics: ['Large animal', 'Trunk', 'Tusks', 'Gray skin'], word: 'Elephant' },
    { pics: ['String instrument', 'Music', 'Rock band', 'Acoustic'], word: 'Guitar' },
    { pics: ['Tall building', 'City', 'Elevator', 'Windows'], word: 'Skyscraper' },
    { pics: ['Cold', 'Snow', 'Ice', 'Winter'], word: 'Freezer' },
    { pics: ['Ride', 'Wheels', 'Engine', 'Road'], word: 'Car' },
    { pics: ['Cook', 'Heat', 'Food', 'Kitchen'], word: 'Oven' }
  ],

  hard: [
    { pics: ['Physics', 'Atom', 'Wave', 'Uncertainty'], word: 'Quantum' },
    { pics: ['Unexpected discovery', 'Luck', 'Adventure', 'Coincidence'], word: 'Serendipity' },
    { pics: ['Ancient', 'Stone', 'Pyramid', 'Egypt'], word: 'Pharaoh' },
    { pics: ['Mind', 'Think', 'Brain', 'Psychology'], word: 'Cognition' },
    { pics: ['Space', 'Stars', 'Galaxy', 'Universe'], word: 'Cosmos' },
    { pics: ['Art', 'Paint', 'Canvas', 'Brush'], word: 'Masterpiece' }
  ]
};

let currentDifficulty = 'easy';
let currentSetIndex = 0;

function loadSet() {
  const currentSet = sets[currentDifficulty][currentSetIndex];

  pics.forEach((pic, index) => {
    pic.src = `https://via.placeholder.com/150?text=${encodeURIComponent(currentSet.pics[index])}`;
    pic.alt = currentSet.pics[index];
  });

  setInfo.textContent = `${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Set ${currentSetIndex + 1} of 6`;
  guessInput.value = '';
  feedback.className = 'feedback';
  feedback.textContent = '';
}

difficultySelect.addEventListener('change', () => {
  currentDifficulty = difficultySelect.value;
  currentSetIndex = 0;
  loadSet();
});

submitBtn.addEventListener('click', () => {
  const guess = guessInput.value.trim().toLowerCase();
  const correctWord = sets[currentDifficulty][currentSetIndex].word.toLowerCase();

  if (guess === correctWord) {
    feedback.textContent = `Correct! The word is "${sets[currentDifficulty][currentSetIndex].word}".`;
    feedback.className = 'feedback show correct';

    setTimeout(() => {
      currentSetIndex = (currentSetIndex + 1) % 6;
      loadSet();
    }, 2000);
  } else {
    feedback.textContent = 'Incorrect! Try again.';
    feedback.className = 'feedback show incorrect';
  }
});

loadSet();
