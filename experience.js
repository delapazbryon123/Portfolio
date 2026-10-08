(() => {
'use strict';
const ready = () => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=reduced.matches;
 const rail=document.createElement('aside');rail.className='companion-rail';rail.setAttribute('aria-label','Robot companion controls');
 rail.innerHTML='<div class="rail-track"><div class="rail-progress"></div></div><span class="rail-label">BRYON’S CO-PILOT</span><span class="rail-status" role="status">Scroll to explore. I’ll come along.</span><button type="button" class="robot-surprise">Do a trick ✦</button><button type="button" class="robot-pause" aria-pressed="false">Pause motion</button>';
 document.body.append(rail);
 const traveler=document.createElement('div');traveler.className='robot-traveler';traveler.setAttribute('aria-hidden','true');traveler.innerHTML='<div class="robot-body"><canvas width="460" height="570"></canvas></div>';document.body.append(traveler);
 const status=rail.querySelector('.rail-status'), pause=rail.querySelector('.robot-pause'),mini=traveler.querySelector('canvas'),mctx=mini.getContext('2d'),hero=document.querySelector('#heroCanvas'),hctx=hero?.getContext('2d'),body=traveler.firstElementChild;
 const main=document.querySelector('main');if(main){main.id ||= 'main-content';const skip=document.createElement('a');skip.className='skip-link';skip.href='#'+main.id;skip.textContent='Skip to content';document.body.prepend(skip);}
 let frames=[],frame=0,last=0,raf=0,playingUntil=0,heroVisible=true,moveTimer=0,trick=null;
 function draw(img){if(!img?.complete||!img.naturalWidth)return;if(hctx){hctx.clearRect(0,0,1280,720);hctx.drawImage(img,0,0,1280,720);}mctx.clearRect(0,0,460,570);mctx.drawImage(img,410,65,460,570,0,0,460,570);}
 function tick(t){raf=0;if(document.hidden||paused)return;if(t-last>1000/24){frame=(frame+1)%80;draw(frames[frame]||frames[0]);last=t;}if(performance.now()<playingUntil)raf=requestAnimationFrame(tick);}
 function play(ms=3400){if(paused||document.hidden)return;playingUntil=performance.now()+ms;if(!raf)raf=requestAnimationFrame(tick);}
 const first=new Image();frames[0]=first;first.onload=()=>{draw(first);position();};first.src='hero/52c83c13-ce6e-4132-a8b5-ec62d70b7a87_000.jpg';
 let loaded=false;function load(){if(loaded)return;loaded=true;for(let i=1;i<80;i++){const img=new Image();img.src=`hero/52c83c13-ce6e-4132-a8b5-ec62d70b7a87_${String(i).padStart(3,'0')}.jpg`;frames[i]=img;}}
 function say(text){status.textContent=text;const caption=document.querySelector('#robot-caption');if(caption)caption.textContent=text;}
 function progress(){const max=document.documentElement.scrollHeight-innerHeight;return max>0?Math.min(1,Math.max(0,scrollY/max)):0;}
 function position(target){const q=progress();rail.querySelector('.rail-progress').style.transform=`scaleX(${q})`;let x=20+q*Math.max(0,innerWidth-115),y=innerHeight-156;if(target&&!paused){const rect=target.getBoundingClientRect();x=Math.max(8,Math.min(innerWidth-84,rect.right-36));y=Math.max(75,Math.min(innerHeight-160,rect.top-85));}traveler.style.transform=`translate3d(${paused?16:x}px,${y}px,0)`;}
 function perform(kind,target){say(kind==='dance'?'Tiny robot. Excellent moves.':kind==='wave'?'Hello! I’m here to show you Bryon’s work.':'Let’s explore what Bryon builds.');if(paused)return;load();play();position(target);if(trick)trick.cancel();trick=body.animate(kind==='dance'?[{transform:'rotate(0deg)'},{transform:'translateY(-20px) rotate(-12deg)'},{transform:'rotate(12deg)'},{transform:'translateY(-12px) rotate(-8deg)'},{transform:'rotate(0deg)'}]:[{transform:'translateY(0)'},{transform:'translateY(-18px) rotate(8deg)'},{transform:'translateY(0)'}],{duration:kind==='dance'?1000:600,easing:'cubic-bezier(.77,0,.175,1)'});clearTimeout(moveTimer);moveTimer=setTimeout(()=>position(),2200);}
 document.querySelectorAll('[data-robot-action]').forEach(btn=>btn.addEventListener('click',()=>{const action=btn.dataset.robotAction;perform(action,btn);if(action==='tour'){const target=document.querySelector('#automations');target?.scrollIntoView({behavior:paused?'instant':'smooth'});say('Pick a project, or filter by what interests you.');}}));
 rail.querySelector('.robot-surprise').addEventListener('click',()=>perform('dance'));
 function syncPause(){document.body.classList.toggle('motion-paused',paused);pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume motion':'Pause motion';if(paused){cancelAnimationFrame(raf);raf=0;trick?.cancel();draw(frames[0]);}position();}
 pause.addEventListener('click',()=>{paused=!paused;if(reduced.matches)paused=true;syncPause();say(paused?'Motion paused. Explore at your own pace.':'Ready when you are. Let’s explore.');});reduced.addEventListener('change',()=>{paused=reduced.matches;syncPause();});syncPause();
 let pending=false;addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;position();});}},{passive:true});addEventListener('resize',()=>position());
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}});
 if(hero){new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(heroVisible)draw(frames[frame]||frames[0]);}).observe(hero);}
 document.addEventListener('click',e=>{const btn=e.target.closest('.project-card a,.project-controls button,summary');if(btn){perform('wave',btn);if(btn.closest('.project-card'))say('Great choice. Let’s look under the hood.');}});
 const cards=[...document.querySelectorAll('#dynamic-projects-grid .project-card')],search=document.querySelector('#project-search'),count=document.querySelector('#project-count');let filter='all';
 function filterProjects(){let n=0;for(const card of cards){card.hidden=!(filter==='all'||card.dataset.category===filter)||!card.dataset.search.includes(search.value.toLowerCase().trim());if(!card.hidden)n++;}count.textContent=n?`${n} project${n===1?'':'s'} to explore`:'No matches. Try another word or choose All work.';}
 if(search){search.addEventListener('input',filterProjects);document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{filter=btn.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));filterProjects();}));filterProjects();}
 const sections=[...document.querySelectorAll('main > section[id]')];if(sections.length){const sectionObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){const title=entry.target.querySelector('h2')?.textContent;if(title)say(title);}}, {rootMargin:'-25% 0px -55% 0px'});sections.forEach(section=>sectionObserver.observe(section));}
 // Existing detail pages need visible mobile navigation even when they have no menu button.
 const nav=document.querySelector('.nav-links');if(nav&&!document.querySelector('.mobile-menu-btn')){nav.style.flexWrap='wrap';nav.style.gap='12px';if(innerWidth<850){nav.style.display='flex';nav.style.fontSize='12px';}}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
