
function initSwiper() {
    bindSwiper('.swiper-footer li', 'swiper-body', 604, true,)
}
function initNews() {
    bindSwiper('.news-header ul li:not(.more)', 'dl-container', 325)
}

function bindSwiper(controlEl, targetEl, width, autoPlay = false) {
    var lis = document.querySelectorAll(controlEl)
    var ul = document.getElementsByClassName(targetEl)[0]
    var activeIndex = 0
    if (autoPlay) {
        var timer = setInterval(() => {
            handler(activeIndex)
        }, 3000);
    }
    lis.forEach((item, i) => {
        let index = i
        item.onmouseenter = function () {
            handler(index)
            autoPlay && clearInterval(timer)
        }
        item.onmouseleave = function () {
            if (autoPlay) {
                timer = setInterval(() => {
                    handler(activeIndex)
                }, 3000);
            }
        }
    })


    function handler(index) {
        ul.style.left = -index * width + 'px'
        lis.forEach(item => {
            item.classList.remove('active')
        })
        lis[index].classList.add('active')
        activeIndex = index + 1
        activeIndex = activeIndex > lis.length - 1 ? 0 : activeIndex
    }
}

window.onload = function () {
    initSwiper()
    initNews()
}