export default function (index) {
  const tabsArr = document.querySelectorAll('.news-bar__tab-item')
  for (let i = 0; i < tabsArr.length; i++) {
    tabsArr[i].classList.remove('tab-active');
  }
  tabsArr[index].className += ' tab-active';
}
