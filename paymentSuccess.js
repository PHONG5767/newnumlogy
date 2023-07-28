function noThanks() {
  window.location.href = `/pdf.html`;
}


  let params = new URLSearchParams(document.location.search);
  let orderid = params.get("orderid");
  let payerid = params.get("payerid");
  let nameCal = params.get("name");
  let birthday = params.get("birthday");


function getEmail(nameForm, email, message) {
  fetch("https://formspree.io/f/xknlowpo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payerid: payerid,
      orderid: orderid,
      birthday: birthday,
      name: nameCal,
      nameForm:nameForm,
      email: email,
      message: message + "|" + new Date().toISOString(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = `/pdf.html`;
    })
    .catch((error) => {
      console.error(error);
    });
}

document
  .getElementById("myFormPayMent")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nameForm = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    getEmail(nameForm,email, message);
  });
