const showBtn = document.getElementById("show-btn");
const questionCard = document.querySelector(".question-card");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("question-form");
const feedback = document.querySelector(".feedback");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const questionList = document.getElementById("questions-list");

let id;

let data = Storage.retrieveLocalStorgage();

if (data.length > 0) {
  id = data[data.length - 1].id + 1;
} else {
  id = 1;
}
data.forEach(function (question) {
  QuestionManager.addQuestion(questionList, question);
});

showBtn.addEventListener("click", function () {
  QuestionManager.showQuestion(questionCard);
});

closeBtn.addEventListener("click", function () {
  QuestionManager.hideQuestion(questionCard);
});

questionList.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.classList.contains("delete-flashcard")) {
    let id = event.target.dataset.id;

    questionList.removeChild(
      event.target.parentElement.parentElement.parentElement
    );
    // rest of data
    let tempData = data.filter(function (item) {
      return item.id !== parseInt(id);
    });
    data = tempData;
    Storage.addToLocalStorage(data);
  } else if (event.target.classList.contains("show-answer")) {
    event.target.nextElementSibling.classList.toggle("showItem");
  } else if (event.target.classList.contains("edit-flashcard")) {
    //delete question from DOM
    let id = event.target.dataset.id;
    questionList.removeChild(
      event.target.parentElement.parentElement.parentElement
    );
    //show question in question card
    QuestionManager.showQuestion(questionCard);
    //find specific question clicked
    const tempQuestion = data.filter(function (item) {
      return item.id === parseInt(id);
    });
    // rest of data
    let tempData = data.filter(function (item) {
      return item.id !== parseInt(id);
    });
    data = tempData;
    answerInput.value = tempQuestion[0].answer;
    questionInput.value = tempQuestion[0].title;
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const questionValue = questionInput.value;
  const answerValue = answerInput.value;

  if (questionValue === "" || answerValue === "") {
    feedback.classList.add("showItem", "alert-danger");
    feedback.textContent = "cannot add empty values";

    setTimeout(function () {
      feedback.classList.remove("showItem", "alert-danger");
    }, 2000);
  } else {
    const question = new Question(id, questionValue, answerValue);
    data.push(question);
    Storage.addToLocalStorage(data);
    id++;
    QuestionManager.addQuestion(questionList, question);
    QuestionManager.clearFields(questionInput, answerInput);
  }
});
