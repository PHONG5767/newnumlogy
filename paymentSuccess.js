function noThanks() {
  window.location.href = `/pdf.html`;
}

function getEmail(name, email, message) {
  fetch("https://formspree.io/f/myyqzrbk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    //   nameSendForm: stringName,
    //   birthDay: stringDate,
      name: name,
      email: email,
      message: message + "|" + new Date().toISOString(),
    }),
  })
    .then(console.log)
    .catch(console.error);
}

document
  .getElementById("myFormPayMent")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get values from the form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    getEmail(name, email, message);

    window.location.href = `/pdf.html`;

    document.getElementById("myForm").reset();
  });
