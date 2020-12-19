class Storage {
  static addToLocalStorage = function (data) {
    localStorage.clear();
    const dataJSON = JSON.stringify(data);
    localStorage.setItem("flash-questions", dataJSON);
  };
  static retrieveLocalStorgage = function () {
    let savedQuestions = localStorage.getItem("flash-questions");
    if (savedQuestions) {
      const savedQuestionsParsed = JSON.parse(savedQuestions);
      return savedQuestionsParsed;
    } else {
      return (savedQuestions = []);
    }
  };
}
