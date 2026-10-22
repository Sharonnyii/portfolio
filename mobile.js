(function(){
 var phone=matchMedia('(max-width:760px)');
 function tune(){
  document.documentElement.classList.toggle('phone-layout',phone.matches);
  document.querySelectorAll('.hx-media').forEach(function(el){el.setAttribute('aria-label',el.getAttribute('aria-label')||'Open project');});
 }
 var collect=document.querySelector('.reflection-collect');
 if(collect)collect.addEventListener('pointerup',function(e){if(!phone.matches||e.pointerType!=='touch'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;collect.classList.add('letters-falling');collect.setAttribute('aria-pressed','true');clearTimeout(collect.__mobileReset);collect.__mobileReset=setTimeout(function(){collect.classList.remove('letters-falling');collect.setAttribute('aria-pressed','false');},1100);});
 document.querySelectorAll('.hx-media').forEach(function(card){card.addEventListener('pointerdown',function(e){if(phone.matches&&e.pointerType==='touch')card.classList.add('touch-active');},{passive:true});function clear(){card.classList.remove('touch-active');}card.addEventListener('pointerup',clear);card.addEventListener('pointercancel',clear);});
 phone.addEventListener('change',tune);tune();
})();
