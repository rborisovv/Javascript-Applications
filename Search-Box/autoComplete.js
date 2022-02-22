function autoComplete() {
  const questions = $(".accordion-item > div.accordion-header > p");
  const questionsLi = $(".faq-accordion").children();
  const searchBox = $(".search-box");
  const input = searchBox.val().toLowerCase();
  const autoCompleteUl = $(".auto-complete");

  if (input.length == 0) {
    $(autoCompleteUl).empty();
    clearListBorder();
    if ($(questionsLi).is(".open")) {
      $(questionsLi).removeClass("open");
    }
    return;
  }

  $(input).on("change", findAutoCompleteNodes(questions, input));

  function findAutoCompleteNodes(questions, input) {
    const autoCompleteElements = [];
    $(questions).each(function () {
      if ($(this).text().toLowerCase().includes(input)) {
        autoCompleteElements.push(this);
      }
    });

    if (autoCompleteElements.length == 0) {
      searchBox.css("border-color", "red");
      // resetListBorder();
      return;
    }

    searchBox.css("border-color", "black");
    $(autoCompleteUl).empty();
    decorateElements(autoCompleteElements);
  }

  function decorateElements(autoCompleteElements) {
    autoCompleteElements.forEach((p) => {
      const clonedElement = $(p).clone();

      if ($(clonedElement).text().indexOf(input) >= 0) {
        $(clonedElement).html(
          $(clonedElement)
            .text()
            .replace(input, "<span class='green'>" + input + "</span>")
        );
      }

      $(clonedElement).css("cursor", "pointer");
      $(clonedElement).click(function (ev) {
        const element = ev.target;
        findQuestion(element);
      });
      $(autoCompleteUl).css("border", "2px solid black");
      $(autoCompleteUl).css("border-radius", "8px");
      $(autoCompleteUl).append($("<li></li>").html(clonedElement));
    });
  }

  function clearListBorder() {
    autoCompleteUl.css("border", "");
    autoCompleteUl.css("border-radius", "");
  }
}

// Jquery has in-build function for autocomplete

// See if i have to remove the border on falsy input, clear the list, or leave it as it is
