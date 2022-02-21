function autoComplete() {
  const questions = $(".accordion-item > div.accordion-header > p");
  const questionsLi = $(".faq-accordion").children();
  const input = $(".search-box").val().toLowerCase();
  const autoCompleteUl = $(".auto-complete");

  if (input.length == 0) {
    $(autoCompleteUl).empty();
    autoCompleteUl.css("border", "");
    autoCompleteUl.css("border-radius", "");
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
      autoCompleteUl.css("border", "");
      autoCompleteUl.css("border-radius", "");
    }

    $(autoCompleteUl).empty();

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
}

// Jquery has in-build function for autocomplete