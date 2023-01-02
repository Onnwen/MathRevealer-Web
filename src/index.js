import {MathFunction} from "./Algorithms/Function/MathFunction";
import $ from "jquery";
import anime from "animejs";

let functionData = new MathFunction("");
let originalWidth = 0;
let showRevealButton = false;

let searchField = $("#searchField");

$(window).on('load', function () {
    let revealButtonDiv = $("#revealButtonDiv");
    originalWidth = revealButtonDiv.width();
    revealButtonDiv.css("width", 0);
    revealButtonDiv.hide();
});

$(document).on('click', '.mathResultCardEnlargeButton', function (event) {
    changeCardSize($(this).attr('id'));
});

searchField.on("keyup", function () {
    functionData.parse(String(searchField.val()));
    $("#preview, #resultPreview").html((searchField.val() !== "" ? "y = " : "") + functionData.getHtml());

    // To-Fix: Genera log errore. (Era utilizzato per visualizzato correttamente i tooltip)
    // $("body").tooltip({selector: '[data-toggle=tooltip]'});

    revealButtonVisibility();
});

$(".revealButton").each(function () {
    $(this).on("click", function () {
        let cardsHtml = "";
        functionData.getResults().forEach(result => {
            cardsHtml += result.getHtml();
        })
        $("#cards").html(cardsHtml);
        MathJax.typesetPromise()
        $("#searchFormDiv").hide();
        $("#resultDiv").show("slow", function () {
        });

        $.post("https://mathrevealer.garamante.it/api/myAccount/saveExpression", {
            expression: searchField.val()
        });
    });
});

$("#backButton").on("click", function () {
    $("#searchFormDiv").show();
    $("#resultDiv").hide();
});

function revealButtonVisibility() {
    $(".revealButtonDiv").each(function () {
        showRevealButton = searchField.val() !== "";

        if (showRevealButton && $(this).width() === 0) {
            $(this).show();
            $(this).animate({
                width: originalWidth,
                opacity: "1"
            }, 1000);
        } else if (!showRevealButton && $(this).width() !== 0) {
            $(this).animate({
                width: "0",
                opacity: "0"
            }, 500, function () {
                $(this).hide();
            });
        }
    });
}

function changeCardSize(cardButtonId) {
    let cardIcon = $("#" + cardButtonId + "SizeIcon");
    let card = $("#" + cardButtonId.slice(0, -6));
    let cardsGrid = $("#cards");

    let animationDuration = 1000;
    let animationLine = 'easeInOutCubic';

    if (cardIcon.attr('class') === "bi bi-arrows-angle-expand") {
        functionData.getResults().forEach(result => {
            if (result.title + "CardButton" !== cardButtonId) {
                let card = $("#" + result.title + "Card")
                anime({
                    targets: card.get(0),
                    height: '0px',
                    borderRadius: '0px',
                    opacity: '0',
                    width: '0%',
                    padding: '0',
                    margin: '0',
                    borderWidth: '0',
                    easing: animationLine,
                    duration: animationDuration,
                    complete: function () {
                        card.hide();
                    }
                })
            }
        });

        anime({
            targets: card.get(0),
            height: '600px',
            width: '100%',
            margin: '0%',
            easing: animationLine,
            duration: animationDuration
        })

        cardIcon.removeClass("bi-arrows-angle-expand");
        cardIcon.addClass("bi-arrows-angle-contract");
    } else {
        functionData.getResults().forEach(result => {
            let card = $("#" + result.title + "Card");
            card.show();
            anime({
                targets: card.get(0),
                height: '300px',
                borderRadius: '20px',
                opacity: '1',
                width: '30%',
                margin: '1%',
                padding: '20px',
                borderWidth: '2px',
                easing: animationLine,
                duration: animationDuration
            })
        });
        cardIcon.removeClass("bi-arrows-angle-contract");
        cardIcon.addClass("bi-arrows-angle-expand");
    }
}

let cards = $('.expandable');
let position = 0;
let width = 0;
let height = 0;

$(document).on('click', '.expandable', function () {
    if ($(this).hasClass("fullscreen")) {
        const self = this
        cards.removeClass("background-card");
        $(this).removeClass("big");

        anime({
            targets: this,
            width: width,
            height: height,
            top: position.top,
            left: position.left,
            padding: 20,
            easing: 'easeInOutQuad',
            duration: 800,
            complete: function () {
                $(self).css({top: "", left: "", width: "", height: "", padding: ""});
                removeDuplicate();
                // To-Fix: Rimettere classe expandable solo alle card che l'avevano, non a tutte.
                cards.addClass("expandable");
                $(self).removeClass("fullscreen");
            }
        });
    } else {
        duplicate($(this).attr('id'))

        cards.removeClass("expandable");
        $(this).addClass("expandable");

        position = $(this).position();
        height = $(this).outerHeight();
        width = $(this).outerWidth();

        $(this).css(position);
        $(this).addClass("fullscreen");
        $(this).addClass("big");
        $(this).css({width: width, height: height});

        const self = this;

        anime({
            targets: this,
            width: $(this).parent().width() - 20,
            height: $(this).parent().height() - 20,
            top: 0,
            left: 0,
            easing: 'easeInOutQuad',
            duration: 800,
            padding: 30,
            begin: function () {
                cards.addClass("background-card");
                $(self).removeClass("background-card");
            }
        });
    }
});

function duplicate(cardId) {
    const card = $(`#${cardId}`);
    const nextCard = card.next();
    if (nextCard.length !== 0) {
        nextCard.replaceWith(`<div class="mathResultCard" id="${cardId}copy">${card.html()}</div>` + `<div class="mathResultCard ${nextCard.hasClass("expandable") ? "expandable" : "" }" id="${nextCard.attr('id')}">${nextCard.html()}</div>`);
    }

    cards = $('.mathResultCard');
}

function removeDuplicate() {
    $('.mathResultCard').each(function () {
        if ($(this).attr('id').includes('copy')) {
            $(this).remove();
        }
    });

    cards = $('.mathResultCard');
}