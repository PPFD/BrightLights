const modalLinks = document.querySelectorAll('.modal-link'),
      header = document.getElementsByTagName("header");
     
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

const popupCloseIcon = document.querySelectorAll(".modal__close");
if(popupCloseIcon.length > 0){
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];

        el.addEventListener('click', function(e){
            modalClose(el.closest('.modal-window'));
            e.preventDefault();
        });
    };
};

function disableHeader(header){
    header[0].classList.add("disable")
};

function enableHeader(header){
    header[0].classList.remove("disable")
}

function modalOpen(popupIndex){
    if(unlock){
        const name = document.querySelector('.modal__name'),
            date = document.querySelector('.modal__date'),
            modalWindow = document.querySelector('.modal-wrapper');

        name.innerHTML = allEvents[popupIndex].name;
        date.innerHTML = allEvents[popupIndex].date;
        document.addEventListener('wheel', prevent, {passive: false});
        modalWindow.classList.add('open');
        disableHeader(header);
        // закрытие модального окна по клику на область за пределами модального окна
        modalWindow.addEventListener('click', function (e){
            if(!e.target.closest('.modal')){
                modalClose(e.target.closest('.modal-window'));
                modalCloseMini(modalMini);
            };
        });
    }
};

function modalClose(modalWindow){
    const elementsList = modal.querySelectorAll(".tickets-container__choosen-ticket");
    modalWindow.classList.remove('open');
    document.removeEventListener('wheel', prevent);
    sumValueEl.dataset.value = 0; // Обнуляем значения
    totalCostEl.dataset.cost = 0;
    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; 
    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`;
    enableHeader(header);
    ticketEl.forEach(function(e){  
        e.querySelector('.quantity').textContent = 0; 
    });
    removeShadePlus();
    addShadeMinus();
    elementsList.forEach(function(e){
        e.remove();
    });
};
    
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') {
        if (modal.contains(modal.querySelector(".open"))) {
            modalCloseMini(modalMini)
        }
        else{
            modalWindow = document.querySelector('.modal-wrapper');
            modalClose(modalWindow)
        }
    };
});



// Действия с модальным окном

const modal = document.querySelector(".modal"),
      ticketEl = modal.querySelectorAll(".tickets__element"),
      ticketName = modal.querySelectorAll(".element__name"),
      ticketCost = modal.querySelectorAll(".work-place__cost"),
      btnLess = modal.querySelectorAll(".tickets__btn_less"),
      btnMore = modal.querySelectorAll(".tickets__btn_more"),
      ticketsContainer = modal.querySelector(".footer__tickets-container"),
      choosenTickets = modal.querySelectorAll(".tickets-container__choosen-ticket"),
      continueBtn = modal.querySelector(".footer__continue-btn"),
      alertModal = modal.querySelectorAll(".work-place__alert"),
      totalCostEl = document.getElementById('totalCost'),
      sumValueEl = document.getElementById("totalAmount"),
      container = modal.querySelector(".footer__tickets-container");

const ACTION = {
    PLUS: "plus",
    MINUS: "minus"
}

const calculations = () => { // Функция для вычисления общего количества билетов
                                               // и общей стоимости
    let sumValue = 0,
        totalCost = 0;
    ticketEl.forEach(function(e){ // Для каждого элемента с классом tickets__element прооизводим действия
        sumValue += Number(e.querySelector(".quantity").textContent); // Суммируем текстовое значение всех локальных элементов .quantity
        let stringWithDollar = String(e.querySelector(".work-place__cost").textContent); // Получаем строку стоимости со знаком $
        let stringWithoutDollar = stringWithDollar.replace(/.$/, '');// Преобразуем строку стоимости в строку без $
        totalCost += (Number(stringWithoutDollar) * Number(e.querySelector(".quantity").textContent)); // Высчитываем общую стоимость путем умножения стоимости
                                                                                                       // на количество (локальное) каждого элемента
      }); 
    return [totalCost,sumValue] // Возвращаем массив из двух переменных
};

const addShadePlus =() =>{ // Функция добавления класса shaded ко всем кнопках +
    ticketEl.forEach(function(e){  // Проходимся по всем кнопкам + и присваиваем им класс Shaded
        e.querySelector('.tickets__btn_more').classList.add("shaded"); 
    });
};

const addShadeMinus =() =>{ // Функция добавления класса shaded ко всем кнопках -
    ticketEl.forEach(function(e){  // Проходимся по всем кнопкам - и присваиваем им класс Shaded
        e.querySelector('.tickets__btn_less').classList.add("shaded"); 
    });
};

const removeShadePlus =() =>{ // Функция удаления класса shaded из всех кнопок +
    ticketEl.forEach(function(e){  // Проходимся по всем кнопкам + и удаления класса Shaded
        e.querySelector('.tickets__btn_more').classList.remove("shaded"); 
    });
};

const removeShadeMinus =() =>{ // Функция удаления класса shaded из всех кнопок -
    ticketEl.forEach(function(e){  // Проходимся по всем кнопкам - и удаления класса Shaded
        e.querySelector('.tickets__btn_less').classList.remove("shaded"); 
    });
};

const init = () =>{ // Функция инициализации значений общего количества билетов и их общей стоимости
    
    const [tCost , sValue] = calculations() // Сохраняем результат функции calculations в массив

    sumValueEl.dataset.value = sValue; // Присваиваем полученное значение дата-атрибуту value 
    totalCostEl.dataset.cost = tCost; // Присваиваем полученное значение дата-атрибуту cost 
    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
};
init();

const checkPlus = (ticketsElement) =>{ //Функция проверки при нажатии на кнопку +
    const total = Number(sumValueEl.dataset.value), // Получаем значение дата-атрибута общего количества билетов, 
                                                    // при нажатии кнопки в константу
          quantity = ticketsElement.querySelector(".quantity"), // Получаем элемент класса quantity, в котором содержится количество
                                                                // билетов, переданного в качестве аргумента элемента
          btnPlus = ticketsElement.querySelector(".tickets__btn_more"),// Получаем элемент локальной кнопки +
          btnMinus = ticketsElement.querySelector(".tickets__btn_less");// Получаем элемент локальной кнопки -
    let localAmount = quantity.textContent; // Получаем текстовое содержимое, равное количеству билетов локального элемента
    
    switch (total) { // Конструкция Switch, для отслеживания общего количества билетов,
        case 0:
            localAmount++; // Увеличиваем локальное количество билетов на 1
            quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента

            const [totalCost0, sumValue0] = calculations(); // Производим необходимые вычисления
            sumValueEl.dataset.value = sumValue0; // Присваиваем полученное значение дата-атрибуту value 
            totalCostEl.dataset.cost = totalCost0; // Присваиваем полученное значение дата-атрибуту cost 
            sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
            totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
            btnPlus.classList.remove("shaded"); // Убираем, если имеется, класс shaded у кнопки +
            btnMinus.classList.remove("shaded"); 
            addEl(ticketsElement)
            break;
        case 1:
        case 2:
            localAmount++; // Увеличиваем локальное количество билетов на 1
            quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента

            const [totalCost, sumValue] = calculations(); // Производим необходимые вычисления
            sumValueEl.dataset.value = sumValue; // Присваиваем полученное значение дата-атрибуту value 
            totalCostEl.dataset.cost = totalCost; // Присваиваем полученное значение дата-атрибуту cost 
            sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
            totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
            btnPlus.classList.remove("shaded"); // Убираем, если имеется, класс shaded у кнопки +
            btnMinus.classList.remove("shaded");
            addEl(ticketsElement)
            break;
            
        case 3:  // В случае когда, общее количество билетов меньше 4, совершаем действия
            localAmount++; // Увеличиваем локальное количество билетов на 1
            quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента

            const [tCost, sValue] = calculations(); // Производим необходимые вычисления
            sumValueEl.dataset.value = sValue; // Присваиваем полученное значение дата-атрибуту value 
            totalCostEl.dataset.cost = tCost; // Присваиваем полученное значение дата-атрибуту cost 
            sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
            totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
            btnMinus.classList.remove("shaded");
            addShadePlus()
            addEl(ticketsElement)
            break;

        case 4:
            break

        default:
            console.log('def')
            break;
    }
};

const checkMinus = (ticketsElement) =>{ // Функция проверки при нажатии на кнопку -
    const total = Number(sumValueEl.dataset.value), // Получаем значение дата-атрибута общего количества билетов, 
                                                    // при нажатии кнопки в константу
          quantity = ticketsElement.querySelector(".quantity"), // Получаем элемент класса quantity, в котором содержится количество
                                                                // билетов, переданного в качестве аргумента элемента
          btnPlus = ticketsElement.querySelector(".tickets__btn_more"),// Получаем элемент локальной кнопки +
          btnMinus = ticketsElement.querySelector(".tickets__btn_less");// Получаем элемент локальной кнопки -
    let localAmount = quantity.textContent; // Получаем текстовое содержимое, равное количеству билетов локального элемента

    switch (total) { // Конструкция Switch, для отслеживания общего количества билетов,
        case 0:
            break;
        case 1:
            

            if (localAmount <= 0) {
                console.log("negative amount")
            }
            else{
                localAmount--; // Уменьшаем локальное количество билетов на 1
                quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                const [totalCost1, sumValue1] = calculations(); // Производим необходимые вычисления
                sumValueEl.dataset.value = sumValue1; // Присваиваем полученное значение дата-атрибуту value 
                totalCostEl.dataset.cost = totalCost1; // Присваиваем полученное значение дата-атрибуту cost 
                sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                addShadeMinus()
                removeEl(ticketsElement)
            }
            
            break;
        case 2:
        case 3: 
            if (localAmount <= 0) {
                console.log("negative amount")
                btnMinus.classList.add("shaded");
            }
            else{
                localAmount--; // Уменьшаем локальное количество билетов на 1

                if (localAmount == 0) {
                    btnMinus.classList.add("shaded");
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost, sumValue] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                    removeEl(ticketsElement)
                }
                else{
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost, sumValue] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в 
                    removeEl(ticketsElement)
                }
                
            }
            break
        
        case 4:
            if (localAmount <= 0 ) {
                console.log("negative amount")
                btnMinus.classList.add("shaded");
            }
            else{
                localAmount--; // Уменьшаем локальное количество билетов на 1

                if (localAmount == 0) {
                    btnMinus.classList.add("shaded");
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost4, sumValue4] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue4; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost4; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                    removeShadePlus()
                    removeEl(ticketsElement)
                }
                else{
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost4, sumValue4] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue4; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost4; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                    removeShadePlus()
                    removeEl(ticketsElement)
                }
            }
            break

        default:
            console.log('def')
            break;
    }
};

const checkMinusWithoutRemove = (ticketsElement) =>{ // Функция проверки при нажатии на кнопку - , но без удаления элемента в списке билетов
    const total = Number(sumValueEl.dataset.value), // Получаем значение дата-атрибута общего количества билетов, 
                                                    // при нажатии кнопки в константу
          quantity = ticketsElement.querySelector(".quantity"), // Получаем элемент класса quantity, в котором содержится количество
                                                                // билетов, переданного в качестве аргумента элемента
          btnPlus = ticketsElement.querySelector(".tickets__btn_more"),// Получаем элемент локальной кнопки +
          btnMinus = ticketsElement.querySelector(".tickets__btn_less");// Получаем элемент локальной кнопки -
    let localAmount = quantity.textContent; // Получаем текстовое содержимое, равное количеству билетов локального элемента

    switch (total) { // Конструкция Switch, для отслеживания общего количества билетов,
        case 0:
            break;
        case 1:
            

            if (localAmount <= 0) {
                console.log("negative amount")
            }
            else{
                localAmount--; // Уменьшаем локальное количество билетов на 1
                quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                const [totalCost1, sumValue1] = calculations(); // Производим необходимые вычисления
                sumValueEl.dataset.value = sumValue1; // Присваиваем полученное значение дата-атрибуту value 
                totalCostEl.dataset.cost = totalCost1; // Присваиваем полученное значение дата-атрибуту cost 
                sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                addShadeMinus()
                
            }
            
            break;
        case 2:
        case 3: 
            if (localAmount <= 0) {
                console.log("negative amount")
                btnMinus.classList.add("shaded");
            }
            else{
                localAmount--; // Уменьшаем локальное количество билетов на 1

                if (localAmount == 0) {
                    btnMinus.classList.add("shaded");
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost, sumValue] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                    
                }
                else{
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost, sumValue] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в 
                    
                }
                
            }
            break
        
        case 4:
            if (localAmount <= 0 ) {
                console.log("negative amount")
                btnMinus.classList.add("shaded");
            }
            else{
                localAmount--; // Уменьшаем локальное количество билетов на 1

                if (localAmount == 0) {
                    btnMinus.classList.add("shaded");
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost4, sumValue4] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue4; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost4; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                    removeShadePlus()
                    
                }
                else{
                    quantity.textContent = localAmount; // Передаем измененное количество билетов в текстовое содержимое элемента
                    const [totalCost4, sumValue4] = calculations(); // Производим необходимые вычисления
                    sumValueEl.dataset.value = sumValue4; // Присваиваем полученное значение дата-атрибуту value 
                    totalCostEl.dataset.cost = totalCost4; // Присваиваем полученное значение дата-атрибуту cost 
                    sumValueEl.textContent = `${sumValueEl.dataset.value} tickets:`; // Выводим количество билетов из дата-атрибута в строку
                    totalCostEl.textContent = `${totalCostEl.dataset.cost}$`; // Выводим стоимость билетов из дата-атрибута в строку
                    removeShadePlus()
                    
                }
            }
            break

        default:
            console.log('def')
            break;
    }
};

function addEl(ticketsElement) { // Функция добавления билета в список билетов
    const message = ticketsElement.querySelector(".element__name").textContent; // Сохраняем в переменную тестовое содержимое нужного билета
          // Ниже представлен конструктор добавляемого элемента страницы
    let constructionEl = `<div class="tickets-container__choosen-ticket ${message}"> 
                            <svg class="modal__close modal__close-min">
                                <use  xlink:href="#cross"></use>
                            </svg>
                            <span class="choosen-ticket__name no-selection">${message}</span>
                        </div>`;
    container.insertAdjacentHTML("beforeend", constructionEl); // Вставляем созданный элемент в конец контейнера 
};

function removeEl(ticketsElement) { // Функция удаления билета из списка билетов, используется при нажатии на кнопку -
    const message = ticketsElement.querySelector(".element__name").textContent, // Сохраняем в переменную тестовое содержимое нужного билета
          elementsList = modal.querySelectorAll(".tickets-container__choosen-ticket"); // Сохраняем список элементов, содержащихся в контейнере билетов
    let el = elementsList; // Просто объявляем переменную перед циклом
    for (let index = 0; index < elementsList.length; index++) { // Проходимся по всем элементам списка и отбираем 
        if(elementsList[index].querySelector('.choosen-ticket__name').textContent == message ){ // элементы, в котором текстовое содержимое совпадает с переменной message
            el = elementsList[index] 
        };
    }
    el.remove(); // Удаляем выбранный ранее элемент 
}

container.addEventListener("click", function (e){ // Функция удаления билета из списка билетов, используется при нажатии на крестик
    if (e.target.closest(".modal__close-min")) { // Проверяем, что нажали именно на крестик
        const target = e.target.closest(".tickets-container__choosen-ticket"), // Сохраняем элемент, по которому кликнули
              message = target.querySelector(".choosen-ticket__name").textContent; // Текстовое содержимое нужного элемента сохраняем в переменную

        let el = ticketEl; // Просто объявляем переменную перед циклом
        for (let index = 0; index < ticketEl.length; index++) { // Проходимся по всем элементам списка и отбираем 
            if(ticketEl[index].querySelector(".element__name").textContent == message){ // элементы, в котором текстовое содержимое совпадает с переменной message
                el = ticketEl[index]; 
            }
        }
        checkMinusWithoutRemove(el)// Вызываем функцию БЕЗ удаления элемента
        e.target.closest(".tickets-container__choosen-ticket").remove(); // Удаляем билет из списка
    }
})

modal.addEventListener("click", (event) => {
    
    if (event.target.classList.contains('minus')) {  
        checkMinus(event.target.closest('.tickets__element'));
    }
    if (event.target.classList.contains('plus')) {
        checkPlus( event.target.closest('.tickets__element'));
}});

// Мини модальное окно

const modalMini = document.querySelector(".modal-mini"),
      btnOpen = document.querySelector(".footer__continue-btn");


btnOpen.addEventListener('click', function(e){
    modalMiniOpen();
    e.preventDefault();
});   

function modalMiniOpen(){
        modalMini.classList.add('open')
};

function modalCloseMini(modalWindow){
    const elementsList = modal.querySelectorAll(".tickets-container__choosen-ticket");
    modalWindow.classList.remove('open');
    document.removeEventListener('wheel', prevent);
};

const closeBack = document.querySelectorAll(".back");
if(closeBack.length > 0){
    for (let index = 0; index < closeBack.length; index++) {
        const el = closeBack[index];

        el.addEventListener('click', function(e){
            modalCloseMini(el.closest('.modal-window'));
            e.preventDefault();
        });
    };
};