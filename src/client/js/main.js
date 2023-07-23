import "../scss/styles.scss";

const btnYes = document.querySelector(".attending_yes");
const btnNo = document.querySelector(".attending_no");
const indexRsvp = document.querySelector(".index-rsvp__show");
const indexRsvpHidden = document.querySelector(".hidden__input");

btnYes.addEventListener("click", () => {
  const value = btnYes.getAttribute("value");
  console.log(value);
  indexRsvpHidden.value = value;
  indexRsvp.classList.remove("hidden");
  btnYes.classList.add("active");
  btnNo.classList.remove("active");
});

btnNo.addEventListener("click", () => {
  const value = btnNo.getAttribute("value");
  indexRsvpHidden.value = value;
  console.log(value);
  indexRsvp.classList.add("hidden");
  btnYes.classList.remove("active");
  btnNo.classList.add("active");
});

// const burger = document.querySelector(".burger");
// const navLinksMobile = document.querySelector(".nav_links_mobile");
// const menu = document.querySelector(".nav_links_mobile_ul");

// burger.addEventListener("click", () => {
//   if (menu.classList.contains("show")) {
//     this.setAttribute("aria-expanded", "false");
//     menu.classList.remove("show");
//   } else {
//     menu.classList.add("show");
//     this.setAttribute("aria-expanded", "true");
//   }
// });
