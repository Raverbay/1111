(async()=>{
 const ps=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0),e=FLIPCO.esc;
 if(!ps.length)return;
 const hero=ps.find(p=>p.id==='DSQ2-PUFF-KIDS')||ps[0];
 const img=p=>`<img src="${e(p.image)}" alt="${e(p.brand)} ${e(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'">`;
 const hv=document.querySelector('#homeHeroVisual');
 if(hv) hv.innerHTML=`${img(hero)}<div class="hero-product"><small>${e(hero.brand)} · ${e(hero.category)}</small><b>${e(hero.name)}</b><span>${FLIPCO.money(hero.price)} · DISCOVER ↗</span></div>`;
 const latest=ps.slice(0,6);
 const edit=document.querySelector('#editGrid');
 if(edit) edit.innerHTML=latest.slice(0,4).map((p,i)=>`<a class="edit-card ${i%2?'offset':''}" href="product.html?id=${encodeURIComponent(p.id)}"><div class="edit-img">${img(p)}<span class="edit-index">${String(i+1).padStart(2,'0')}</span><span class="edit-badge">${e(p.badge||'SELECTED')}</span></div><div class="edit-meta"><small>${e(p.brand)} · ${e(p.category)}</small><b>${e(p.name)}</b><span>${FLIPCO.money(p.price)} · VIEW ↗</span></div></a>`).join('');
 const rail=document.querySelector('#rail');
 if(rail) rail.innerHTML=latest.map((p,i)=>`<a class="rail-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="rail-no">${String(i+1).padStart(2,'0')}</div><div class="rail-img">${img(p)}</div><div class="rail-info"><small>${e(p.brand)} · ${e(p.category)}</small><b>${e(p.name)}</b><span>${FLIPCO.money(p.price)}</span></div></a>`).join('');
 const meta=document.querySelector('#heroMeta'); if(meta) meta.textContent=`${String(ps.length).padStart(2,'0')} PIECES / ONLINE EDIT`;
})();
/* V7 / FLIP FINDER */
(()=>{
  const result=document.querySelector('#finderResult');
  const buttons=document.querySelectorAll('[data-finder] button');
  if(!result||!buttons.length)return;
  const state={audience:null,need:null};
  const render=async()=>{
    const ps=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0);
    let a=ps.filter(p=>!state.audience||p.category===state.audience);
    if(state.need&&state.need!=='all')a=a.filter(p=>p.type===state.need);
    if(!state.audience||!state.need){
      result.innerHTML='<span>SELEZIONA DUE RISPOSTE</span><b>Costruiamo la tua prima selezione.</b>';
      return;
    }
    const picks=a.slice(0,3);
    result.innerHTML=picks.length
      ? `<span>IL TUO FLIP / ${picks.length} PEZZI</span><b>${picks.map(p=>`${e(p.brand)} ${e(p.name)}`).join(' · ')}</b><a href="shop.html?category=${encodeURIComponent(state.audience)}${state.need!=='all'?'&type='+encodeURIComponent(state.need):''}">VEDI LA SELEZIONE ↗</a>`
      : `<span>NESSUN MATCH IMMEDIATO</span><b>Ti aiutiamo noi a trovare qualcosa.</b><a target="_blank" rel="noopener" href="https://wa.me/393661087819?text=Ciao%20Flip%26Co%2C%20vorrei%20un%20consiglio%20per%20un%20look.">SCRIVICI SU WHATSAPP ↗</a>`;
  };
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const group=btn.closest('[data-finder]').dataset.finder;
    state[group]=btn.dataset.value;
    btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===btn));
    render();
  }));
})();

/* V8 / HERO MOTION */
(()=>{
  const hero=document.querySelector('.new-hero'), visual=document.querySelector('.hero-visual');
  if(!hero)return;
  requestAnimationFrame(()=>hero.classList.add('is-ready'));
  if(visual){
    visual.addEventListener('pointermove',e=>{
      const r=visual.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      visual.style.setProperty('--mx',`${x*10}px`);
      visual.style.setProperty('--my',`${y*10}px`);
    });
    visual.addEventListener('pointerleave',()=>{visual.style.setProperty('--mx','0px');visual.style.setProperty('--my','0px')});
  }
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{if(en.isIntersecting)en.target.classList.add('in-view')});
  },{threshold:.12});
  document.querySelectorAll('.quick-start,.look-finder,.selection-section,.store-section,.closing-home').forEach(el=>io.observe(el));
})();

/* V9 / HERO PRODUCT SHOWCASE */
(()=>{
  const showcase=document.querySelector('#heroShowcase');
  if(!showcase)return;
  const esc=FLIPCO.esc;
  (async()=>{
    const ps=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0);

    /* Use photographic product sources for the window.
       Moschino's current data entry points to the brand homepage, so it is
       intentionally excluded from the hero rather than falling back to an SVG. */
    const photoProducts=ps.filter(p=>p.image && !/^https:\/\/www\.moschino\.com\/?$/i.test(p.image));
    if(!photoProducts.length)return;

    const card=p=>`<figure class="window-photo">
      <img src="${esc(p.image)}" alt="${esc(p.brand)} ${esc(p.name)}" loading="eager">
    </figure>`;

    const lane=(items)=>`<div class="window-lane">${items.concat(items).map(card).join('')}</div>`;
    const a=photoProducts.slice(0,3);
    const b=photoProducts.slice(3,6);
    const c=photoProducts.slice(0,3).reverse();

    showcase.innerHTML=lane(a)+lane(b)+lane(c);
    requestAnimationFrame(()=>showcase.classList.add('is-loaded'));

    showcase.querySelectorAll('img').forEach(img=>{
      img.addEventListener('error',()=>img.closest('.window-photo')?.remove(),{once:true});
    });
  })();
})();
