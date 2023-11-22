const getPickupLinesData = () => [
  'Are you a magician? Because whenever I look at you, everyone else disappears.',
  'Do you have a map? I keep getting lost in your eyes.',
  "Is your name Google? Because you have everything I've been searching for.",
  "Are you a parking ticket? Because you've got 'Fine' written all over you.",
  'Excuse me, but I think the stars tonight are outshone by your beauty.',
  'Are you a camera? Every time I look at you, I smile.',
  'Do you have a Band-Aid? Because I just scraped my knee falling for you.',
  "Are you made of copper and tellurium? Because you're Cu-Te.",
  "If you were a vegetable, you'd be a cute-cumber!",
  "Are you a Wi-Fi signal? Because I'm feeling a connection.",
  'Do you have a sunburn, or are you always this hot?',
  'Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical.',
  'Can I follow you home? Cause my parents always told me to follow my dreams.',
  "If you were a cat, you'd purr-fect.",
  "Are you a time traveler? Because I can't imagine my future without you.",
  'Do you have a pencil? Cause I want to erase your past and write our future.',
  "Are you a campfire? Because you're hot and I want s'more.",
  'Do you have a name, or can I call you mine?',
  'Is your name Waldo? Because someone like you is hard to find.',
  "If you were a fruit, you'd be a fineapple.",
  'Do you believe in love at first sight, or should I walk by again?',
  "Are you a parking ticket? Because you've got 'Fine' written all over you.",
  'If you were words on a page, you’d be fine print.',
  'Are you a magician? Because whenever I look at you, everyone else disappears.',
  'Do you have a sunburn, or are you always this hot?',
  'Are you an alien? Because you just abducted my heart.',
  'Do you have a Band-Aid? Because I just scraped my knee falling for you.',
  'Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical.',
  'Do you have a map? I keep getting lost in your eyes.',
  "If beauty were time, you'd be an eternity.",
  "Are you a parking ticket? Because you've got FINE written all over you.",
  "Is your name Google? Because you've got everything I've been searching for.",
  'Excuse me, but I think the stars tonight are outshone by your beauty.',
  'Are you a camera? Every time I look at you, I smile.',
  'Do you have a name, or can I call you mine?',
  "Are you a Wi-Fi signal? Because I'm feeling a connection.",
  'Do you believe in love at first sight, or should I walk by again?',
  "If you were a cat, you'd purr-fect.",
  "Are you a time traveler? Because I can't imagine my future without you.",
  'Do you have a pencil? Cause I want to erase your past and write our future.',
  "If you were a fruit, you'd be a fineapple.",
  'Do you have a name, or can I call you mine?',
  'Is your name Waldo? Because someone like you is hard to find.',
  'If you were words on a page, you’d be fine print.',
  'Are you an alien? Because you just abducted my heart.',
  "If beauty were time, you'd be an eternity.",
];

function getRandomElement(array: String[]) {
  // Generate a random index based on the length of the array
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the randomly selected element
  return array[randomIndex];
}

export { getPickupLinesData, getRandomElement };
