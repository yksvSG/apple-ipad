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
