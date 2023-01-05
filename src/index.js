import {MathFunction} from "./Algorithms/Function/MathFunction";
import $ from "jquery";
import anime from "animejs";

let functionData = new MathFunction("");
let animatingRevealButton = false;

let searchField = $("#searchField");

$(window).on('load', function () {
    let revealButton = $("#revealButton");
    if (screen.width > 992) {
        // revealButton.css("width", "0%");
        // revealButton.hide();
    }
});

searchField.on("keyup", function () {
    functionData.parse(String(searchField.val()));
    $("#preview, #resultPreview").html((searchField.val() !== "" ? "y = " : "") + functionData.getHtml());

    // To-Fix: Genera log errore. (Era utilizzato per visualizzato correttamente i tooltip)
    // $("body").tooltip({selector: '[data-toggle=tooltip]'});

    if (screen.width > 992) {
        // revealButtonVisibility();
    }
});

$("#searchForm").on("submit",function(e) {
    e.preventDefault();

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

$("#backButton").on("click", function () {
    $("#searchFormDiv").show();
    $("#resultDiv").hide();
});

function revealButtonVisibility() {
    const revealButton = $("#revealButton");
    const showRevealButton = searchField.val() !== "";

    if (!animatingRevealButton) {
        if (showRevealButton && revealButton.width() === 0) {
            animatingRevealButton = true;
            revealButton.show();
            revealButton.animate({
                width: "25%",
                opacity: "1"
            }, 1000, function () {
                animatingRevealButton = false;
            });
            searchField.animate({
                width: "70%"
            }, 1000);
        } else if (!showRevealButton && revealButton.width() !== 0) {
            animatingRevealButton = true;
            revealButton.animate({
                width: "0%",
                opacity: "0"
            }, 500, function () {
                revealButton.hide();
                animatingRevealButton = false;
            });
            searchField.animate({
                width: "100%"
            }, 1000);
        }
    } else {
        setTimeout(revealButtonVisibility, 1000);
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
            },
            complete: function () {
                document.getElementById("resultPreview").scrollIntoView({behavior: "smooth", block: "nearest"});
            }
        });
    }
});

function duplicate(cardId) {
    const card = $(`#${cardId}`);

    card.after(`<div class="mathResultCard" id="${cardId}copy">${card.html()}</div>`);

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