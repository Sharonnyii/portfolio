// Restrained pointer tilt and glare; animation pauses when cards are offscreen.
(function(){
 var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
 var cards=[].slice.call(document.querySelectorAll('.hx-media'));
 cards.forEach(function(card){
  var frame=card.querySelector('.hx-frame');if(!frame)return;
  card.classList.add('preview-effects');
  var beam=document.createElement('span');beam.className='preview-beam';beam.setAttribute('aria-hidden','true');frame.appendChild(beam);
  if(!fine||reduced)return;
  var glare=document.createElement('span');glare.className='preview-glare';glare.setAttribute('aria-hidden','true');frame.appendChild(glare);
  var raf=0,point=null,bounds=null;
  card.addEventListener('pointerenter',function(){bounds=card.getBoundingClientRect();});
  card.addEventListener('pointermove',function(e){point={x:e.clientX,y:e.clientY};if(raf)return;raf=requestAnimationFrame(function(){raf=0;if(!point||!bounds)return;var x=Math.max(0,Math.min(1,(point.x-bounds.left)/bounds.width)),y=Math.max(0,Math.min(1,(point.y-bounds.top)/bounds.height));card.style.setProperty('--tilt-x',((.5-y)*9).toFixed(2)+'deg');card.style.setProperty('--tilt-y',((x-.5)*9).toFixed(2)+'deg');card.style.setProperty('--glare-x',(x*100).toFixed(1)+'%');card.style.setProperty('--glare-y',(y*100).toFixed(1)+'%');card.classList.add('is-tilting');});},{passive:true});
  card.addEventListener('pointerleave',function(){point=null;bounds=null;if(raf){cancelAnimationFrame(raf);raf=0;}card.classList.remove('is-tilting');card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
 });
 if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('beam-visible',e.isIntersecting);});},{rootMargin:'60px'});cards.forEach(function(c){io.observe(c);});}else cards.forEach(function(c){c.classList.add('beam-visible');});
})();
