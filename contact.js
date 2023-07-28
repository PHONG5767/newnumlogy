
  
  function getEmail(nameForm, email, message) {
    fetch("https://formspree.io/f/xknlowpo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameForm:nameForm,
        email: email,
        message: message + "|" + new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  