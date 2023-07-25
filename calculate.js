let stringDate = JSON.parse(localStorage.getItem("listbirthday")) || [];
let date = new Date(stringDate);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let fullname = JSON.parse(localStorage.getItem("listName")) || "";
let nummonth = JSON.parse(localStorage.getItem("numMonth")) || [];
let numday = JSON.parse(localStorage.getItem("numDay")) || [];
let numyear = JSON.parse(localStorage.getItem("numYear")) || [];
let nummain = JSON.parse(localStorage.getItem("numMain")) || [];
// document.getElementById('cover__img-numMain').innerHTML = nummain;
// document.getElementById('cover__img-name').innerHTML = `<p>Your Name: ${fullname}</p>`
function convertToPlainCharacter(character) {
  const conversions = {
    đ: "d",
    Đ: "d",
  };

  return conversions[character] || character;
}

let fullnameOmitMark = fullname
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\s/g, "");
let charactersFullName = fullnameOmitMark.split("");
let lowercaseCharacters = charactersFullName.map((character) =>
  character.toLowerCase()
);
lowercaseCharacters = lowercaseCharacters.map(convertToPlainCharacter);

// function getBirthdayNumber() {
//   document.getElementById("BirthdayNumber-js").innerHTML = `${
//     BirthdayNumber["num" + day]
//   }`;
// }
// getBirthdayNumber();

// function ChallengeNumbers() {
//   document.getElementById("ChallengeNumbers__title").innerHTML =
//     ChallengeNumbersContent.content;

//   document.getElementById("FirstChallenge-js").innerHTML = `${
//     FirstChallenge["num" + numday]
//   }`;
//   document.getElementById("SecondChallenge-js").innerHTML = `${
//     SecondChallenge["num" + nummonth]
//   }`;
//   document.getElementById("ThirdChallenge-js").innerHTML = `${
//     ThirdChallenge["num" + numyear]
//   }`;
//   document.getElementById("FourthChallenge-js").innerHTML = `${
//     FourthChallenge["num" + nummain]
//   }`;
// }
// ChallengeNumbers();

// function PeriodCycleNumbers() {
//   document.getElementById("FirstPeriodCycle-js").innerHTML = `${
//     FirstPeriodCycle["num" + numday]
//   }`;
//   document.getElementById("SecondPeriodCycle-js").innerHTML = `${
//     SecondPeriodCycle["num" + nummonth]
//   }`;
//   document.getElementById("ThirdPeriodCycle-js").innerHTML = `${
//     ThirdPeriodCycle["num" + numyear]
//   }`;
// }
// PeriodCycleNumbers();

function ExpressionNumber() {
  let fullnameOmitMark = fullname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");
  let charactersFullName = fullnameOmitMark.split("");
  let lowercaseCharacters = charactersFullName.map((character) =>
    character.toLowerCase()
  );
  HeartsDesireNumber(lowercaseCharacters);
  heartDesireNumberCreateImg(lowercaseCharacters);
  const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  };

  let sum = lowercaseCharacters.reduce(
    (total, character) => total + (values[character] || 0),
    0
  );
  // document.getElementById(
  //   "total__name"
  // ).innerHTML = `<span>The total value of your name: ${sum}</span>`;

  calculateFinalName(sum);
  return sum;
}
ExpressionNumber();

function getImg() {
  for (let i = 0; i < lowercaseCharacters.length; i++) {
    let divChild = document.createElement("div");
    divChild.classList.add(lowercaseCharacters[i]);
    divChild.classList.add("imgName");

    var imageElement = document.createElement("img");

    imageElement.src = `./img/${lowercaseCharacters[i]}.png`;

    divChild.appendChild(imageElement);

    // document.getElementById("Expression__number").appendChild(divChild);
    // document.getElementById("YourSelfNumber__img").appendChild(divChild);
  }
}
getImg();

function calculateFinalName(sum) {
  let persum = caculateSum(sum);
  // console.log(persum);

  // document.getElementById(
  //   "finalTotal__name"
  // ).innerHTML = `<span>Expression Number Your Name:${persum}</span>`;
  // document.getElementById("finalTotal__name--content").innerHTML = `${
  //   FourthChallenge["num" + persum]
  // }`;
  // console.log('sum',sum)
  return persum;
}

// function MinorExpressionNumber() {}

function HeartsDesireNumber(lowercaseCharacters) {
  const values = {
    a: 1,
    e: 5,
    i: 9,
    o: 6,
    u: 3,
    y: 7,
  };
  let sumNum = lowercaseCharacters.reduce(
    (total, character) => total + (values[character] || 0),
    0
  );
  finalSumHeart(sumNum);
  return sumNum;
}

//////////
function caculateSum(sumNum) {
  let sumHeart = 0;
  while (sumNum > 0 || sumHeart > 9) {
    if (sumNum === 0) {
      sumNum = sumHeart;
      sumHeart = 0;
    }
    sumHeart += sumNum % 10;
    sumNum = Math.floor(sumNum / 10);
  }
  return sumHeart;
}
///////////
function finalSumHeart(sumNum) {
  let sumHeart = caculateSum(sumNum);
  // document.getElementById(
  //   "HeartDesireNumber__leader--number"
  // ).innerHTML = `<span>${sumHeart}</span>`;
  // document.getElementById(
  //   "HeartDesireNumber__leader--subtilte"
  // ).innerHTML = `<p style="font-weight: 900">What does an Soul Urge Number of ${sumHeart} mean?</p>`;
  // document.getElementById("HeartDesireNumberContent__content").innerHTML = `${
  //   HeartDesireNumberContent["num" + sumHeart]
  // }`;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function heartDesireNumberCreateImg(lowercaseCharacters) {
  for (let i = 0; i < lowercaseCharacters.length; i++) {
    let divChild = document.createElement("div");
    divChild.classList.add("imgName");
    let imageElement = document.createElement("img");
    if (
      lowercaseCharacters[i] !== "u" &&
      lowercaseCharacters[i] !== "a" &&
      lowercaseCharacters[i] !== "o" &&
      lowercaseCharacters[i] !== "i" &&
      lowercaseCharacters[i] !== "y" &&
      lowercaseCharacters[i] !== "e"
    ) {
      imageElement.src = `./img/${lowercaseCharacters[i]}0.png`;
    } else {
      imageElement.src = `./img/${lowercaseCharacters[i]}2.png`;
    }
    divChild.appendChild(imageElement);

    // document.getElementById("HeartDesireNumber__img").appendChild(divChild);
  }
}
// function MinorHeartsDesireNumber() {}

function PersonalityNumber() {
  const values = {
    b: 2,
    c: 3,
    d: 4,
    f: 6,
    g: 7,
    h: 8,
    j: 1,
    y: 7,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    v: 4,
    w: 5,
    x: 6,
    z: 8,
  };
  let sumNum = lowercaseCharacters.reduce(
    (total, character) => total + (values[character] || 0),
    0
  );
  let sum = caculateSum(sumNum);
  // document.getElementById(
  //   "PersonalityNumber__leader--tilte"
  // ).innerHTML = `<span>Personality Number: ${sum}</span>`;
  // document.getElementById(
  //   "PersonalityNumber__sub--tilte"
  // ).innerHTML = `<p style="font-weight:900">What does a Personality Number of ${sum} mean?</p>`;
  // document.getElementById("PersonalityNumber__content").innerHTML =
  //   PersonalityNumberContent["num" + sum];
  return sum;
}
PersonalityNumber();

function getPersonalityNumberImg() {
  for (let i = 0; i < lowercaseCharacters.length; i++) {
    let divChild = document.createElement("div");
    divChild.classList.add("imgName");
    let imageElement = document.createElement("img");
    if (
      lowercaseCharacters[i] !== "u" &&
      lowercaseCharacters[i] !== "a" &&
      lowercaseCharacters[i] !== "o" &&
      lowercaseCharacters[i] !== "i" &&
      lowercaseCharacters[i] !== "e"
    ) {
      imageElement.src = `./img/${lowercaseCharacters[i]}1.png`;
    } else {
      imageElement.src = `./img/${lowercaseCharacters[i]}0.png`;
    }
    divChild.appendChild(imageElement);

    // document.getElementById("PersonalityNumber__img").appendChild(divChild);
  }
}
getPersonalityNumberImg();

// function KarmicLessonNumbers() {
//   document.getElementById(
//     "YourKarmicLessons"
//   ).innerHTML = `<span>Your Karmic Lessons: ${nummain}</span>`;
//   document.getElementById("YourKarmicLessons__content").innerHTML =
//     YourKarmicLessonsContent["num" + nummain];
// }
// KarmicLessonNumbers();
function SubconsciousSelfNumber() {
  const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  };

  const uniqueValues = lowercaseCharacters.map((char) => values[char]);

  function checkValue(value) {
    return uniqueValues.includes(value) ? "Yes" : "No";
  }

  let a = [];

  for (let i = 1; i <= 9; i++) {
    let divChild = document.createElement("li");
    divChild.innerHTML = `<p>Number ${i}  - <i>${checkValue(i)}</i></p>`;
    // document
    //   .getElementById("YourSelfNumber__Represented")
    //   .appendChild(divChild);
    a.push(checkValue(i));
  }

  const countYes = a.reduce(
    (count, value) => count + (value === "Yes" ? 1 : 0),
    0
  );
  return countYes;

  // document.getElementById(
  //   "YourSelfNumber"
  // ).innerHTML = `<span>Subconscious Self Number: ${countYes}</span>`;
  // document.getElementById(
  //   "representedNumbers"
  // ).innerHTML = `<p style="font-weight:900">You have ${countYes} represented numbers!</p>`;
  // document.getElementById("YourSelfNumber__content").innerHTML =
  //   YourSelfNumberContent["num" + countYes];
}
SubconsciousSelfNumber();

function BalanceNumbers() {
  let words = fullname.split(" ");

  let result = "";

  for (let i = 0; i < words.length; i++) {
    result += words[i][0].toLowerCase();
  }
  let arrresult = result.split("");

  const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  };

  let sum = arrresult.reduce(
    (total, character) => total + (values[character] || 0),
    0
  );
  let sumBalance = caculateSum(sum);

  // document.getElementById('Balance-Number').innerHTML = `<span>Balance Number: ${sumBalance}</span>`
  // document.getElementById('Balance-Number-sub').innerHTML = `<p style="font-weight:900">What does an Balance Number of ${sumBalance} mean?</p>`
  // document.getElementById('BalanceNumbers__content').innerHTML = `${BalanceNumberContent['num'+sumBalance]}`

  for (let i = 0; i < arrresult.length; i++) {
    let divChild = document.createElement("div");
    divChild.classList.add(arrresult[i]);
    divChild.classList.add("imgName");

    var imageElement = document.createElement("img");

    imageElement.src = `./img/${arrresult[i]}.png`;

    divChild.appendChild(imageElement);

    // document.getElementById("BalanceNumbers__img").appendChild(divChild);
  }
  return { arrresult, sumBalance };
}
BalanceNumbers();
