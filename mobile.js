(function(){
 var phone=matchMedia('(max-width:760px)');
 function tune(){
  document.documentElement.classList.toggle('phone-layout',phone.matches);
  document.querySelectorAll('.hx-media').forEach(function(el){el.setAttribute('aria-label',el.getAttribute('aria-label')||'Open project');});
 }
 phone.addEventListener('change',tune);tune();
})();
