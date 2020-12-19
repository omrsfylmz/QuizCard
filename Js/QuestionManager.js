class QuestionManager {
  static showQuestion = function (element) {
    element.classList.add("showItem");
  };
  static hideQuestion = function (element) {
    element.classList.remove("showItem");
  };
  static addQuestion = function (element, question) {
    const div = document.createElement("div");

    div.classList.add("col-md-4");
    div.innerHTML = `<div class="card card-body flashcard my-3">
        <h4 class="text-capitalize">${question.title}</h4>
        <a href="#" class="text-capitalize my-3 show-answer">Show/Hide Answer</a>
        <h5 class="answer mb-3">${question.answer}</h5>
        <div class="flashcard-btn d-flex justify-content-between">
   
         <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
         <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
        </div>
       </div>`;
    element.appendChild(div);
  };
  static clearFields = function (question, answer) {
    question.value = "";
    answer.value = "";
  };
}
