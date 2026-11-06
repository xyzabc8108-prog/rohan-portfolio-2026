'use strict';
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#primary-nav');
const closeMenu = () => {document.body.classList.remove('menu-open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');};
if (menu && nav) {
  menu.addEventListener('click', () => {const open = !document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e => {if(e.key==='Escape') closeMenu();});
  document.addEventListener('click',e => {if(document.body.classList.contains('menu-open')&&!nav.contains(e.target)&&!menu.contains(e.target)) closeMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>800) closeMenu();});
}
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !reduced) {
  const observer = new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{rootMargin:'0px 0px -35px 0px',threshold:0.07});
  reveals.forEach(el=>observer.observe(el));
} else reveals.forEach(el=>el.classList.add('is-visible'));
const progress=document.querySelector('#progress');
let ticking=false;
function updateProgress(){if(progress){const max=document.documentElement.scrollHeight-window.innerHeight;const ratio=max>0?(window.scrollY/max):0;progress.style.width=`${Math.max(0,Math.min(100,ratio*100))}%`;}ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});updateProgress();
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
const copy=document.querySelector('[data-copy]');const status=document.querySelector('#copy-status');
if(copy&&status){copy.addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(copy.dataset.copy);status.textContent='EMAIL COPIED';}catch{status.textContent='SELECT THE EMAIL ADDRESS TO COPY IT';}});}
