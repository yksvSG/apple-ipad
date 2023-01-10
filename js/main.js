// ---- baskect ----
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

// 1. basketEl에 show 클래스가 있을 때, basketStarterEl 를 클릭하면,
//      1.1.  basketEl가 이미 드롭다운되어 있으므로, basketEl를 보이지 않게 한다.(hide)
// 2. basketEl에 show 클래스가 없을 때, basketStarterEl 를 클릭하면,
//      2.1.  basketEl가 드롭다운 되지 않은 상태이므로, basketEl를 보이게 한다.(show)

const showBasket = () => basketEl.classList.add("show");
const hideBasket = () => basketEl.classList.remove("show");

const handleBasket = (event) => {
  event.stopPropagation(); // 상위 요소까지 이벤트를 전파되지 않게 막음
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
};

basketStarterEl.addEventListener("click", handleBasket);
basketEl.addEventListener("click", (event) => event.stopPropagation());
window.addEventListener("click", hideBasket);

// ----  Search ----
const headerEl = document.querySelector("header");
const headeMenuEls = [...headerEl.querySelectorAll("ul.menu > li")];
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];
const searchInputEl = searchWrapEl.querySelector("input");

const showSearch = () => {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  // console.log("showSearch headeMenuEls 1 ", headeMenuEls);
  headeMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headeMenuEls.length + "s";
  });
  // console.log("showSearch headeMenuEls 2 ", headeMenuEls);
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(() => {
    searchInputEl.focus();
  }, 600);
};

const hideSearch = () => {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  // console.log("hideSearch headeMenuEls 1", headeMenuEls);
  headeMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headeMenuEls.length + "s";
  });
  // console.log("headeMenuEls 2", headeMenuEls);
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
};

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);
