(function(){
  var loader=document.getElementById('siteLoader');if(!loader)return;
  var root=document.documentElement,started=performance.now(),finished=false;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function finish(){
    if(finished)return;finished=true;clearTimeout(window.__loaderSafety);clearTimeout(deadline);
    window.removeEventListener('portfolio-model-ready',ready);
    var hadFocus=loader.contains(document.activeElement);
    loader.classList.add('is-leaving');
    setTimeout(function(){root.classList.remove('site-loading');loader.remove();if(hadFocus){var link=document.querySelector('.top-symbol');if(link)link.focus({preventScroll:true});}},reduced?160:680);
  }
  function ready(){setTimeout(finish,Math.max(0,(reduced?100:900)-(performance.now()-started)));}
  var deadline=setTimeout(finish,4500);
  loader.querySelector('.loader-skip').addEventListener('click',finish);
  window.addEventListener('portfolio-model-ready',ready,{once:true});
  if(window.__portfolioModelReady)ready();
  // The video can provide a complete landing even when the model cannot load.
  var hero=document.querySelector('video[src="hero-bg.webm"]');
  if(hero){if(hero.readyState>=2)ready();else hero.addEventListener('loadeddata',ready,{once:true});}
})();
