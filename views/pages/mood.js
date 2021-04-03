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