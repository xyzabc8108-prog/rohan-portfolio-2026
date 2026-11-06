/* ROHAN DIGITAL LAB V5 — dependency-free interactions.
 * Accessible intro, search, filters, palette, navigation & progressive enhancement.
 */
(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const shell = document.getElementById('site-shell');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const onHome = body.dataset.page === 'home';
  const $ = (s, parent=document) => parent.querySelector(s);
  const $$ = (s, parent=document) => [...parent.querySelectorAll(s)];
  const setScrollLock = () => {
    body.classList.toggle('no-scroll',
      root.classList.contains('show-intro') ||
      (document.getElementById('search-overlay') && !$('#search-overlay').hidden) ||
      body.classList.contains('menu-open'));
  };
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  root.classList.add('js-ready');

  /* Transition: ~6.6s first arrival, once per browsing session. Skip / Esc / replay. */
  const intro = $('#intro'), introSkip = $('#intro-skip'), introCount = $('#intro-count');
  let introTimer = null, countTimer = null, introStart = 0, introActive = false;
  function startIntro() {
    if (!intro || reduced.matches) { root.classList.remove('show-intro'); return; }
    introActive = true;
    intro.classList.remove('is-skipping');
    root.classList.remove('show-intro');
    // Force replay animation when the footer "Replay" control is used.
    void intro.offsetWidth;
    root.classList.add('show-intro');
    if (shell) shell.inert = true;
    setScrollLock();
    if (introCount) introCount.textContent = '00%';
    introStart = performance.now();
    clearInterval(countTimer);
    countTimer = setInterval(() => {
      const fraction = Math.min(.99, (performance.now()-introStart)/6600);
      if (introCount) introCount.textContent = String(Math.round(fraction*100)).padStart(2,'0') + '%';
    }, 90);
    clearTimeout(introTimer);
    introTimer = setTimeout(() => finishIntro(false), 6630);
    introSkip?.focus({preventScroll:true});
  }
  function finishIntro(skipped=false) {
    if (!introActive && !root.classList.contains('show-intro')) return;
    introActive=false;clearTimeout(introTimer);clearInterval(countTimer);
    root.classList.remove('show-intro');
    intro?.classList.remove('is-skipping');
    if (introCount) introCount.textContent='100%';
    if (shell) shell.inert=false;
    try { sessionStorage.setItem('rc-intro-seen','1'); } catch(e) {}
    setScrollLock();
    if (skipped) {
      const main = $('#main');
      if (main) { main.setAttribute('tabindex','-1'); main.focus({preventScroll:true}); }
    } else if (document.activeElement === introSkip) {
      $('#main')?.focus({preventScroll:true});
    }
  }
  function skipIntro() {
    if (!introActive) return;
    clearTimeout(introTimer);
    intro?.classList.add('is-skipping');
    introTimer=setTimeout(() => finishIntro(true), 465);
  }
  if (onHome && intro && root.classList.contains('show-intro') && !reduced.matches) startIntro();
  else if(intro) { root.classList.remove('show-intro'); if(shell) shell.inert=false; }
  introSkip?.addEventListener('click', skipIntro);
  $$('[data-replay-intro]').forEach(btn => btn.addEventListener('click',() => {
    if (reduced.matches) return;
    closeSearch();
    closeMenu();
    startIntro();
  }));
  reduced.addEventListener?.('change', event => {
    if (event.matches) finishIntro(false);
  });
  window.addEventListener('pagehide',() => { clearTimeout(introTimer);clearInterval(countTimer); },{once:true});

  /* Hamburger menu: keyboard accessible and closes on focus/navigation. */
  const menuToggle=$('#menu-toggle'), nav=$('#site-nav');
  function closeMenu(){
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded','false');
    menuToggle?.setAttribute('aria-label','Open menu');
    setScrollLock();
  }
  menuToggle?.addEventListener('click',()=>{
    const open=!body.classList.contains('menu-open');
    body.classList.toggle('menu-open',open);
    menuToggle.setAttribute('aria-expanded',String(open));
    menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    setScrollLock();
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.addEventListener('resize',()=>{if(innerWidth>980)closeMenu();},{passive:true});
  document.addEventListener('pointerdown',e=>{
    if(body.classList.contains('menu-open')&&!nav?.contains(e.target)&&!menuToggle?.contains(e.target))closeMenu();
  });

  /* Color mode: three accessible accent palettes. */
  const palettes=['cyan','violet','amber'];
  const paletteButton=$('#palette-button');
  function updatePaletteLabel(){
    if(!paletteButton)return;
    const current=root.dataset.accent||'cyan';
    paletteButton.title='Current: '+current+'. Click for next accent color';
    paletteButton.setAttribute('aria-label','Change accent color. Current: '+current);
  }
  updatePaletteLabel();
  paletteButton?.addEventListener('click',()=>{
    const current=palettes.indexOf(root.dataset.accent||'cyan');
    root.dataset.accent=palettes[(current+1)%palettes.length];
    try{localStorage.setItem('rc-accent',root.dataset.accent)}catch(e){}
    updatePaletteLabel();
  });

  /* Filters preserve no-JS access to every project card. */
  const filterButtons=$$('[data-filter]'), cards=$$('.project-card'), workCount=$('#work-count');
  filterButtons.forEach(btn => btn.addEventListener('click',()=>{
    const filter=btn.dataset.filter;
    filterButtons.forEach(b=>{
      const active=b===btn;
      b.classList.toggle('is-active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    let shown=0;
    cards.forEach(card=>{
      const visible=filter==='all'||(card.dataset.category||'').split(/\s+/).includes(filter);
      card.hidden=!visible;
      if(visible)shown++;
    });
    if(workCount)workCount.textContent='SHOWING '+String(shown).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
  }));

  /* Search command palette, Ctrl/Cmd+K, arrow keys, accessible links. */
  const overlay=$('#search-overlay'), results=$('#search-results'), searchInput=$('#search-input');
  const openers=$$('[data-open-search]'), closers=$$('[data-close-search]');
  const pages=[
    {title:'All projects',description:'Browse the Digital Lab',href:'index.html#work',keywords:'work portfolio all projects'},
    {title:'About Rohan',description:'Background and working approach',href:'index.html#about',keywords:'about cybersecurity student ai-assisted work'},
    {title:'Education & Journey',description:'Marwadi University, Darshan University and technical support',href:'index.html#journey',keywords:'education darshan marwadi mtech cyber security btech semester 1 rajkot infrastructure windows server networking experience'},
    {title:'Projects & Collaboration',description:'Contact about research and web or Python projects',href:'index.html#contact',keywords:'contact opportunity research mentoring python web collaboration'},
    {title:'How I work',description:'Idea-led, AI-assisted projects',href:'index.html#process',keywords:'process prompt ai build testing workflow'},
    {title:'Contact',description:'Email Rohan',href:'index.html#contact',keywords:'contact email collaborations'},
    {title:'CV',description:'Resume and experience',href:'cv.html',keywords:'cv resume work skills'},
    {title:'Deepfake Detection',description:'Ongoing multimodal research',href:'projects/deepfake-detection.html',keywords:'fakeavceleb audio video ai research'},
    {title:'AutoMoto Studio',description:'Owner-only automotive video editor',href:'projects/automoto-studio.html',keywords:'car bike reels video creative render'},
    {title:'Indian Market Lab',description:'Safety-restricted research demo',href:'projects/indian-market-lab.html',keywords:'market research synthetic chart safe demo'},
    {title:'ROVAN',description:'Local AI assistant prototype',href:'projects/rovan.html',keywords:'ollama whisper voice local assistant'},
    {title:'Ashok Enterprise',description:'Private industrial web project',href:'projects/ashok-enterprise.html',keywords:'private react vite supabase machinery catalog'}
  ];
  let visibleResults=[],activeResult=0,lastFocus=null;
  function renderSearch(){
    if(!results||!searchInput)return;
    const query=searchInput.value.trim().toLowerCase();
    visibleResults=pages.filter(p=>(p.title+' '+p.description+' '+p.keywords).toLowerCase().includes(query)).slice(0,15);
    activeResult=0;results.replaceChildren();
    if(!visibleResults.length){
      const empty=document.createElement('p');empty.className='search-empty';
      empty.textContent='No matching projects or pages. Try a different keyword.';
      results.appendChild(empty);return;
    }
    visibleResults.forEach((p,i)=>{
      const a=document.createElement('a');a.className='search-result'+(i===activeResult?' is-selected':'');
      a.href=p.href;a.setAttribute('role','option');a.setAttribute('aria-selected',String(i===activeResult));
      const label=document.createElement('div'),title=document.createElement('span'),description=document.createElement('small'),arrow=document.createElement('b');
      title.textContent=p.title;description.textContent=p.description;arrow.textContent='↗';
      label.append(title,description);a.append(label,arrow);
      a.addEventListener('mouseenter',()=>selectSearch(i));
      a.addEventListener('click',closeSearch);
      results.appendChild(a);
    });
  }
  function selectSearch(i){
    activeResult=(i+visibleResults.length)%visibleResults.length;
    $$('.search-result',results).forEach((a,j)=>{
      a.classList.toggle('is-selected',j===activeResult);
      a.setAttribute('aria-selected',String(j===activeResult));
    });
    $$('.search-result',results)[activeResult]?.scrollIntoView({block:'nearest'});
  }
  function openSearch(){
    if(!overlay||introActive||root.classList.contains('show-intro'))return;
    closeMenu();
    lastFocus=document.activeElement;
    overlay.hidden=false;
    if(shell)shell.inert=true;
    setScrollLock();
    if(searchInput)searchInput.value='';
    renderSearch();
    searchInput?.focus({preventScroll:true});
  }
  function closeSearch(){
    if(!overlay||overlay.hidden)return;
    overlay.hidden=true;
    if(shell)shell.inert=false;
    setScrollLock();
    if(lastFocus?.isConnected)lastFocus.focus({preventScroll:true});
  }
  openers.forEach(el=>el.addEventListener('click',openSearch));
  closers.forEach(el=>el.addEventListener('click',closeSearch));
  searchInput?.addEventListener('input',renderSearch);
  document.addEventListener('keydown',e=>{
    if(introActive){
      if(e.key==='Escape'){e.preventDefault();skipIntro();}
      return;
    }
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();if(overlay?.hidden)openSearch();else closeSearch();return;
    }
    if(e.key==='Escape'){
      if(overlay&&!overlay.hidden){e.preventDefault();closeSearch();}
      else closeMenu();
      return;
    }
    if(!overlay||overlay.hidden)return;
    if(e.key==='ArrowDown'){e.preventDefault();if(visibleResults.length)selectSearch(activeResult+1);}
    if(e.key==='ArrowUp'){e.preventDefault();if(visibleResults.length)selectSearch(activeResult-1);}
    if(e.key==='Enter'&&document.activeElement===searchInput&&visibleResults.length){
      e.preventDefault();location.href=visibleResults[activeResult].href;
    }
    if(e.key==='Tab'){
      // Constrain focus to the dialog: close button(s), input and results.
      const focusable=$$('button,input,a[href]',overlay).filter(el=>el.getClientRects().length);
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });

  /* Reveal content without hiding anything when JS is disabled. */
  const reveals=$$('.reveal');
  if(!reduced.matches&&'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(item=>{
        if(item.isIntersecting){item.target.classList.add('visible');io.unobserve(item.target);}
      });
    },{rootMargin:'0px 0px -35px 0px',threshold:.07});
    reveals.forEach(el=>io.observe(el));
  }else reveals.forEach(el=>el.classList.add('visible'));
  reduced.addEventListener?.('change',e=>{if(e.matches)reveals.forEach(el=>el.classList.add('visible'));});

  /* Scroll progress, lightweight, passive. */
  const progress=$('.scroll-progress');let busy=false;
  function renderProgress(){
    if(progress){const max=document.documentElement.scrollHeight-innerHeight;
      progress.style.width=(max>0?Math.min(100,Math.max(0,scrollY/max*100)):0)+'%';}
    busy=false;
  }
  addEventListener('scroll',()=>{if(!busy){requestAnimationFrame(renderProgress);busy=true;}},{passive:true});
  addEventListener('resize',renderProgress,{passive:true});
  renderProgress();

  /* Clipboard with honest failure feedback. */
  const copyButton=$('[data-copy-email]'),copyResult=$('#copy-result');
  copyButton?.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText('rohanchhaya108@gmail.com');
      if(copyResult)copyResult.textContent='EMAIL COPIED';
    }catch(e){
      if(copyResult)copyResult.textContent='COPY FAILED — SELECT EMAIL LINK';
    }
  });
})();
