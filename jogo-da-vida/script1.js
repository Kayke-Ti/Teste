function convertToRoman(number) {
  const romanNumerals = [
    { arabic: 1000, roman: "M" },
    { arabic: 900, roman: "CM" },
    { arabic: 500, roman: "D" },
    { arabic: 400, roman: "CD" },
    { arabic: 100, roman: "C" },
    { arabic: 90, roman: "XC" },
    { arabic: 50, roman: "L" },
    { arabic: 40, roman: "XL" },
    { arabic: 10, roman: "X" },
    { arabic: 9, roman: "IX" },
    { arabic: 5, roman: "V" },
    { arabic: 4, roman: "IV" },
    { arabic: 1, roman: "I" },
  ];

  let romanNumber = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    while (number >= romanNumerals[i].arabic) {
      romanNumber += romanNumerals[i].roman;
      number -= romanNumerals[i].arabic;
    }
  }

  return romanNumber;
}

function convert() {
  const arabicInput = document.getElementById("arabic");
  const romanOutput = document.getElementById("roman");

  const arabicNumber = Number(arabicInput.value);
  const romanNumber = convertToRoman(arabicNumber);

  romanOutput.textContent = romanNumber;
}