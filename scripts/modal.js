const modalLinks = document.querySelectorAll('.modal-link'),
      body = document.querySelector("body"),
      lockPadding = document.querySelectorAll(".lock-padding"),
      timeout = 200;
     
let unlock = true;
const prevent = ev => ev.preventDefault();

if(modalLinks.length > 0){
    for (let index = 0; index < modalLinks.length; index++) {
        const modalLink = modalLinks[index];
        modalLink.addEventListener('click', function(e){
            const popupIndex = modalLink.getAttribute("index");
            modalOpen(popupIndex);
            e.preventDefault();
        });   
    };
};

const popupCloseIcon = document.querySelectorAll(".close-popup");
if(popupCloseIcon.length > 0){
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];

        el.addEventListener('click', function(e){
            modalClose(el.closest('.modal-window'));
            e.preventDefault();
        });
    };
};

function modalOpen(popupIndex){
    if(unlock){
        const name = document.querySelector('.modal__name'),
            date = document.querySelector('.modal__date'),
            modalWindow = document.querySelector('.modal-wrapper');

        name.innerHTML = allEvents[popupIndex].name;
        date.innerHTML = allEvents[popupIndex].date;
        document.addEventListener('wheel', prevent, {passive: false});
        modalWindow.classList.add('open');
        // закрытие модального окна по клику на область за пределами модального окна
        modalWindow.addEventListener('click', function (e){
            if(!e.target.closest('.modal')){
                modalClose(e.target.closest('.modal-window'))
            };
        });
    }
};

function modalClose(modalWindow){
    modalWindow.classList.remove('open');
    document.removeEventListener('wheel', prevent);
};

    
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
        modalWindow = document.querySelector('.modal-wrapper');
        modalClose(modalWindow)
    };
});



// Действия с модальным окном

const modal = document.querySelector(".modal"),
      ticketEl = modal.querySelectorAll(".tickets__element"),
      ticketName = modal.querySelectorAll(".element__name"),
      ticketCost = modal.querySelectorAll(".work-place__cost"),
      btnLess = modal.querySelectorAll(".tickets__btn_less"),
      btnMore = modal.querySelectorAll(".tickets__btn_more"),
      quantityEl = modal.querySelectorAll(".quantity"),
      ticketsContainer = modal.querySelector(".footer__tickets-container"),
      choosenTickets = modal.querySelectorAll(".tickets-container__choosen-ticket"),
      continueBtn = modal.querySelector(".footer__continue-btn"),
      alertModal = modal.querySelectorAll(".work-place__alert");

let firstTicketIndex = 0,
    secondTicketIndex = 1,
    quantity = 0;
    console.log(quantity)

if(quantity === 0){
    moreQuantity();
    for (let index = 0; index < btnLess.length; index++) {
        const el = btnLess[index];
        el.classList.add("shaded");
    }
}
else if(quantity < 4){
    moreQuantity();
    lessQuantity();
}
else if(quantity === 4){
    lessQuantity();
}
else{
    alert("Error");
}

function moreQuantity(e){
    for (let index = 0; index < btnMore.length; index++) {
        const el = btnMore[index];
        el.addEventListener('click', function(e){
            quantity++;
            console.log(quantity)
        })
    }
}