//Контейнер слайдера
var slider = document.getElementById("slider");
        
//Кружок тумблера со значением
var thumbValue = document.getElementById("thumbValue");

//Область поверх тумблера, перекрывающая текст
var thumb = document.getElementById("thumb");

//Добавить событие при клике на тумблер
//При движении мыши вызывать функцию moveThumb
//При отпускании клавиши мыши вызвать функцию releaseThumb
thumb.addEventListener("mousedown", function(event) {
    document.addEventListener("mousemove", moveThumb);
    document.addEventListener("mouseup", releaseThumb);
});

//Сдвинуть тумблер
function moveThumb(event) {
    //Получить координаты левого края слайдера по оси X
    var sliderLeftEdge = slider.getBoundingClientRect().left;

    //Получить координаты правого края слайдера по оси X
    var sliderRightEdge = slider.offsetWidth - thumb.offsetWidth;

    //Значение отступа тумблера Слева 
    //Задается как разница между позицией мыши и началом слайдера
    //Например слайдер начинатся с X 50, а мышь находится на X 70
    //Разница будет 20
    var thumbLeft = event.pageX - sliderLeftEdge;

    //Если отступ вышел за левый край слайдера, задать равным нулю  
    if (thumbLeft < 0) {
        thumbLeft = 0;
    }

    //Если отступ вышел за правый край слейдера, задать значение правого края слайдера
    if (thumbLeft > sliderRightEdge) {
        thumbLeft = sliderRightEdge;
    }

    //Определить длину одного шага слайдера
    //Разделив длину слайдера на 10 шагов
    var step = sliderRightEdge / 10;

    //Определить значение тумблера, разделив отступ тумблера на длину шага слайдера
    var value = Math.round(thumbLeft / step) * 10;
    
    //Задать значение отступа в соответствии с шагом слайдера
    thumbLeft = (value / 100) * sliderRightEdge;

    //Если значение тумблера равно 100, 
    //то сдвинуть его на 3 пикселя влево для корректного отображения
    if (value == 100){
        thumb.style.left = thumbLeft-3 + "px";
    }
    else{
        thumb.style.left = thumbLeft + "px";
    }

    //Отображение значения внутри кружка тумблера
    thumb.innerHTML = value;
}

//Отпустить тумблер
function releaseThumb() {
    //Удалить события со страницы, вызывающие функции тумблера
    document.removeEventListener("mousemove", moveThumb);
    document.removeEventListener("mouseup", releaseThumb);
}