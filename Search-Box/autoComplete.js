function autoComplete() {
  const questions = $(".accordion-item > div.accordion-header > p");
  const questionsLi = $(".faq-accordion").children();
  const searchBox = $(".search-box");
  const input = searchBox.val().toLowerCase();
  const autoCompleteUl = $(".auto-complete");

  if (input.length == 0) {
    $(autoCompleteUl).empty();
    searchBox.css("border-color", "black");
    clearListBorder();
    resetOpenedCards();
    return;
  }

  try {
    $(input).on("change", findAutoCompleteNodes(questions, input));
  } catch (error) {}

  function findAutoCompleteNodes(questions, input) {
    const autoCompleteElements = [];
    $(questions).each(function () {
      if ($(this).text().toLowerCase().includes(input)) {
        autoCompleteElements.push(this);
      }
    });

    if (autoCompleteElements.length == 0) {
      searchBox.css("border-color", "red");
      return;
    }

    searchBox.css("border-color", "black");
    $(autoCompleteUl).empty();

    decorateElements(autoCompleteElements);
  }

  function decorateElements(autoCompleteElements) {
    $(autoCompleteUl).css("border", "2px solid black");
    $(autoCompleteUl).css("border-radius", "8px");

    $(autoCompleteElements).each(function () {
      const clonedElement = $(this).clone();
      $(clonedElement).css("cursor", "pointer");
      highlightText(clonedElement, input);

      function highlightText(clonedElement, input) {
        const regExp = new RegExp("(" + input + ")", "gi");
        $(clonedElement).html(
          $(clonedElement)
            .text()
            .replace(regExp, "<span class='green'>" + "$1" + "</span>")
        );
      }

      $(autoCompleteUl).append(
        $("<li></li>")
          .click(function (ev) {
            let element = ev.target;
            if (element.tagName.toLowerCase() == "span") {
              element = $(element).parents("p");
            }
            resetOpenedCards();
            findQuestion(element);
          })
          .html(clonedElement)
      );
    });
  }

  function resetOpenedCards() {
    if ($(questionsLi).is(".open")) {
      $(questionsLi).removeClass("open");
    }
  }

  function clearListBorder() {
    autoCompleteUl.css("border", "");
    autoCompleteUl.css("border-radius", "");
  }
}
