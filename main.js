const textareaInput = document.querySelector("#textareaInput");
const textareaOutput = document.querySelector("#textareaOutput");
const rangeInput = document.querySelector("#key");
const codeBtn = document.querySelector("#codeBtn");
const uncodeBtn = document.querySelector("#uncodeBtn");

let key = +rangeInput.value;

// prettier-ignore
const alphabet = ["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","R","S","Ś","T","U","W","Y","Z","Ź","Ż"]
const numberOfCharacters = +alphabet.length;
const numeredAlphabet = new Map();
alphabet.map((char, index) => numeredAlphabet.set(char, index));

const getByValue = (searchValue) => {
  for (let [key, value] of numeredAlphabet.entries()) {
    if (value === searchValue) return key;
  }
};

const cleanText = (arr) => arr.filter((char) => numeredAlphabet.has(char));

// true = code | false = uncode
const useCode = (mode) => {
  const text = cleanText(textareaInput.value.toUpperCase().split(""));

  const transformedText = text.map((char) => {
    const currIndex = +numeredAlphabet.get(char);
    const sum = mode ? currIndex + key : currIndex - key;

    if (mode) {
      const newIndex =
        sum > numberOfCharacters - 1 ? sum - numberOfCharacters : sum;
      return getByValue(newIndex);
    } else {
      const newIndex = sum < 0 ? sum + numberOfCharacters : sum;
      return getByValue(newIndex);
    }
  });

  return transformedText.join("");
};

codeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  textareaOutput.textContent = useCode(true);
});

uncodeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  textareaOutput.textContent = useCode();
});

rangeInput.addEventListener("change", (e) => (key = +e.target.value));
