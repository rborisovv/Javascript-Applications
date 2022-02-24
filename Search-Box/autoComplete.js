function autoComplete() {
  const questions = document.querySelectorAll(
    ".accordion-item > div.accordion-header > p"
  );
  const accordionItems = document.querySelector(".faq-accordion").children;
  const searchBox = document.querySelector(".search-box");
  const input = searchBox.value.toLowerCase();
  const autoCompleteUl = document.querySelector(".auto-complete");

  if (input.length == 0) {
    autoCompleteUl.innerHTML = "";
    searchBox.style.borderColor = "black";
    clearListBorder();
    resetOpenedCards();
    return;
  }

  try {
    findSearchedNodes();
  } catch (error) {}

  function findSearchedNodes() {
    const searchedNodes = [];
    [...questions].forEach((question) => {
      if (question.textContent.toLowerCase().includes(input)) {
        searchedNodes.push(question);
      }
    });

    if (searchedNodes.length == 0) {
      searchBox.style.borderColor = "red";
      return;
    }

    searchBox.style.borderColor = "black";
    autoCompleteUl.innerHTML = "";

    decorateNodes(searchedNodes);
  }

  function decorateNodes(searchedNodes) {
    autoCompleteUl.style.border = "2px solid black";
    autoCompleteUl.style.borderRadius = "8px";

    searchedNodes.forEach((node) => {
      const clonedNode = node.cloneNode();
      clonedNode.textContent = node.textContent;
      clonedNode.style.cursor = "pointer";
      highlightText(clonedNode, input);

      function highlightText(clonedNode, input) {
        const regExp = new RegExp("(" + input + ")", "gi");
        clonedNode.innerHTML = clonedNode.textContent.replace(
          regExp,
          "<span class='green'>" + "$1" + "</span>"
        );
      }

      const li = document.createElement("li");
      li.appendChild(clonedNode);
      li.addEventListener("click", function (ev) {
        let node = ev.target;
        if (node.tagName.toLowerCase() == "span") {
          node = node.parentNode;
        }
        resetOpenedCards();
        findSearchedQuestion(questions, node);
      });

      autoCompleteUl.appendChild(li);
    });
  }

  function resetOpenedCards() {
    [...accordionItems]
      .filter((item) => item.classList.contains("open"))
      .forEach((item) => item.classList.remove("open"));
  }

  function clearListBorder() {
    autoCompleteUl.style.border = "";
    autoCompleteUl.style.borderRadius = "";
  }
}

function findSearchedQuestion(questions, clonedNode) {
  const element = [...questions].find(
    (question) =>
      question.textContent.split(/\s+/).join(" ").trim() ==
      clonedNode.textContent.split(/\s+/).join(" ").trim()
  );

  if (element) {
    const parentLiNode = element.parentNode.parentNode;
    element.scrollIntoView({ behavior: "smooth" });
    parentLiNode.classList.add("open");
  }
}

// function scrollIntoView(element) {
//   const parentLiNode = $(element).parents(".accordion-item").get(0);
//   $(parentLiNode).addClass("open");
//   $("html, body")
//     .stop(true, true)
//     .animate(
//       {
//         scrollTop: $(".accordion-item.open").offset().top,
//       },
//       1200,
//       "easeOutCubic"
//     );
