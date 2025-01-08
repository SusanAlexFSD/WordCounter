const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const charNoSpaceCount = document.getElementById('charNoSpaceCount');
const syllableCount = document.getElementById('syllableCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');
const oneWordKeywords = document.getElementById('oneWordKeywords');
const twoWordKeywords = document.getElementById('twoWordKeywords');
const threeWordKeywords = document.getElementById('threeWordKeywords');

function calculateFrequencies(words) {
  const frequencies = {};
  words.forEach(word => {
    word = word.toLowerCase();
    frequencies[word] = (frequencies[word] || 0) + 1;
  });
  return frequencies;
}

function extractPhrases(words, n) {
  const phrases = [];
  for (let i = 0; i <= words.length - n; i++) {
    phrases.push(words.slice(i, i + n).join(' '));
  }
  return phrases;
}

function updateKeywords(words) {
  const oneWordFreq = calculateFrequencies(words);
  const twoWordFreq = calculateFrequencies(extractPhrases(words, 2));
  const threeWordFreq = calculateFrequencies(extractPhrases(words, 3));

  function updateList(element, freq) {
    element.innerHTML = '';
    Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .forEach(([phrase, count]) => {
        const percentage = ((count / words.length) * 100).toFixed(2);
        element.innerHTML += `<li>${phrase}: ${count} (${percentage}%)</li>`;
      });
  }

  updateList(oneWordKeywords, oneWordFreq);
  updateList(twoWordKeywords, twoWordFreq);
  updateList(threeWordKeywords, threeWordFreq);
}

textInput.addEventListener('input', () => {
  const text = textInput.value.trim();
  const words = text.split(/\s+/).filter(word => word !== '');

  // Update general stats
  wordCount.textContent = words.length;
  charCount.textContent = text.length;
  charNoSpaceCount.textContent = text.replace(/\s+/g, '').length;
  syllableCount.textContent = text.match(/[aeiouy]+/gi)?.length || 0;
  sentenceCount.textContent = text.split(/[.!?]+/).filter(Boolean).length;
  paragraphCount.textContent = text.split(/\n+/).filter(Boolean).length;

  // Update keywords
  updateKeywords(words);
});
