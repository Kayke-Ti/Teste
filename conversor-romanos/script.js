function romanToArabic(roman) {
  var romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  var arabic = 0;

  for (var i = 0; i < roman.length; i++) {
    var currentSymbol = roman[i];
    var currentValue = romanNumerals[currentSymbol];

    var nextSymbol = roman[i + 1];
    var nextValue = romanNumerals[nextSymbol];

    if (nextValue && currentValue < nextValue) {
      arabic -= currentValue;
    } else {
      arabic += currentValue;
    }
  }

  return arabic;
}

function convert() {
  var romanInput = document.getElementById('roman-input');
  var result = document.getElementById('result');

  var romanNumber = romanInput.value.toUpperCase();
  var arabicNumber = romanToArabic(romanNumber);

  result.innerHTML = "Número arábico: " + arabicNumber;
}
