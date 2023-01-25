import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";
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
  stopScroll();
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
  playScroll();
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

const playScroll = () => {
  document.documentElement.classList.remove("fixed");
};
const stopScroll = () => {
  document.documentElement.classList.add("fixed");
};

searchStarterEl.addEventListener("click", showSearch);
// mobile 모드에서 이벤트 버블링 발생!
searchCloserEl.addEventListener("click", (event) => {
  event.stopPropagation(); // 이벤트 버블링 중단
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

// 헤더 메뉴 토글
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", () => {
  // headerEl 에 .menuing 있으면, .menuing제거
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// 모바일 헤더 검색
// 1. 모바일 메뉴바에서(header.menuing)
//     검색바 클릭시, header El 속성리스트에 'searching--mobile'을 추가하여,
//     search-canceler El 와 autocompletes El 가 검색바 하단에 노출되도록 한다.
// 2. 검색바 좌측, search-canceler El를 클릭시,
//     search-canceler El 와 autocompletes El 가 비활성화 되면서,
//     clone-menu El 가 노출된다.
const searchTextFiledEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");

searchTextFiledEl.addEventListener("click", () => {
  searchInputEl.focus();
  headerEl.classList.add("searching--mobile");
});
searchCancelEl.addEventListener("click", () => {
  headerEl.classList.remove("searching--mobile");
});

//? 브라우저 resize 이벤트 최적화
//* window.innerWidth; // 브라우저 화면의 너비
//* window.innerHeight; // 브라우저 화면의 높이
//* window.outerWidth; // 브라우저 전체의 너비
//* window.outerHeight; // 브라우저 전체의 높이

window.addEventListener("resize", () => {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

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

// Footer navigations
// 1. footer navigations El 내의 모든 map El 를 선택하여 배열로 만든다.
// 2. navigations.js를 반복조회한다.
//   1) div.map 을 만든다.
//   2) div.map El에 규격화된 html을 추가한다.
//    2.1) <h3>
//           <span class="text">${nav.title}</span>
//           <span class="icon">+</span>
//         </h3>
//         <ul>
// ${mapList}
//         </ul>
// 3. mapList 변수를 만들어, navigations.js의 maps를 요소 정보를 담은 html을 등록한다.
// let mapList = ""
// navigations.maps.forEach((map) => {
//   mapList += `
//   <li>
//     <a href="${map.url}">${map.name}</a>
//   <li/>
//   `
// })

const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });
  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;
  navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
