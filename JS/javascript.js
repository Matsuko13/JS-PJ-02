let images = [{
    url: '../images/png/image1.png',
    city: 'Rostov-on-Don \n LCD admiral',
    area: '81 m2',
    time: '3.5 months',
    cost: 'Upon request'
},
{
    url: '../images/png/image2.png',
    city: 'Sochi \n Thieves',
    area: '105 m2',
    time: '4 months',
    cost: 'Upon request'
},
{
    url: '../images/png/image3.png',
    city: 'Rostov-on-Don Patriotic',
    area: '93 m2',
    time: '3 months',
    cost: 'Upon request'
}];

console.log(images);

function initSlider() {
    if (!images || !images.length) return;
    let imageWrap = document.querySelector('.shell__images');
    let switchElements = document.querySelector('.slider__switch');
    let sliderDots = document.querySelector('.slider__dots');
    let sliderHeads = document.querySelectorAll('.header__list');

    initImages();
    initArrows();
    initDots();
    initInform();
    initHeaders();

    function initImages() {
        images.forEach((image, index) => {
            let imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.classList.add('image', `n${index}`, index === 0 ? "active" : "notimage");
            imgElement.setAttribute('data-index', index);
            imageWrap.appendChild(imgElement);

        });
    }

    function initArrows() {
        switchElements.querySelectorAll('.slider__arrow').forEach(arrow => {
            arrow.addEventListener('click', function () {
                let currentSlideNum = +imageWrap.querySelector('.active').dataset.index;
                let nextSlideNumber;
                if (arrow.classList.contains('left')) {
                    nextSlideNumber = + currentSlideNum === 0 ? images.length - 1 : currentSlideNum - 1;
                } else {
                    nextSlideNumber = currentSlideNum === images.length - 1 ? 0 : currentSlideNum + 1;
                }
                moveSlider(nextSlideNumber);
            });
        });
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class = 'slider__dots-item ${index === 0 ? 'active' : 'notdots'}' data-index = '${index}'></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll('.slider__dots-item').forEach(dot =>
            dot.addEventListener('click', function () {
                moveSlider(this.dataset.index);
                sliderDots.querySelector('.active').classList.remove('active');
                this.classList.add('active');

            })
        )
    }

    function initInform() {
        let cityShell = document.querySelector('.shell__city_name');
        let cityName = `<li class = "cityname text">${images[0].city}</li>`;
        cityShell.innerHTML += cityName;

        let areaShell = document.querySelector('.shell__area');
        let apartArea = `<li class = "area text">${images[0].area}</li>`;
        areaShell.innerHTML += apartArea;

        let timeShell = document.querySelector('.shell__time');
        let repairTime = `<li class = "time text">${images[0].time}</li>`;
        timeShell.innerHTML += repairTime;

        let costShell = document.querySelector('.shell__cost');
        let repairCost = `<li class = "cost text">${images[0].cost}</li>`;
        costShell.innerHTML += repairCost;
    }

    function changeCity(number) {
        if (!images[number].city) return;
        let cityBlock = document.querySelector('.cityname');
        cityBlock.innerText = images[number].city;

        if (!images[number].area) return;
        let areaBlock = document.querySelector('.area');
        areaBlock.innerText = images[number].area;

        if (!images[number].time) return;
        let timeBlock = document.querySelector('.time');
        timeBlock.innerHTML = images[number].time;

        if (!images[number].cost) return;
        let costBlock = document.querySelector('.cost');
        costBlock.innerHTML = images[number].cost;
    }

    function initHeaders() {
        sliderHeads.forEach((link, index) => {
            link.setAttribute('data-index', index);
            console.log(link);
        });
        sliderHeads.forEach(link => {
            link.addEventListener('click', function () {
                moveSlider(this.dataset.index);
                sliderHeads.forEach(header => {
                    header.classList.remove('slide__active');
                });
                this.classList.add('slide__active');
            });

        });
    }

    function moveSlider(number) {
        imageWrap.querySelector('.active').classList.remove('active');
        imageWrap.querySelector('.n' + number).classList.remove('notimage');
        imageWrap.querySelector('.n' + number).classList.add('active');
        sliderDots.querySelector('.active').classList.remove('active');
        sliderDots.querySelector(`[data-index="${number}"]`).classList.add('active');
        changeCity(number);
        changeHeadersAndDots(number); 
    }

    function changeHeadersAndDots(number) {
        sliderHeads.forEach(header => {
            header.classList.remove('slide__active');
        });
        sliderHeads[number].classList.add('slide__active');

        sliderDots.querySelectorAll('.slider__dots-item').forEach(dot => {
            dot.classList.remove('active');
        });
        sliderDots.querySelector(`[data-index="${number}"]`).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', initSlider);