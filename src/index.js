import {MathFunction} from "./Algorithms/Function/MathFunction";

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
    $("body").tooltip({selector: '[data-toggle=tooltip]'});

    revealButtonVisibility();
});

$(".revealButton").each(function () {
   $(this).on("click", function () {
           let cardsHtml = "";
           functionData.getResults().forEach(result => {
               cardsHtml += '<div class="col">' + result.getHtml() + '</div>';
           })
           $("#cards").html(cardsHtml);
           MathJax.typesetPromise()
           $("#searchFormDiv").hide();
           $("#resultDiv").show("slow", function () {
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