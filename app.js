const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const intro = document.querySelector('.intro');
const counter = document.querySelector('.intro-counter');
let introFrame;
function closeIntro() { cancelAnimationFrame(introFrame); intro.classList.add('hidden'); intro.inert = true; document.body.classList.remove('loading'); }
function playIntro() {
  if (reduced.matches) { closeIntro(); return; }
  intro.inert = false; intro.classList.remove('hidden'); document.body.classList.add('loading');
  const start = performance.now();
  const tick = now => { const progress = Math.min(100, Math.floor((now - start) / 23)); counter.textContent = `${String(progress).padStart(2, '0')}%`; if (progress < 100) introFrame = requestAnimationFrame(tick); else setTimeout(closeIntro, 300); };
  introFrame = requestAnimationFrame(tick);
}
document.querySelector('.skip-intro').addEventListener('click', closeIntro);
document.querySelector('#replay').addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'instant' }); playIntro(); });
playIntro();
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label','Abrir menu'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') {closeMenu();closeIntro();} });
const cursor = document.querySelector('.cursor');
function updateCursorArrow(){
  const direction=cursor.dataset.direction;
  const overProject=cursor.dataset.project==='true';
  cursor.classList.toggle('project-cursor',Boolean(direction)||overProject);
  cursor.textContent=direction==='left'?'←':direction==='right'?'→':overProject?'↗':'';
}
if (matchMedia('(pointer:fine)').matches && !reduced.matches) {
  window.addEventListener('pointermove', e => { cursor.style.opacity = '1'; cursor.style.transform = `translate3d(${e.clientX - 25}px, ${e.clientY - 25}px, 0)`; cursor.dataset.project=String(Boolean(e.target.closest('.project'))); updateCursorArrow(); }, {passive:true});
  document.documentElement.addEventListener('pointerleave', () => cursor.style.opacity = '0');
}
const projects = [
  {name:'Universo Recicla',image:'universo-recicla',extension:'jpg',client:'Vivo',year:null,category:'IDENTIDADE VISUAL',overviewTitle:'Overview',reference:false,description:[
    'Universo Recicla é a identidade visual criada para orientar o desenvolvimento de materiais de treinamento sobre reciclagem para a equipe Comercial B2C da Vivo.',
    'O conceito propõe uma exploração espacial em que cada planeta dá acesso a uma seção do conteúdo. Naves, astronautas e foguetes reaparecem ao longo das telas, dando continuidade à narrativa. O roxo conecta o projeto à marca Vivo, enquanto rosa, laranja e azul diferenciam as seções e destacam informações.',
    'A identidade foi pensada como um sistema de elementos gráficos, ícones e layouts para aberturas, conteúdos, gráficos, vídeos e jogos, com uma linguagem visual reconhecível em todos esses formatos.'
  ]},
  {name:'Jogando Juntos',image:'jogando-juntos',extension:'jpg',client:'Vivo',year:null,category:'DESIGN DE BRINDES',overviewTitle:'Overview',reference:false,emphasis:'Jogando Juntos',description:[
    'A ideia de Jogando Juntos era dar à equipe da Vivo algo que ela pudesse vestir como um time. A camisa é o ponto de partida do kit. O número 10 nas costas, as estrelas e a bola na rede trazem para o evento os códigos de um uniforme de futebol, com o roxo da Vivo como cor da equipe.',
    'A partir da camisa, os brindes acompanham outros momentos do jogo. O meião completa o uniforme com um toque de laranja, a garrafa roxa com tampa verde remete à pausa para hidratação e os chinelos, com textura de gramado e tiras laranja, levam um pedaço do campo para depois do apito final.'
  ]},
  {name:'Comunicação imobiliária',image:'hacasa-int',extension:'jpg',client:'Hacasa e Rôgga',clientLabel:'CLIENTES',year:null,category:'IMPRESSO E MÍDIA EXTERIOR',subtitle:'Painel de fachada e folder para a Hacasa. Outdoor para o Belvedere Beachouse, da Rôgga.',overviewTitle:'Overview',reference:false,emphasis:['Hacasa','Belvedere Beachouse, da Rôgga'],description:[
    'Quanto tempo o público tem para olhar? Essa diferença orienta as três peças reunidas neste case. No painel de fachada da Hacasa, a imagem do edifício divide espaço com folhas em verde profundo. O contraste entre a textura orgânica e as linhas da arquitetura cria um ponto de atenção na rua, enquanto a assinatura branca permite reconhecer a marca de passagem. No folder, essa mesma linguagem visual dá lugar a uma leitura mais próxima. A estrutura em três painéis distribui imagens dos ambientes, características do empreendimento e informações de contato.',
    'No outdoor do Belvedere Beachouse, da Rôgga, a composição se concentra na leitura à distância. As torres ocupam o centro, o nome do empreendimento ganha espaço à esquerda e um bloco claro destaca a tipologia e a localização à beira-mar. A hierarquia permite captar o essencial em poucos segundos, com a arquitetura como ponto focal.'
  ]},
  {name:'Aprendendo Matemática',image:'seerj',extension:'png',client:'SEERJ',year:null,category:'DESIGN EDUCACIONAL · LANDING PAGES',overviewTitle:'Overview',reference:false,description:[
    'O projeto parte de situações que os alunos conseguem visualizar antes de fazer as contas. Na página do 6º ano, uma bola de futebol e um bloco introduzem os sólidos geométricos, enquanto as fatias de pizza ajudam a entender frações. Na do 7º ano, o traçado de uma pista de Fórmula 1 dá contexto ao cálculo de perímetro, e os moldes de roupas mostram como a geometria plana se relaciona com formas tridimensionais.',
    'As duas páginas compartilham uma linguagem visual que dá ritmo à leitura. Títulos em vermelho sinalizam novos assuntos, boxes azuis destacam conceitos para consulta e diagramas com medidas aproximam a explicação do exemplo.'
  ]}
];
const dialog = document.querySelector('#project-dialog'); let opener;
// Native scrolling keeps touch, trackpad and keyboard navigation in sync.
const projectTrack=document.querySelector('#project-track');
const previousProject=document.querySelector('.carousel-prev');
const nextProject=document.querySelector('.carousel-next');
const projectPosition=document.querySelector('#project-position');
const projectCards=[...projectTrack.querySelectorAll('.project')];
const projectOffset=card=>card.offsetLeft-8;
function updateProjectNavigation(){
  const end=Math.max(0,projectTrack.scrollWidth-projectTrack.clientWidth);
  previousProject.disabled=projectTrack.scrollLeft<=2;
  nextProject.disabled=projectTrack.scrollLeft>=end-2;
  const visible=projectCards.map((card,index)=>({index,start:projectOffset(card),end:projectOffset(card)+card.offsetWidth})).filter(card=>card.end>projectTrack.scrollLeft+10 && card.start<projectTrack.scrollLeft+projectTrack.clientWidth-10);
  if(visible.length){
    const first=visible[0].index+1,last=visible[visible.length-1].index+1;
    const label=`${first===last?first:`${first}–${last}`} / ${projectCards.length}`;
    if(projectPosition.textContent!==label)projectPosition.textContent=label;
  }
}
function moveProject(direction){
  stopEdgeScroll();
  const position=projectTrack.scrollLeft;
  const offsets=projectCards.map(projectOffset);
  const target=direction>0 ? offsets.find(offset=>offset>position+2) : offsets.reverse().find(offset=>offset<position-2);
  projectTrack.scrollTo({left:target ?? (direction>0?projectTrack.scrollWidth:0),behavior:reduced.matches?'instant':'smooth'});
}
previousProject.addEventListener('click',()=>moveProject(-1));
nextProject.addEventListener('click',()=>moveProject(1));
let carouselScrollTimer;
projectTrack.addEventListener('scroll',()=>{clearTimeout(carouselScrollTimer);carouselScrollTimer=setTimeout(updateProjectNavigation,100);},{passive:true});
projectTrack.addEventListener('keydown',event=>{
  stopEdgeScroll();
  if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
    event.preventDefault();moveProject(event.key==='ArrowRight'?1:-1);
  }else if(event.key==='Home'||event.key==='End'){
    event.preventDefault();projectTrack.scrollTo({left:event.key==='Home'?0:projectTrack.scrollWidth,behavior:reduced.matches?'instant':'smooth'});
  }
});
new ResizeObserver(updateProjectNavigation).observe(projectTrack);
updateProjectNavigation();
// Hovering near an edge smoothly advances the desktop gallery.
const hoverPointer=matchMedia('(hover:hover) and (pointer:fine)');
let edgeFrame=0,edgeTarget=0,edgeVelocity=0,edgeTime=0;
function stopEdgeScroll(preserveDirection=false){
  cancelAnimationFrame(edgeFrame);
  edgeFrame=0;edgeTarget=0;edgeVelocity=0;edgeTime=0;
  if(preserveDirection!==true) delete cursor.dataset.direction;
  updateCursorArrow();
  projectTrack.classList.remove('edge-scrolling');
  updateProjectNavigation();
}
function stepEdgeScroll(time){
  if(document.hidden||dialog.open||reduced.matches){stopEdgeScroll();return;}
  const elapsed=edgeTime?Math.min(time-edgeTime,40):16;
  edgeTime=time;
  edgeVelocity+=(edgeTarget-edgeVelocity)*(1-Math.exp(-elapsed/110));
  const limit=Math.max(0,projectTrack.scrollWidth-projectTrack.clientWidth);
  const next=Math.max(0,Math.min(limit,projectTrack.scrollLeft+edgeVelocity*elapsed/1000));
  projectTrack.scrollLeft=next;
  updateProjectNavigation();
  if((edgeTarget<0&&next<=0)||(edgeTarget>0&&next>=limit)){stopEdgeScroll(true);return;}
  edgeFrame=requestAnimationFrame(stepEdgeScroll);
}
projectTrack.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||event.buttons||!hoverPointer.matches||reduced.matches||dialog.open){stopEdgeScroll();return;}
  const bounds=projectTrack.getBoundingClientRect();
  const zone=Math.min(120,bounds.width*.16);
  const x=event.clientX-bounds.left;
  const strength=x<zone ? -Math.max(0,1-x/zone) : x>bounds.width-zone ? Math.max(0,1-(bounds.width-x)/zone) : 0;
  const limit=Math.max(0,projectTrack.scrollWidth-projectTrack.clientWidth);
  if(!strength||limit<=0){stopEdgeScroll();return;}
  cursor.dataset.direction=strength<0?'left':'right';
  updateCursorArrow();
  if((strength<0&&projectTrack.scrollLeft<=0)||(strength>0&&projectTrack.scrollLeft>=limit-1)){stopEdgeScroll(true);return;}
  edgeTarget=Math.sign(strength)*360*Math.min(1,strength*strength);
  if(!edgeFrame){projectTrack.classList.add('edge-scrolling');edgeFrame=requestAnimationFrame(stepEdgeScroll);}
},{passive:true});
['pointerleave','pointerdown','pointercancel','wheel'].forEach(event=>projectTrack.addEventListener(event,stopEdgeScroll,{passive:true}));
window.addEventListener('blur',stopEdgeScroll);
window.addEventListener('resize',stopEdgeScroll);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopEdgeScroll();});
reduced.addEventListener('change',stopEdgeScroll);
hoverPointer.addEventListener('change',stopEdgeScroll);
new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)stopEdgeScroll();}).observe(projectTrack);

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
 stopEdgeScroll();
 const p = projects[Number(button.dataset.project)]; opener = button;
 document.querySelector('#dialog-title').textContent = p.name;
 const card=document.querySelector(`.project[data-project="${button.dataset.project}"]`);
 document.querySelector('#dialog-company').textContent=p.client || p.name;
 document.querySelector('#dialog-company').previousElementSibling.textContent=p.clientLabel || 'CLIENTE';
 const year=document.querySelector('#dialog-year');
 year.textContent=p.year===null ? '' : card.querySelector('.project-top small')?.textContent || '';
 year.parentElement.hidden=!year.textContent;
 document.querySelector('.project-detail-meta').classList.toggle('without-year',!year.textContent);
 document.querySelector('#dialog-category').textContent=p.category || card.querySelector('.project-category').firstChild.textContent.trim();
 const image = document.querySelector('#dialog-image'); image.src = `/assets/${p.image}.${p.extension || 'webp'}`; image.alt = p.name;
 const subtitle=document.querySelector('#dialog-subtitle'); subtitle.textContent=p.subtitle || ''; subtitle.hidden=!p.subtitle;
 for(const field of ['area','scope']){
   const element=document.querySelector(`#dialog-${field}`);element.textContent=p[field] || '';element.parentElement.hidden=!p[field];
 }
 document.querySelector('.project-detail-scope').hidden=!p.area && !p.scope;
 document.querySelector('#dialog-overview-title').textContent=p.overviewTitle || 'VISÃO GERAL';
 const paragraphs=(Array.isArray(p.description)?p.description:[p.description]).map(text=>{
   const paragraph=document.createElement('p');
   const emphasis=(Array.isArray(p.emphasis)?p.emphasis:[p.emphasis]).find(term=>term && text.includes(term));
   if(emphasis){
     const position=text.indexOf(emphasis);const strong=document.createElement('strong');strong.textContent=emphasis;
     paragraph.append(text.slice(0,position),strong,text.slice(position+emphasis.length));
   }else paragraph.textContent=text;
   return paragraph;
 });
 document.querySelector('#dialog-description').replaceChildren(...paragraphs);
 document.querySelector('.project-detail-credit').hidden=p.reference===false;
 dialog.showModal(); document.body.style.overflow = 'hidden';
 dialog.scrollTop=0; document.querySelector('.project-detail-body').scrollTop=0;
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => {document.body.style.overflow = '';opener?.focus();});
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.hash === `#${entry.target.id}`)); }), {rootMargin:'-20% 0px -50% 0px'});
document.querySelectorAll('#work,#playground,#about').forEach(section => { if(!section.hidden) observer.observe(section); });
document.querySelector('#year').textContent = new Date().getFullYear();
function updateClock(){document.querySelector('#clock').textContent = `${new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',timeZone:'America/Sao_Paulo'}).format(new Date())} BRT / GMT−3`;}
updateClock();setInterval(updateClock,60000);

// The reference switches to a compact vertical navigation after the hero.
const heroObserver = new IntersectionObserver(([entry]) => {
  document.body.classList.toggle('past-hero', !entry.isIntersecting);
}, {threshold:0.15});
heroObserver.observe(document.querySelector('.hero'));

const workHeading = document.querySelector('.work .section-heading h2');
workHeading.innerHTML = '<span>SELECT</span><span class="pink" aria-hidden="true">✺</span><em>WORK</em>';
const bentoVariants = [
  ['.bento .tall', '/assets/universo-recicla.jpg']
];
bentoVariants.forEach(([selector,src]) => {
 const tile = document.querySelector(selector); const alternate = document.createElement('img');
 alternate.src=src; alternate.alt=''; alternate.className='bento-alternate'; alternate.loading='lazy';
 tile.append(alternate);
});

// Portrait messages are also available by keyboard and touch.
const photo = document.querySelector('.about-photo');
const greeting = document.createElement('button');
greeting.className='portrait-greeting'; greeting.type='button';
greeting.setAttribute('aria-expanded','false'); greeting.setAttribute('aria-controls','portrait-messages');
greeting.textContent='Olá! 👋';
const messages=document.createElement('div'); messages.id='portrait-messages'; messages.className='portrait-messages'; messages.hidden=true;
messages.setAttribute('role','log'); messages.setAttribute('aria-live','polite');
messages.setAttribute('aria-label','Mensagens de Martha');
const greetingTexts=['Meu nome é Martha.','Design, curiosidade e boas ideias.','Que bom ter você por aqui.'];
const typing=document.createElement('span'); typing.className='portrait-typing';
typing.setAttribute('aria-hidden','true');
typing.innerHTML='<i></i><i></i><i></i>';
let greetingTimer;
let greetingOpen=false;
photo.append(greeting,messages);
new ResizeObserver(()=>{
  if(greetingOpen) photo.style.setProperty('--messages-height',`${messages.offsetHeight}px`);
}).observe(messages);
function revealGreeting(open){
  if(open===greetingOpen) return;
  greetingOpen=open;
  clearTimeout(greetingTimer);
  photo.classList.toggle('greeting-open',open);
  greeting.setAttribute('aria-expanded',String(open));
  messages.hidden=!open;
  messages.replaceChildren();
  if(!open) return;
  let next=0;
  function typeNext(){
    messages.append(typing);
    greetingTimer=setTimeout(()=>{
      if(!greetingOpen) return;
      typing.remove();
      const line=document.createElement('span');
      line.textContent=greetingTexts[next++];
      messages.append(line);
      if(next<greetingTexts.length) typeNext();
    },1500);
  }
  typeNext();
}
greeting.addEventListener('click',()=>revealGreeting(greeting.getAttribute('aria-expanded')!=='true'));
photo.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')revealGreeting(true);});
photo.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!photo.contains(document.activeElement))revealGreeting(false);});
photo.addEventListener('focusout',event=>{if(!photo.contains(event.relatedTarget))revealGreeting(false);});
