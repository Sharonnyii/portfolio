(function(){
 var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var intro=document.querySelector('.intro-atmosphere'),project=document.querySelector('.project-atmosphere video'),dialog=document.getElementById('proj'),introVisible=false;
 function playback(v,on){if(!v)return;if(on&&!document.hidden&&!reduced){var p=v.play();if(p)p.catch(function(){});}else v.pause();}
 function update(){playback(intro,introVisible);playback(project,dialog&&!dialog.hidden);}
 var seq=document.getElementById('seq');if(seq)new IntersectionObserver(function(e){introVisible=e[0].isIntersecting;update();},{threshold:0}).observe(seq);
 if(dialog)new MutationObserver(update).observe(dialog,{attributes:true,attributeFilter:['hidden']});
 document.addEventListener('visibilitychange',update);update();
})();
