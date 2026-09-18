(()=>{
  const esc=window.FLIPCO?.esc||((s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
  const fallback=(p)=>p?.art?`assets/products/${esc(p.art)}`:'';
  const src=(p)=>p?.image||fallback(p);
  const img=(p,alt='')=>`<img src="${esc(src(p))}" alt="${esc(alt||`${p?.brand||''} ${p?.name||''}`)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallback(p)}'>`;

  async function boot(){
    let products=[];
    try{ products=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0); }catch{}
    if(!products.length)return;

    const by=id=>products.find(p=>p.id===id);
    const editGrid=document.querySelector('#fxEditGrid');
    const count=document.querySelector('#fxEditCount');

    const card=(p,i)=>`<a class="fx-product-card ${i%2?'fx-offset':''}" href="product.html?id=${encodeURIComponent(p.id)}">
      <div class="fx-product-image">${img(p)}</div>
      <div class="fx-product-meta"><small>${esc(p.brand)} · ${esc(p.category)}</small><b>${esc(p.name)}</b><span>${FLIPCO.money(p.price)}</span></div>
    </a>`;

    if(editGrid){
      const edit=products.slice(0,6);
      editGrid.innerHTML=edit.map(card).join('');
      if(count)count.textContent=`${String(edit.length).padStart(2,'0')} PIECES / CURATED`;
    }

    const stories=document.querySelector('#fxStories');
    if(stories){
      const storyIds=['BARROW-TEE-01','BARROW-DENIM-01','DSQ2-PUFF-KIDS','NB9060-ALP'];
      const selected=storyIds.map(by).filter(Boolean);
      stories.innerHTML=selected.map((p,i)=>`<article class="fx-story ${i%2?'fx-story-reverse':''}">
        <div class="fx-story-media">${img(p)}</div>
        <div class="fx-story-info">
          <small>${esc(p.brand)} · ${esc(p.category)}</small>
          <h2>${esc(p.name.split(' ').slice(0,-1).join(' ')||p.name)}<br><em>${esc(p.name.split(' ').slice(-1)[0])}.</em></h2>
          <p>${esc(p.description||'Una selezione Flip&Co scelta per l’Online Edit.')}</p>
          <strong>${FLIPCO.money(p.price)}</strong>
          <div class="fx-story-actions"><a class="fx-link" href="product.html?id=${encodeURIComponent(p.id)}">VEDI IL PRODOTTO ↗</a></div>
        </div>
      </article>`).join('');
    }

    const state={audience:null,need:null};
    const buttons=document.querySelectorAll('[data-finder] button');
    const result=document.querySelector('#finderResult');
    const search=document.querySelector('#finderSearch');

    const matches=()=>products.filter(p=>{
      if(!state.audience||!state.need)return false;
      if(String(p.category).toLowerCase()!==String(state.audience).toLowerCase())return false;
      if(state.need==='all')return true;
      return String(p.type).toLowerCase()===state.need;
    });

    const status=()=>{
      if(!result||!search)return;
      const n=Number(!!state.audience)+Number(!!state.need);
      search.disabled=n!==2;
      result.querySelector('span').textContent=`${n}/2 RISPOSTE SELEZIONATE`;
      result.querySelector('b').textContent=n===2
        ? 'Perfetto. La tua selezione è pronta.'
        : n===1 ? 'Perfetto. Completa la seconda scelta.' : 'Dimmi per chi stai cercando e cosa ti serve.';
    };

    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      const group=btn.closest('[data-finder]').dataset.finder;
      state[group]=btn.dataset.value;
      btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));
      status();
    }));

    search?.addEventListener('click',()=>{
      const found=matches();
      if(editGrid){
        editGrid.innerHTML=found.length?found.map(card).join(''):`<div class="fx-empty"><span>NO EXACT MATCH</span><b>Nessun match esatto nell'Online Edit.</b><a class="fx-link" target="_blank" rel="noopener" href="https://wa.me/393661087819?text=Ciao%20Flip%26Co%2C%20non%20trovo%20quello%20che%20cerco%20e%20vorrei%20un%20consiglio.">CHIEDI AL TEAM ↗</a></div>`;
        if(count)count.textContent=`${String(found.length).padStart(2,'0')} PIECES / YOUR EDIT`;
      }
      const target=document.querySelector('#edit');
      target?.scrollIntoView({behavior:'smooth',block:'start'});
    });
    status();

    /* Product-size mini actions: the actual PDP remains the canonical purchase page. */
    document.addEventListener('click',e=>{
      const add=e.target.closest('[data-home-add]');
      if(!add)return;
      e.preventDefault();
      const p=by(add.dataset.homeAdd);
      const size=add.dataset.size;
      if(p&&size&&window.FLIPCO_CART) FLIPCO_CART.add(p.id,size,1);
    });
  }
  boot();
})();