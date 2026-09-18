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

/* V16 / FLIP FINDER — STRICT TWO-DIMENSION MATCHING */
(()=>{
  const result=document.querySelector('#finderResult');
  const buttons=document.querySelectorAll('[data-finder] button');
  if(!result||!buttons.length)return;

  const state={audience:null,need:null};
  let products=[];

  const norm=v=>String(v??'').trim().toLowerCase();

  /*
   * The Finder has two independent dimensions:
   * 1) audience = Uomo / Donna / Kids
   * 2) need = sneaker / apparel / all
   *
   * Both are mandatory filters. We intentionally use BOTH
   * `category` and `audience` when available, so a product can
   * never leak from another audience into the result.
   */
  const matches=()=>{
    if(!state.audience || !state.need)return [];

    const audience=norm(state.audience);
    const need=state.need;

    return products.filter(p=>{
      if(FLIPCO.stock(p)<=0)return false;

      const productAudience=norm(p.audience || p.category);

      // HARD audience gate.
      if(productAudience!==audience)return false;

      // HARD product-type gate.
      if(need==='sneaker'){
        return norm(p.type)==='sneaker';
      }

      if(need==='apparel'){
        return norm(p.type)==='apparel';
      }

      // "Sorprendetemi" = anything, but ONLY within the chosen audience.
      return need==='all';
    });
  };

  const productQuery=()=>{
    const params=new URLSearchParams();
    params.set('category',state.audience);
    if(state.need!=='all')params.set('type',state.need);
    return params.toString();
  };

  const whatsapp='https://wa.me/393661087819?text=Ciao%20Flip%26Co%2C%20vorrei%20un%20consiglio%20per%20un%20look.';

  const img=p=>`<img src="${e(p.image)}" alt="${e(p.brand)} ${e(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'">`;

  const render=()=>{
    if(!state.audience || !state.need){
      const selected=Number(Boolean(state.audience))+Number(Boolean(state.need));
      result.innerHTML=`
        <span>${selected}/2 RISPOSTE SELEZIONATE</span>
        <b>${selected===0
          ?'Partiamo da te.'
          :state.audience
            ?`Perfetto. Ora dimmi cosa cerchi per ${e(state.audience)}.`
            :'Perfetto. Ora dimmi per chi stai cercando.'}</b>`;
      return;
    }

    const picks=matches().slice(0,3);
    const labelNeed=state.need==='sneaker'?'SNEAKERS':state.need==='apparel'?'CAPI':'TUTTO';
    const query=productQuery();

    if(!picks.length){
      result.innerHTML=`
        <div class="finder-result-head">
          <span>${e(state.audience.toUpperCase())} · ${labelNeed} / 0 MATCH</span>
          <button type="button" class="finder-reset" data-finder-reset>RIPARTI ↻</button>
        </div>
        <b>Non abbiamo questo match nell'Online Edit. In store potremmo avere molto di più.</b>
        <a target="_blank" rel="noopener" href="${whatsapp}">PARLA CON NOI SU WHATSAPP ↗</a>`;
      bindReset();
      return;
    }

    result.innerHTML=`
      <div class="finder-result-head">
        <span>${e(state.audience.toUpperCase())} · ${labelNeed} / ${picks.length} ${picks.length===1?'MATCH':'MATCH'}</span>
        <button type="button" class="finder-reset" data-finder-reset>RIPARTI ↻</button>
      </div>
      <div class="finder-picks">
        ${picks.map(p=>`
          <a class="finder-pick" href="product.html?id=${encodeURIComponent(p.id)}">
            <div class="finder-pick-img">${img(p)}</div>
            <div class="finder-pick-meta">
              <small>${e(p.brand)} · ${e(p.category)}</small>
              <b>${e(p.name)}</b>
              <span>${FLIPCO.money(p.price)} ↗</span>
            </div>
          </a>`).join('')}
      </div>
      <a class="finder-all" href="shop.html?${query}">VEDI TUTTA LA SELEZIONE ↗</a>`;
    bindReset();
  };

  const bindReset=()=>{
    const reset=result.querySelector('[data-finder-reset]');
    if(reset)reset.onclick=()=>{
      state.audience=null;
      state.need=null;
      buttons.forEach(b=>b.classList.remove('active'));
      render();
    };
  };

  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const group=btn.closest('[data-finder]').dataset.finder;
    state[group]=btn.dataset.value;

    btn.parentElement.querySelectorAll('button')
      .forEach(x=>x.classList.toggle('active',x===btn));

    render();
  }));

  (async()=>{
    products=await FLIPCO.load();
    render();
  })();
})();

/* HERO MOTION */
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
    visual.addEventListener('pointerleave',()=>{
      visual.style.setProperty('--mx','0px');
      visual.style.setProperty('--my','0px');
    });
  }
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{if(en.isIntersecting)en.target.classList.add('in-view')});
  },{threshold:.12});
  document.querySelectorAll('.quick-start,.look-finder,.selection-section,.store-section,.closing-home').forEach(el=>io.observe(el));
})();

/* HERO PRODUCT SHOWCASE — LOCAL PRODUCT ASSETS */
(()=>{
  const showcase=document.querySelector('#heroShowcase');
  if(!showcase)return;
  const esc=FLIPCO.esc;
  (async()=>{
    const ps=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0 && p.art);
    if(!ps.length)return;
    const card=p=>`<figure class="window-photo">
      <img src="assets/products/${esc(p.art)}" alt="${esc(p.brand)} ${esc(p.name)}" loading="eager">
    </figure>`;
    const lane=items=>`<div class="window-lane">${items.concat(items).map(card).join('')}</div>`;
    const a=ps.slice(0,3),b=ps.slice(3,6),c=ps.slice(0,3).reverse();
    showcase.innerHTML=lane(a)+lane(b)+lane(c);
    requestAnimationFrame(()=>showcase.classList.add('is-loaded'));
  })();
})();
