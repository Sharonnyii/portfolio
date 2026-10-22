// Short-keyframe WebM/MP4 scrubbed by scroll; no competing autoplay loop.
(function(){
 var section=document.getElementById('previous'),video=document.getElementById('skillsReel');if(!section||!video)return;
 var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

 var target=0,visible=false,raf=0,lastSeek=0,ready=false;
 function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
 function progress(){var r=section.getBoundingClientRect();return clamp(-r.top/Math.max(1,section.offsetHeight-innerHeight),0,1);}
 function seek(t){
  raf=0;if(!visible||!ready||document.hidden||reduced)return;
  var seconds=target*Math.max(0,video.duration-1/24),difference=seconds-video.currentTime;
  if(Math.abs(difference)<1/28)return;
  if(!video.seeking&&t-lastSeek>45){lastSeek=t;video.currentTime=clamp(video.currentTime+difference*(Math.abs(difference)>1?.8:.5),0,video.duration-1/24);}
  raf=requestAnimationFrame(seek);
 }
 function run(){if(visible&&ready&&!document.hidden&&!reduced&&!raf)raf=requestAnimationFrame(seek);else if((!visible||document.hidden)&&raf){cancelAnimationFrame(raf);raf=0;}}
 window.updateSkillReel=function(p){target=p;section.style.setProperty('--reel-turn',reduced?'0deg':((p-.5)*10).toFixed(2)+'deg');run();};
 function loaded(){ready=Number.isFinite(video.duration)&&video.duration>0;video.pause();target=progress();run();}
 video.addEventListener('loadeddata',loaded);video.addEventListener('loadedmetadata',function(){ready=Number.isFinite(video.duration)&&video.duration>0;});
 new IntersectionObserver(function(es){visible=es[0].isIntersecting;video.pause();if(visible)window.updateSkillReel(progress());else run();},{rootMargin:'120px'}).observe(section);
 document.addEventListener('visibilitychange',run);addEventListener('resize',function(){window.updateSkillReel(progress());});
 if(video.readyState>=2)loaded();
})();
