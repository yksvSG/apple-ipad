import ipads from "../data/ipads.js";
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

// 요소의 가시성 관찰
// 1. 관찰하는 개별 요소가 화면에 교차될 때, 해당 요소에 .show 를 추가한다.
// 2. 이때, 조건문으로 요소가 화면에 교차되지 않을 때, 함수를 종료한다.(return)
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (!entry.isIntersecting) {
      // entry.target.classList.remove("show");
      return;
    } else {
      entry.target.classList.add("show");
    }
  });
});

// 관찰할 요소 배열
const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  // 관찰 등록
  io.observe(el);
});

// ---------------------------

// 비디오 재생
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  video.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

// Compare
const itemsEl = document.querySelector("section.compare .items");
// console.log(ipads);
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color: ${color}"></li>`;
  });

  itemEl.innerHTML = /* html*/ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;

  itemsEl.append(itemEl);
});
