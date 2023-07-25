
document.querySelectorAll('.accordion__content--decription').forEach((element, index) =>{
    element.innerHTML = accordion[`content${index}`];
    element.style.display = 'none'
})

var acc = document.getElementsByClassName("accordion__content--title");

var i;
for (i = 0; i < acc.length; i++) {
   
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}