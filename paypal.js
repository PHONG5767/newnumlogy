paypal
  .Buttons({
    style: {
      layout: "vertical",
      color: "blue",
      shape: "rect",
      label: "pay",
    },
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "9.00",
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert("Payment successful! Transaction ID: " + details.id);
        console.log(data)
        window.location.href = `/paymentSuccess.html`;
      });
    },
  })
  .render("#paypal-button-container");