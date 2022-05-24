$(function() {
    $(".events__content").slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,

    });
  });

$(function() {
    $(".gallary-modal").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,

    });
});