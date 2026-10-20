// Per-word depth reveal adapted for the current buildless portfolio.
(function(){
  var elements=[].slice.call(document.querySelectorAll('[data-depth-words]'));
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||!('IntersectionObserver' in window))return;
  elements.forEach(function(el){
    var index=0;
    var walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[],node;
    while((node=walk.nextNode()))nodes.push(node);
    nodes.forEach(function(text){
      var fragment=document.createDocumentFragment();
      text.textContent.split(/(\s+)/).forEach(function(token){
        if(!token)return;
        if(/^\s+$/.test(token)){fragment.appendChild(document.createTextNode(token));return;}
        var word=document.createElement('span');word.className='depth-word';word.textContent=token;
        word.style.setProperty('--word-delay',((Number(el.dataset.delay)||0)+Math.min(index++,14)*55)+'ms');
        fragment.appendChild(word);
      });text.replaceWith(fragment);
    });el.classList.add('depth-ready');
  });
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('depth-visible');observer.unobserve(entry.target);}});},{threshold:.15});
  elements.forEach(function(el){observer.observe(el);});
  var section=document.querySelector('.design-reflection'),raf=0;
  if(!section)return;
  section.addEventListener('pointermove',function(e){if(raf)return;var x=e.clientX,y=e.clientY;raf=requestAnimationFrame(function(){raf=0;var r=section.getBoundingClientRect();section.style.setProperty('--depth-x',((x-r.left)/r.width-.5)*5+'px');section.style.setProperty('--depth-y',((y-r.top)/r.height-.5)*5+'px');});},{passive:true});
  section.addEventListener('pointerleave',function(){section.style.setProperty('--depth-x','0px');section.style.setProperty('--depth-y','0px');});
})();
