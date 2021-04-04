document.addEventListener('DOMContentLoaded', function() {
  
  document.querySelectorAll('button').forEach(function(button) {
      button.onclick = function() {
        document.querySelector('#Feeling').style.color = button.dataset.color;
      }
    })

  document.querySelector('select').onchange = function() {
    document.querySelector('#yep').style.color = this.value;
  }  

});

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    document.querySelector('body').style.background = 'white';
  } else {
    document.querySelector('body').style.background = '#c4f8de';
  }
}