function findQuestion(clonedElement) {
  const questions = $(".accordion-item > div.accordion-header > p");
  const element = $(
    questions.filter(function () {
      return (
        $(this).text().split(/\s+/).join(" ").trim() ==
        $(clonedElement).text().split(/\s+/).join(" ").trim()
      );
    })
  ).get(0);

  scrollIntoView(element);
}

function scrollIntoView(element) {
  if (element) {
    const parentLiElement = $(element).parents(".accordion-item").get(0);
    $(parentLiElement).addClass("open");

    $("html, body")
      .stop(true, true)
      .animate(
        {
          scrollTop: $(".accordion-item.open").offset().top,
        },
        1200,
        "easeOutCubic"
      );
  }
}
