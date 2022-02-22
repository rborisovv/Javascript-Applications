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
    if ($(questionsLi).is(".open")) {
      $(questionsLi).removeClass("open");
    }
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
    autoCompleteElements.forEach((p) => {
      const clonedElement = $(p).clone();

      if ($(clonedElement).text().toLowerCase().indexOf(input) >= 0) {
        highlightText(clonedElement, input);

        function highlightText(clonedElement, input) {
          const regExp = new RegExp("(" + input + ")", "gi");
          $(clonedElement).html(
            $(clonedElement)
              .text()
              .replace(regExp, "<span class='green'>" + "$1" + "</span>")
          );
        }
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
