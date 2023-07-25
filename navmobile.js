let $buttonShow = document.getElementById("icon__menu--mobile");
let $contentNav = document.getElementById("primary-menu-mobile");
let $buttonClose = document.getElementById("icon_close");

function showMenu() {
  $buttonShow.addEventListener("click", () => {
    $contentNav.classList.toggle("open");
    $contentNav.classList.remove("close");

  });
}
showMenu();

function closeMenu() {
  $buttonClose.addEventListener("click", () => {
    $contentNav.classList.toggle("close");
    $contentNav.classList.remove("open")
  });
}
closeMenu();
