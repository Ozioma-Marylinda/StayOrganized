const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('submit', (e) => {
e.preventDefault();

const feedbackEmailInput = document.querySelector('.feedback-email');
const feedbackAgeInput = document.querySelector('.feedback-age');
const feedbackMsgInput = document.querySelector('.feedback-text');

const feedbackEmailError = document.querySelector(".feedbackEmail-error");
const feedbackAgeError = document.querySelector(".feedbackAge-error");
const feedbackMsgError = document.querySelector(".feedbackMsg-error");

 const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[A-Za-z]{2,7}$/;

if (!emailRegex.test(feedbackEmailInput.value.trim())) {
  feedbackEmailError.textContent = "Enter a valid email address";
} else {
  feedbackEmailError.textContent = '';
}

const age = Number(feedbackAgeInput.value);

if (isNaN(age) || age < 18 || age > 99) {
  feedbackAgeError.textContent = 'Age must be between 18 & 99';
} else {
  feedbackAgeError.textContent = '';
}

const WordCount = feedbackMsgInput.value.trim().split(/\s+/).filter(Boolean).length;

if (WordCount > 100) {
  feedbackMsgError.textContent = 'Words must not be above 100';
} else if (feedbackMsgInput.value.length > 5000) {
  feedbackMsgError.textContent = "Message must not be above 5000 charcters";
} 

});
  
