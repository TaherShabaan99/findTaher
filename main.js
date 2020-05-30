//Typing effect 
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.textElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0; /*array starts at 0 too*/
    this.wait = parseInt(wait, 10); /* making sure that wait is number and it's gonna be base 10*/
    this.type(); // main meathod that will does everything
    this.isDeleting = false; //will be true when is the word is going background and it'll be true
  }
  //Type Method
  type() {
    //Current index of the word
    const current = this.wordIndex % this.words.length;
    //Get the actual word 
    const fullTxt = this.words[current];
    //Checking for deleting and adding the words
    if (this.isDeleting) {
      //Remove each character of the word
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else {
      //add the each character that will form the word
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //Insert txt into element
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    //Type speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    //If word is complete
    if (!this.isDeleting && this.txt == fullTxt) {
      // to pause at the end
      typeSpeed = this.wait;
      //set delete to true
      this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt == '') {
      this.isDeleting = false;
      //Mov to the next word
      this.wordIndex++;
      // then wait a bit till we type again
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    
  const txtElement = document.querySelector('.txt-type');
  //JSON.parse was used to be work in javascript otherwise it's just like a string
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //Init TypeWriter
  new TypeWriter(txtElement, words, wait);
    
}

//Smooth Scrolling(JQuery)

$('#navbar a, .btn').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
        scrollTop: $(hash).offset().top - 100
      },
      900
    );
  }
})
