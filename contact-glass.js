// Original procedural glass: refracted light ribbons and thin-film colour.
(function(){
  var canvas=document.getElementById('contactGlass');if(!canvas)return;
  var gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
  var vs='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var fs='precision mediump float;uniform vec2 res;uniform vec2 pointer;uniform float time;'+
  'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}'+
  'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}'+
  'float field(vec2 p){float a=.5,v=0.;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+3.1;a*=.5;}return v;}'+
  'void main(){vec2 uv=gl_FragCoord.xy/res;vec2 p=(uv-.5)*vec2(res.x/res.y,1.);p+=pointer*.07;float t=time*.09;float n=field(p*3.+vec2(t,-t*.4));float n2=field(p*5.-t);vec2 q=p+vec2(n-.5,n2-.5)*.3;float wave=sin(q.x*6.+n*4.+t)*.12;float band=abs(q.y+.34-wave);float edge=exp(-band*35.);float ribbon=exp(-band*band*95.);float cut=smoothstep(.08,.38,abs(q.x));float shard=pow(max(0.,sin(q.x*7.+n*8.)),12.);vec3 film=.5+.5*cos(6.2831*(n*2.+q.x*.35+vec3(0.,.32,.64)));vec3 col=vec3(.012,.014,.023);col+=film*pow(n2,3.)*.13;col+=vec3(.79,.82,.91)*ribbon*cut*.95;col+=film*edge*.48;col+=vec3(1.,.91,.78)*shard*ribbon*.75;col+=film*pow(abs(sin(n*12.+q.x*4.)),26.)*.12;col+=(hash(gl_FragCoord.xy)-.5)*.035;gl_FragColor=vec4(col,1.);}';
  function shader(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;}
  var v=shader(gl.VERTEX_SHADER,vs),f=shader(gl.FRAGMENT_SHADER,fs);if(!v||!f)return;
  var program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;gl.useProgram(program);
  var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);var pos=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  var ur=gl.getUniformLocation(program,'res'),ut=gl.getUniformLocation(program,'time'),up=gl.getUniformLocation(program,'pointer'),mx=0,my=0,raf=0,visible=false,lastDraw=-1000;
  var video=document.getElementById("contactVideo");
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){var r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1);canvas.width=Math.max(1,Math.round(r.width*d));canvas.height=Math.max(1,Math.round(r.height*d));gl.viewport(0,0,canvas.width,canvas.height);if(reduce)draw(0);}
  function draw(t){raf=0;if(!reduce&&t-lastDraw<32){if(visible&&!document.hidden)raf=requestAnimationFrame(draw);return;}lastDraw=t;gl.uniform2f(ur,canvas.width,canvas.height);gl.uniform1f(ut,reduce?0:t*.001);gl.uniform2f(up,mx,my);gl.drawArrays(gl.TRIANGLES,0,6);if(visible&&!document.hidden&&!reduce)raf=requestAnimationFrame(draw);}
  function run(){if(video){if(visible&&!document.hidden&&!reduce){var play=video.play();if(play)play.catch(function(){});}else video.pause();}if(visible&&!document.hidden&&!raf){if(reduce)draw(0);else raf=requestAnimationFrame(draw);}else if((!visible||document.hidden)&&raf){cancelAnimationFrame(raf);raf=0;}}
  canvas.parentNode.addEventListener('pointermove',function(e){var r=canvas.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;});
  resize();addEventListener('resize',resize);document.addEventListener('visibilitychange',run);
  if('IntersectionObserver'in window)new IntersectionObserver(function(es){visible=es[0].isIntersecting;run();},{rootMargin:'100px'}).observe(canvas.parentNode);else{visible=true;run();}
})();
