(async()=>{
  const products=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0);
  const e=FLIPCO.esc;
  if(!products.length)return;

  const image=p=>`<img src="${e(p.image)}" alt="${e(p.brand)} ${e(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'">`;

  /* HERO */
  const hero=products.find(p=>p.id==='DSQ2-PUFF-KIDS')||products[0];
  const hv=document.querySelector('#homeHeroVisual');
  if(hv)hv.innerHTML=`${image(hero)}<div class="hero-product"><small>${e(hero.brand)} · ${e(hero.category)}</small><b>${e(hero.name)}</b><span>${FLIPCO.money(hero.price)} · DISCOVER ↗</span></div>`;

  /* ONLINE EDIT */
  const edit=document.querySelector('#editGrid');
  const meta=document.querySelector('#heroMeta');

  const renderEdit=(items,label='THE ONLINE EDIT')=>{
    if(meta)meta.textContent=`${String(items.length).padStart(2,'0')} PIECES / ${label}`;
    if(!edit)return;

    edit.innerHTML=items.slice(0,8).map((p,i)=>`
      <a class="edit-card ${i%2?'offset':''}" href="product.html?id=${encodeURIComponent(p.id)}">
        <div class="edit-img">
          ${image(p)}
          <span class="edit-index">${String(i+1).padStart(2,'0')}</span>
          <span class="edit-badge">${e(p.badge||'SELECTED')}</span>
        </div>
        <div class="edit-meta">
          <small>${e(p.brand)} · ${e(p.category)}</small>
          <b>${e(p.name)}</b>
          <span>${FLIPCO.money(p.price)} · VIEW ↗</span>
        </div>
      </a>`).join('') || `<div class="finder-empty-edit"><span>NO MATCH</span><b>Nessun prodotto corrisponde esattamente alla tua ricerca online.</b><a target="_blank" rel="noopener" href="https://wa.me/393661087819?text=Ciao%20Flip%26Co%2C%20non%20trovo%20quello%20che%20cerco%20nell%27Online%20Edit%20e%20vorrei%20un%20consiglio.">CHIEDI AL TEAM ↗</a></div>`;
  };

  renderEdit(products.slice(0,4));

  const rail=document.querySelector('#rail');
  if(rail)rail.innerHTML=products.slice(0,8).map((p,i)=>`
    <a class="rail-card" href="product.html?id=${encodeURIComponent(p.id)}">
      <div class="rail-no">${String(i+1).padStart(2,'0')}</div>
      <div class="rail-img">${image(p)}</div>
      <div class="rail-info">
        <small>${e(p.brand)} · ${e(p.category)}</small>
        <b>${e(p.name)}</b>
        <span>${FLIPCO.money(p.price)}</span>
      </div>
    </a>`).join('');

  /* =====================================================
     FLIP FINDER V17
     Select -> Search -> filtered Online Edit below.
     No products are shown in the Finder itself.
     ===================================================== */
  const result=document.querySelector('#finderResult');
  const searchBtn=document.querySelector('#finderSearch');
  const buttons=document.querySelectorAll('[data-finder] button');
  const finderSection=document.querySelector('#finder');
  const selectionSection=document.querySelector('.selection-section');

  if(result&&searchBtn&&buttons.length){
    const state={audience:null,need:null};

    const norm=v=>String(v??'').trim().toLowerCase();

    const strictMatches=()=>{
      if(!state.audience||!state.need)return[];

      const audience=norm(state.audience);
      return products.filter(p=>{
        if(FLIPCO.stock(p)<=0)return false;

        // HARD audience gate: category is the canonical audience field
        // in the current product catalog.
        if(norm(p.category)!==audience)return false;

        // HARD type gate.
        if(state.need==='sneaker')return norm(p.type)==='sneaker';
        if(state.need==='apparel')return norm(p.type)==='apparel';

        // "Sorprendetemi" means all product types,
        // but never outside the selected audience.
        return state.need==='all';
      });
    };

    const updateButton=()=>{
      const ready=Boolean(state.audience&&state.need);
      searchBtn.disabled=!ready;
      searchBtn.classList.toggle('ready',ready);
    };

    const updateStatus=()=>{
      const selected=Number(Boolean(state.audience))+Number(Boolean(state.need));

      if(selected===0){
        result.querySelector('span').textContent='SELEZIONA DUE RISPOSTE';
        result.querySelector('b').textContent='Dimmi per chi stai cercando e cosa ti serve.';
      }else if(!state.need){
        result.querySelector('span').textContent='01/02 RISPOSTE';
        result.querySelector('b').textContent=`Perfetto. Ora scegli cosa cerchi per ${state.audience}.`;
      }else{
        const label=state.need==='sneaker'?'SNEAKERS':state.need==='apparel'?'CAPI':'SORPRENDETEMI';
        result.querySelector('span').textContent=`02/02 · ${state.audience.toUpperCase()} · ${label}`;
        result.querySelector('b').textContent='Pronto. Premi cerca e filtriamo la selezione qui sotto.';
      }
      updateButton();
    };

    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      const group=btn.closest('[data-finder]').dataset.finder;
      state[group]=btn.dataset.value;
      btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===btn));
      updateStatus();
    }));

    searchBtn.addEventListener('click',()=>{
      if(searchBtn.disabled)return;

      const matches=strictMatches();
      const label=state.need==='sneaker'?'SNEAKERS':state.need==='apparel'?'CAPI':'TUTTO';
      renderEdit(matches,`${state.audience.toUpperCase()} · ${label}`);

      const heading=selectionSection?.querySelector('.selection-heading h2');
      const copy=selectionSection?.querySelector('.selection-heading p');
      if(heading)heading.innerHTML=matches.length?`La tua<br><i>selezione.</i>`:`Nessun<br><i>match.</i>`;
      if(copy)copy.textContent=matches.length
        ? `${matches.length} ${matches.length===1?'pezzo corrisponde':'pezzi corrispondono'} esattamente a ${state.audience} · ${label}.`
        : `Non abbiamo un match esatto nell'Online Edit per ${state.audience} · ${label}. In store la selezione è più ampia.`;

      selectionSection?.scrollIntoView({behavior:'smooth',block:'start'});
    });

    updateStatus();
  }

  /* HERO MOTION / REVEALS */
  const hero=document.querySelector('.new-hero'),visual=document.querySelector('.hero-visual');
  if(hero){
    requestAnimationFrame(()=>hero.classList.add('is-ready'));
    if(visual){
      visual.addEventListener('pointermove',ev=>{
        const r=visual.getBoundingClientRect();
        const x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
        visual.style.setProperty('--mx',`${x*10}px`);
        visual.style.setProperty('--my',`${y*10}px`);
      });
      visual.addEventListener('pointerleave',()=>{
        visual.style.setProperty('--mx','0px');
        visual.style.setProperty('--my','0px');
      });
    }
    const io=new IntersectionObserver(entries=>entries.forEach(en=>{
      if(en.isIntersecting)en.target.classList.add('in-view');
    }),{threshold:.12});
    document.querySelectorAll('.quick-start,.look-finder,.selection-section,.store-section,.closing-home').forEach(el=>io.observe(el));
  }

  /* LOCAL-ASSET SHOP WINDOW */
  const showcase=document.querySelector('#heroShowcase');
  if(showcase){
    const ps=products.filter(p=>p.art);
    const card=p=>`<figure class="window-photo"><img src="assets/products/${e(p.art)}" alt="${e(p.brand)} ${e(p.name)}" loading="eager"></figure>`;
    const lane=items=>`<div class="window-lane">${items.concat(items).map(card).join('')}</div>`;
    showcase.innerHTML=lane(ps.slice(0,3))+lane(ps.slice(3,6))+lane(ps.slice(0,3).reverse());
    showcase.classList.add('is-loaded');
  }
})();