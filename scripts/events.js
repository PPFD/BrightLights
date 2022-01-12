const events = document.querySelector(".events__content");

for (let i = 0; i < allEvents.length; i++) {
    let eventItem = `<div class="events__content__element">
                        <img class="events__content__element__img" src="media/images/${allEvents[i].src}.png" alt="">
                        <p class="events__content__element__location">${allEvents[i].location}</p>
                        <p class="events__content__element__club">${allEvents[i].name}</p>
                        <div class="events__content__element__container">
                            <p class="events__content__element__container__date">${allEvents[i].date}</p>
                            <button index="${i}"  class="events__content__element__container__btn modal-link">
                                <span>tickets</span>
                            </button>
                        </div>
                    </div>`;
    events.insertAdjacentHTML("beforeend", eventItem);
}
      