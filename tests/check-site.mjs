import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, normalize, resolve, extname } from 'node:path';
import { execFileSync } from 'node:child_process';
const root=resolve(process.cwd());
const paths=[
  'index.html','v5.css','v5.js','profile.css','favicon.svg','social-preview.png','robots.txt','sitemap.xml','cv.html','project-log.html','project-log.css',
  'projects/deepfake-detection.html','projects/automoto-studio.html',
  'projects/indian-market-lab.html','projects/rovan.html'
];
let tests=0;
function assert(ok,msg){tests++;if(!ok)throw new Error('FAIL: '+msg);}
for(const p of paths)assert(existsSync(join(root,p)),'Missing '+p);
const read=p=>readFileSync(join(root,p),'utf8');
const home=read('index.html'),js=read('v5.js'),css=read('v5.css');
assert((home.match(/class="project-card /g)||[]).length===4,'Exactly four project cards');
assert(home.includes('AI tools generated most of the implementation'),'Transparent AI implementation credit');
assert(home.includes('Research and broader validation are not complete'),'Deepfake status honestly ongoing');
assert(home.includes('data-open-search'),'Search trigger available');
assert(js.includes("Array.from(document.querySelectorAll('#site-nav a[href^="),'Fix navigation singleton selector bug');
assert(home.includes('role="combobox"')&&js.includes('aria-activedescendant'),'Accessible command search');
assert(home.includes('href="project-log.html"')&&js.includes('Evidence & Progress'),'Progress log linked and searchable');
assert((read('project-log.html').match(/class="log-entry"/g)||[]).length===4,'Log for four projects');
assert(read('project-log.html').includes('NO FABRICATED PRODUCT SCREENSHOTS'),'Truthful screenshot policy');
assert(css.includes('html.tab-hidden')&&js.includes('visibilitychange'),'Pause background animations');
assert(css.includes('.filter{min-height:44px}')&&css.includes(':focus-visible'),'Touch and keyboard controls');
assert(Buffer.byteLength(css,'utf8')<85000&&Buffer.byteLength(js,'utf8')<25000,'CSS and JavaScript size budget');
assert(home.includes('id="motion-toggle"')&&js.includes("rc-quiet-mode"),'Accessible low-effects control');
assert(home.includes('class="review-block"')&&home.includes('119 test clips'),'Honest evidence summary');
assert(home.includes('social-preview.png')&&home.includes('twitter:card'),'Share image metadata');
assert(css.includes('.case-evidence')&&css.includes('quiet-mode'),'Evidence and quiet-mode styling');
assert(home.includes('id="journey"')&&home.includes('Darshan University')&&home.includes('Marwadi University'),'Journey and education present');
assert(home.includes('Semester I')&&home.includes('AI-assisted'),'Truthful student identity');
assert(!home.toLowerCase().includes('internship')&&home.includes('RESEARCH COLLABORATION'),'No internship CTA; research contact retained');
assert(js.includes('Education & Journey')&&js.includes('Projects & Collaboration'),'Profile and contact details indexed by search');
assert(!read('cv.html').includes('CGPA 6.72')&&!read('cv.html').includes('paper-trading interface'),'Public CV does not promote disputed scores or trading claims');
assert(home.includes('data-replay-intro')&&home.includes('id="intro-skip"'),'Skippable/replayable intro available');
assert(css.includes('prefers-reduced-motion'),'Respect reduced-motion preference');
assert(css.includes('data-accent="violet"')&&css.includes('data-accent="amber"'),'Accent alternatives');
assert(js.includes("sessionStorage.setItem('rc-intro-seen'")&&js.includes('6630'),'Intro timing/session behavior');
assert(js.includes("e.key==='Escape'")&&js.includes("e.key.toLowerCase()==='k'"),'Keyboard commands');
assert(!home.toLowerCase().includes('digital forensic'),'No unwanted specialization');

assert(home.includes('The interface artwork above is illustrative'),'Artwork disclosure');
for(const p of paths.filter(x=>x.startsWith('projects/'))){
  const page=read(p);
  assert(page.includes('AI tools generated most of the implementation'),'Case study AI credit '+p);
  assert(page.toLowerCase().includes('not a screenshot'),'Illustration caveat '+p);
  assert(page.includes('../index.html#journey'),'Case study navigation links to Journey '+p);
  assert(page.includes('class="case-evidence"')&&page.includes('social-preview.png'),'Evidence and SEO on '+p);

}
const deepfake=read('projects/deepfake-detection.html');
assert(deepfake.includes('NOT COMPLETED')&&deepfake.includes('not finished'),'Research incomplete');
const automoto=read('projects/automoto-studio.html');
assert(automoto.includes('OWNER-ONLY')&&automoto.includes('LOGIN REQUIRED'),'AutoMoto private');
const market=read('projects/indian-market-lab.html');
assert(market.includes('FICTIONAL DEMOS')&&market.includes('RESEARCH-ONLY'),'Market safety');
const internalRe=/(?:href|src)="([^"]+)"/g;
for(const file of paths.filter(x=>x.endsWith('.html'))){
  const content=read(file);
  for(const m of content.matchAll(internalRe)){
    const href=m[1],base=href.split(/[?#]/)[0];
    if(!base||base.startsWith('#')||/^(https?:|mailto:|tel:|data:)/.test(base))continue;
    const target=normalize(join(dirname(join(root,file)),base));
    assert(target.startsWith(root+'/')||target===root,'Stay within repo: '+file+' -> '+href);
    assert(existsSync(target),'Broken relative URL: '+file+' -> '+href);
  }
}
execFileSync(process.execPath,['--check',join(root,'v5.js')],{stdio:'pipe'});
console.log('PASS: '+tests+' static checks, links, safety labels and JS syntax.');
