(function(){
 var phone=matchMedia('(max-width:760px)');
 function tune(){
  document.documentElement.classList.toggle('phone-layout',phone.matches);
  document.querySelectorAll('.hx-media').forEach(function(el){el.setAttribute('aria-label',el.getAttribute('aria-label')||'Open project');});
 }
 var collect=document.querySelector('.reflection-collect');
 if(collect)collect.addEventListener('pointerup',function(e){if(!phone.matches||e.pointerType!=='touch'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;collect.classList.add('letters-falling');collect.setAttribute('aria-pressed','true');clearTimeout(collect.__mobileReset);collect.__mobileReset=setTimeout(function(){collect.classList.remove('letters-falling');collect.setAttribute('aria-pressed','false');},1100);});
 document.querySelectorAll('.hx-media').forEach(function(card){card.addEventListener('pointerdown',function(e){if(phone.matches&&e.pointerType==='touch')card.classList.add('touch-active');},{passive:true});function clear(){card.classList.remove('touch-active');}card.addEventListener('pointerup',clear);card.addEventListener('pointercancel',clear);});
 // Captions must remain independent of GLB loading and WebGL rendering.
 var journey=document.getElementById('journey'),chapters=[].slice.call(document.querySelectorAll('#journey .model-statement')),pending=0;
 function smooth(v){v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);}
 function updateJourney(){
  pending=0;if(!journey||!phone.matches)return;
  var pin=journey.querySelector('.jy-sticky'),rect=journey.getBoundingClientRect();
  var viewport=pin?pin.clientHeight:innerHeight;
  var progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,journey.offsetHeight-viewport)));
  chapters.forEach(function(el,i){
   var start=i/3,end=(i+1)/3;
   var enter=i===0?1:smooth((progress-start)/.045);
   var leave=1-smooth((progress-(end-.045))/.045);
   var opacity=enter*leave;
   el.style.setProperty('--phone-caption',opacity.toFixed(3));
  });
 }
 function requestJourney(){if(!pending)pending=requestAnimationFrame(updateJourney);}
 addEventListener('scroll',requestJourney,{passive:true});addEventListener('resize',requestJourney);addEventListener('pageshow',requestJourney);
 phone.addEventListener('change',requestJourney);updateJourney();
 phone.addEventListener('change',tune);tune();
})();
