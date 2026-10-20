(function(){
 var intro=document.querySelector('.intro-atmosphere'),project=document.querySelector('.project-atmosphere video'),dialog=document.getElementById('proj');
 var introVisible=false,workVisible=false,work=document.querySelector('.work-atmosphere');
 function play(v,on){if(!v)return;v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;if(on&&!document.hidden){var p=v.play();if(p)p.catch(function(){v.dataset.autoplayBlocked='true';});}else v.pause();}
 function update(){play(intro,introVisible);play(project,dialog&&!dialog.hidden);play(work,workVisible);}
 var seq=document.getElementById('seq');if(seq)new IntersectionObserver(function(e){introVisible=e[0].isIntersecting;update();},{rootMargin:'160px',threshold:0}).observe(seq);
 var workSection=document.getElementById("work");if(workSection)new IntersectionObserver(function(e){workVisible=e[0].isIntersecting;update();},{rootMargin:"160px"}).observe(workSection);
 [intro,project,work].forEach(function(v){if(v){v.addEventListener('loadeddata',update);v.addEventListener('canplay',update);}});
 if(dialog)new MutationObserver(update).observe(dialog,{attributes:true,attributeFilter:['hidden']});
 document.addEventListener('visibilitychange',update);
 document.addEventListener('pointerdown',update,{passive:true});document.addEventListener('keydown',update);
 update();
})();
