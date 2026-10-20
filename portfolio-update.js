// Original light-and-particle study. No performance footage is used.
(function(){
  var section=document.getElementById('light-prologue'), pin=section.querySelector('.light-prologue-pin');
  var canvas=document.getElementById('lightSnow'),ctx=canvas.getContext('2d');
  if(!ctx)return;
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,w=0,h=0,p=0,active=true,raf=0,last=0;
  var particles=Array.from({length:innerWidth<650?130:270},function(){return{x:Math.random(),y:Math.random(),z:.2+Math.random()*.8,phase:Math.random()*6.28};});
  function resize(){w=innerWidth;h=innerHeight;var d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);if(reduced)draw(0);}
  function draw(time){
    raf=0;var dt=last?Math.min((time-last)/1000,.04):.016;last=time;
    ctx.clearRect(0,0,w,h);
    particles.forEach(function(a){
      if(!reduced){a.x+=(.012+p*.12)*a.z*dt;a.y+=(.025+Math.sin(time*.0003+a.phase)*.012)*a.z*dt;if(a.x>1.1){a.x=-.1;a.y=Math.random();}if(a.y>1.1)a.y=-.1;}
      var x=a.x*w,y=a.y*h;var beam=Math.max(0,1-Math.abs(x/w-(.73-y/h*.35))/.24);
      ctx.fillStyle='rgba(231,233,255,'+((.12+beam*.7)*a.z*(1-p*.3))+')';
      ctx.beginPath();ctx.ellipse(x,y,.5+a.z*1.8,(.6+a.z*1.4)*(1+p),a.phase,0,Math.PI*2);ctx.fill();
    });
    if(active&&!reduced&&!document.hidden)raf=requestAnimationFrame(draw);
  }
  function scroll(){var r=section.getBoundingClientRect();p=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-h)));active=r.bottom>0&&r.top<h;pin.style.setProperty('--wash',Math.pow(p,4).toFixed(3));pin.style.setProperty('--copy',Math.max(0,1-p*1.25).toFixed(3));pin.style.setProperty('--lift',(p*45)+'px');if(active&&!raf&&!document.hidden){last=0;if(reduced)draw(0);else raf=requestAnimationFrame(draw);}else if(!active&&raf){cancelAnimationFrame(raf);raf=0;}}
  addEventListener('resize',resize);addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',function(){if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}else scroll();});resize();scroll();
})();
