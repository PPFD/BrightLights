let gallary = [
    {
        src: "concert1.jpg",
    },
    {
        src: "concert2.jpg",
    },
    {
        src: "concert3.jpg",
    },
    {
        src: "concert4.jpg",
    },
    {
        src: "concert5.jpg",
    },
    {
        src: "concert6.jpg",
    },
    {
        src: "concert7.jpg",
    },
    {
        src: "concert8.jpg",
    }
]

const gallaryContainer = document.querySelector(".gallary-modal"),
      gallaryBtn = document.querySelectorAll(".link"),
      gallaryWindow = document.querySelector(".gallary-modal-wrapper");

for (let index = 0; index < gallary.length; index++) {
    let gallaryEl = `<img src="media/images/gallary/${gallary[index].src}" alt="" class="gallary__item">`
    gallaryContainer.insertAdjacentHTML("beforeend", gallaryEl);
};

for (let index = 0; index < gallaryBtn.length; index++) {
    const gallaryLink = gallaryBtn[index];
    gallaryLink.addEventListener('click', function(e){
        openGallary();
        e.preventDefault();
    });
};

function openGallary(){
    document.addEventListener('wheel', prevent, {passive: false});
    gallaryWindow.classList.add('open');
    disableHeader(header);
};

function closeGallary() {
    gallaryWindow.classList.remove('open');
    document.removeEventListener('wheel', prevent);
    enableHeader(header);
};

document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
        closeGallary();
    };
});

gallaryWindow.addEventListener('click', function (e){
    if(!e.target.closest('.gallary-modal')){
        closeGallary();
    };
});

function disableHeader(header){
    header[0].classList.add("disable");
};

function enableHeader(header){
    header[0].classList.remove("disable");
};