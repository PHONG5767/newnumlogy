var numerologyModule = (function () {
  const canSumNumerology = (n) => n > 9 && ![11, 22].includes(n);

  const sum = (a, b) => a + b;

  const sumDigits = (n) => `${n}`.split("").map(Number).reduce(sum);

  const sumNumerology = (n) => {
    return canSumNumerology(n) ? sumNumerology(sumDigits(n)) : n;
  };

  const sumListNumerology = (list) => {
    const listNumerology = list.map(sumNumerology).reduce(sum);

    return sumNumerology(listNumerology);
  };

  const calculateNumerologyOfBirthDay = (date) => {
    return sumListNumerology([
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ]);
  };

  var returnFuntion = function () {
    document
      .querySelector(".js-numerology-form")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = Object.fromEntries(new FormData(e.target));
        var birthday = new Date(formData["Birthday"]);
        var name = formData["Name"];
        let numMain = calculateNumerologyOfBirthDay(birthday);
        var numDay = sumNumerology(birthday.getDate());
        var numMonth = sumNumerology(birthday.getMonth() + 1);
        var numYear = sumNumerology(birthday.getFullYear());
        saveLocal(birthday, name, numMain, numDay, numMonth, numYear);
        window.location.href = "sendForm.html";
      });
  };

  function saveLocal(birthday, name, numMain, numDay, numMonth, numYear) {
    localStorage.setItem("listbirthday", JSON.stringify(birthday));
    localStorage.setItem("listName", JSON.stringify(name));
    localStorage.setItem("numMain", JSON.stringify(numMain));
    localStorage.setItem("numDay", JSON.stringify(numDay));
    localStorage.setItem("numMonth", JSON.stringify(numMonth));
    localStorage.setItem("numYear", JSON.stringify(numYear));
  }

  return function () {
    returnFuntion();
  };
})();

numerologyModule();

let moveToFormButton = document.getElementById("moveToFormButton");
let formMove = document.getElementById("form");

moveToFormButton.addEventListener('click', function() {
  const formRect = formMove.getBoundingClientRect();
  const yOffset = formRect.top + formRect.height / 2 - window.innerHeight / 2;

  window.scrollTo({
    top: yOffset,
    behavior: 'smooth'
  });
});
