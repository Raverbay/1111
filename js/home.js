(async()=>{
  const e=FLIPCO.esc;
  const products=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0);
  if(!products.length)return;

  const image=(p,priority=false)=>`<img src="${e(p.image||'assets/products/'+p.art)}" alt="${e(p.brand)} ${e(p.name)}" ${priority?'fetchpriority="high"':''} loading="${priority?'eager':'lazy'}" decoding="async" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'">`;

  const hv=document.querySelector('#homeHeroVisual');
  const hero=products.find(p=>p.id==='NB9060-ERC'&&p.image)||products.find(p=>p.image)||products[0];
  if(hv){
    hv.innerHTML=`${image(hero,true)}<div class="hero-product"><small>${e(hero.brand)} · ${e(hero.category)}</small><b>${e(hero.name)}</b><span>${FLIPCO.money(hero.price)} · DISCOVER ↗</span></div>`;
  }

  const edit=document.querySelector('#editGrid');
  const meta=document.querySelector('#heroMeta');

  function renderEdit(items,label='THE ONLINE EDIT'){
    if(meta)meta.textContent=`${String(items.length).padStart(2,'0')} PIECES / ${label}`;
    if(!edit)return;
    if(!items.length){
      edit.innerHTML=`<div class="finder-empty-edit"><span>NO EXACT MATCH</span><b>Nessun prodotto corrisponde esattamente alla tua ricerca.</b><a target="_blank" rel="noopener" href="https://wa.me/393661087819?text=Ciao%20Flip%26Co%2C%20non%20trovo%20quello%20che%20cerco%20nell%27Online%20Edit%20e%20vorrei%20un%20consiglio.">CHIEDI AL TEAM ↗</a></div>`;
      return;
    }
    edit.innerHTML=items.slice(0,8).map((p,i)=>`<a class="edit-card ${i%2?'offset':''}" href="product.html?id=${encodeURIComponent(p.id)}"><div class="edit-img">${image(p)}<span class="edit-index">${String(i+1).padStart(2,'0')}</span><span class="edit-badge">${e(p.badge||'SELECTED')}</span></div><div class="edit-meta"><small>${e(p.brand)} · ${e(p.category)}</small><b>${e(p.name)}</b><span>${FLIPCO.money(p.price)} · VIEW ↗</span></div></a>`).join('');
  }
  renderEdit(products.slice(0,4));

  const rail=document.querySelector('#rail');
  if(rail)rail.innerHTML=products.slice(0,8).map((p,i)=>`<a class="rail-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="rail-no">${String(i+1).padStart(2,'0')}</div><div class="rail-img">${image(p)}</div><div class="rail-info"><small>${e(p.brand)} · ${e(p.category)}</small><b>${e(p.name)}</b><span>${FLIPCO.money(p.price)}</span></div></a>`).join('');

  const result=document.querySelector('#finderResult');
  const searchBtn=document.querySelector('#finderSearch');
  const buttons=document.querySelectorAll('[data-finder] button');
  const selection=document.querySelector('.selection-section');

  if(result&&searchBtn){
    const state={audience:null,need:null};

    const matches=()=>products.filter(p=>{
      if(!state.audience||!state.need)return false;
      if(String(p.category).trim().toLowerCase()!==state.audience.trim().toLowerCase())return false;
      if(state.need==='sneaker')return String(p.type).trim().toLowerCase()==='sneaker';
      if(state.need==='apparel')return String(p.type).trim().toLowerCase()==='apparel';
      return state.need==='all';
    });

    const status=()=>{
      const ready=state.audience&&state.need;
      searchBtn.disabled=!ready;
      searchBtn.classList.toggle('ready',Boolean(ready));
      const n=Number(Boolean(state.audience))+Number(Boolean(state.need));
      result.querySelector('span').textContent=n===2
        ? `02/02 · ${state.audience.toUpperCase()} · ${state.need==='sneaker'?'SNEAKERS':state.need==='apparel'?'CAPI':'SORPRENDETEMI'}`
        : `${n}/2 RISPOSTE SELEZIONATE`;
      result.querySelector('b').textContent=n===2
        ? 'Perfetto. Premi cerca: la selezione qui sotto si aggiornerà.'
        : n===1
          ? `Perfetto. Ora completa la ricerca.`
          : 'Dimmi per chi stai cercando e cosa ti serve.';
    };

    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      const group=btn.closest('[data-finder]').dataset.finder;
      state[group]=btn.dataset.value;
      btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===btn));
      status();
    }));

    searchBtn.addEventListener('click',()=>{
      if(searchBtn.disabled)return;
      const found=matches();
      const need=state.need==='sneaker'?'SNEAKERS':state.need==='apparel'?'CAPI':'TUTTO';
      renderEdit(found,`${state.audience.toUpperCase()} · ${need}`);
      const h=selection.querySelector('.selection-heading h2');
      const p=selection.querySelector('.selection-heading p');
      if(h)h.innerHTML=found.length?`La tua<br><i>selezione.</i>`:`Nessun<br><i>match.</i>`;
      if(p)p.textContent=found.length
        ? `${found.length} ${found.length===1?'pezzo corrisponde':'pezzi corrispondono'} esattamente a ${state.audience} · ${need}.`
        : `Nessun match esatto nell'Online Edit per ${state.audience} · ${need}. In store la selezione è più ampia.`;
      selection.scrollIntoView({behavior:'smooth',block:'start'});
    });

    status();
  }

  const showcase=document.querySelector('#heroShowcase');
  if(showcase){
    const ps=products;
    const card=p=>`<figure class="window-photo">${image(p,true)}</figure>`;
    const lane=items=>`<div class="window-lane">${items.concat(items).map(card).join('')}</div>`;
    showcase.innerHTML=lane(ps.slice(0,3))+lane(ps.slice(3,6))+lane(ps.slice(0,3).reverse());
  }

  document.querySelector('.new-hero')?.classList.add('is-ready');
})();