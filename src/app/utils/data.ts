const getPickupLinesData = () => [
  'Are you a magician? Because whenever I look at you, everyone else disappears.',
  'Do you have a name, or can I call you mine?',
  "Are you a Wi-Fi signal? Because I'm feeling a connection.",
  'Do you have a sunburn, or are you always this hot?',
  'Are you a camera? Every time I look at you, I smile.',
  "Is your name Google? Because you have everything I've been searching for.",
  'Excuse me, but I think the stars tonight are outshone by your beauty.',
  'Do you believe in love at first sight, or should I walk by again?',
  "Is your name Wi-fi? Because I'm really feeling a connection.",
  "If you were a vegetable, you'd be a cute-cumber!",
  "Are you a parking ticket? Because you've got 'Fine' written all over you.",
  'Do you have a map? I keep getting lost in your eyes.',
  'Excuse me, but I think you dropped something: MY JAW!',
  "If you were a cat, you'd purr-fect.",
  'Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical.',
  'Do you have a Band-Aid? Because I just scraped my knee falling for you.',
  "Are you made of copper and tellurium? Because you're Cu-Te.",
  "Are you a time traveler? Because I can't imagine my future without you.",
  'Do you have a sunburn, or are you always this hot?',
  'Is your name Ariel? Because we mermaid for each other.',
  "If you were a fruit, you'd be a fineapple.",
  "Are you a parking ticket? Because you've got 'FINE' written all over you.",
  'Do you have a name, or can I call you mine?',
  "Is your name Google? Because you've got everything I've been searching for.",
  'Excuse me, but I think the stars tonight are outshone by your beauty.',
  "If you were a cat, you'd purr-fect.",
  'Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical.',
  'Do you have a Band-Aid? Because I just scraped my knee falling for you.',
  "Are you made of copper and tellurium? Because you're Cu-Te.",
  "Are you a time traveler? Because I can't imagine my future without you.",
  'Do you have a sunburn, or are you always this hot?',
  'Is your name Ariel? Because we mermaid for each other.',
  "If you were a fruit, you'd be a fineapple.",
  "Are you a parking ticket? Because you've got 'FINE' written all over you.",
  'Do you have a name, or can I call you mine?',
  "Is your name Google? Because you've got everything I've been searching for.",
  'Excuse me, but I think the stars tonight are outshone by your beauty.',
  "If you were a cat, you'd purr-fect.",
  'Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical.',
  'Do you have a Band-Aid? Because I just scraped my knee falling for you.',
  "Are you made of copper and tellurium? Because you're Cu-Te.",
  "Are you a time traveler? Because I can't imagine my future without you.",
  'Do you have a sunburn, or are you always this hot?',
  'Is your name Ariel? Because we mermaid for each other.',
  "If you were a fruit, you'd be a fineapple.",
  "Are you a parking ticket? Because you've got 'FINE' written all over you.",
];

function getRandomElement(array: String[]) {
  // Generate a random index based on the length of the array
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the randomly selected element
  return array[randomIndex];
}

export { getPickupLinesData, getRandomElement };
