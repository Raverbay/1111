(()=>{
const esc=window.FLIPCO?.esc||((s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
const fallback=p=>p?.art?`assets/products/${esc(p.art)}`:'';
const src=p=>p?.image||fallback(p);
const img=(p,alt='')=>`<img src="${esc(src(p))}" alt="${esc(alt||`${p?.brand||''} ${p?.name||''}`)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallback(p)}'>`;
const live=p=>{try{return FLIPCO.stock(p)>0||p.available===true}catch{return !!p.available}};
const audienceMatch=(p,a)=>{
 if(!a)return true;
 const target=String(a).toLowerCase(),cat=String(p.category||'').toLowerCase(),aud=String(p.audience||'').toLowerCase();
 if(cat===target||aud===target)return true;
 if((cat==='unisex'||aud==='unisex')&&target!=='kids')return true;
 return Array.isArray(p.audiences)&&p.audiences.some(x=>String(x).toLowerCase()===target);
};
async function boot(){
 let products=[];try{products=await FLIPCO.load()}catch{}
 if(!products.length)return;
 const available=products.filter(live),by=id=>products.find(p=>p.id===id);
 const grid=document.querySelector('#fxEditGrid'),count=document.querySelector('#fxEditCount'),editTitle=document.querySelector('#fxEditTitle');
 let filter='all';
 const filtered=()=>available.filter(p=>filter==='all'||String(p.category).toLowerCase()===filter.toLowerCase()||String(p.type).toLowerCase()===filter.toLowerCase());
 const card=(p,i)=>`<a class="fx-product-card ${i%4===1?'fx-offset':''}" href="product.html?id=${encodeURIComponent(p.id)}"><div class="fx-product-image">${img(p)}</div><div class="fx-product-meta"><small>${esc(p.brand)} · ${esc(p.category==='Unisex'?'UNISEX':p.category)}</small><b>${esc(p.name)}</b><span>${FLIPCO.money(p.price)}</span><div class="fx-product-status">${esc(p.badge||'ONLINE EDIT')}</div></div></a>`;
 const render=(arr=filtered(),mode='CURATED')=>{if(grid)grid.innerHTML=arr.length?arr.map(card).join(''):`<div class="fx-empty"><span>ONLINE EDIT</span><b>Nessun match esatto nella selezione online.</b><a class="fx-link" target="_blank" rel="noopener" href="https://wa.me/393661087819?text=Ciao%20Flip%26Co%2C%20non%20trovo%20quello%20che%20cerco%20e%20vorrei%20un%20consiglio.">PARLA CON IL TEAM ↗</a></div>`;if(count)count.textContent=`${String(arr.length).padStart(2,'0')} PIECES / ${mode}`};
 render();
 document.querySelectorAll('.fx-filter-strip button').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter||'all';document.querySelectorAll('.fx-filter-strip button').forEach(x=>x.classList.toggle('active',x===b));if(editTitle)editTitle.innerHTML='Quello che<br><em>abbiamo scelto.</em>';render()}));
 const stories=document.querySelector('#fxStories');
 if(stories){const ids=['FLI-GCDS-BAND-MAN','FLI-GCDS-BERMUDA','DSQ2-PUFF-KIDS','NB9060-ERC'];const ss=ids.map(by).filter(p=>p&&live(p));stories.innerHTML=ss.length?ss.map((p,i)=>`<article class="fx-story ${i%2?'fx-story-reverse':''}"><div class="fx-story-media">${img(p)}</div><div class="fx-story-info"><small>${esc(p.brand)} · ${esc(p.category)} · ${esc(p.type||'')}</small><h2>${esc(p.name.split(' ').slice(0,-1).join(' ')||p.name)}<br><em>${esc(p.name.split(' ').slice(-1)[0])}.</em></h2><p>${esc(p.description||'Una selezione Flip&Co scelta per l’Online Edit.')}</p><strong>${FLIPCO.money(p.price)}</strong><div class="fx-story-actions"><a class="fx-link" href="product.html?id=${encodeURIComponent(p.id)}">VEDI IL PRODOTTO ↗</a></div></div></article>`).join(''):`<div class="fx-empty"><span>PRODUCT STORIES</span><b>Le stories stanno arrivando.</b></div>`}
 const state={audience:null,need:null},result=document.querySelector('#finderResult');
 const find=()=>available.filter(p=>audienceMatch(p,state.audience)&&(state.need==='all'||String(p.type||'').toLowerCase()===String(state.need||'').toLowerCase()));
 const status=()=>{if(!result)return;const n=Number(!!state.audience)+Number(!!state.need),statusEl=result.querySelector('span'),msg=result.querySelector('b');if(statusEl)statusEl.textContent=`${n}/2 RISPOSTE SELEZIONATE`;result.classList.toggle('is-ready',n===2);if(msg)msg.textContent=n===0?'Dimmi per chi stai cercando e cosa ti serve.':n===1?'Perfetto. Completa la seconda scelta e ti facciamo vedere la selezione.':'Perfetto. Ecco cosa abbiamo scelto per te.'};
 document.querySelectorAll('[data-finder] button').forEach(b=>b.addEventListener('click',()=>{const g=b.closest('[data-finder]').dataset.finder;state[g]=b.dataset.value;b.parentElement.querySelectorAll('button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b?'true':'false')});status();if(state.audience&&state.need){const arr=(state.need==='all'?find().slice(0,6):find());if(editTitle)editTitle.innerHTML=arr.length?`Ecco cosa<br><em>abbiamo scelto.</em>`:`Non c'è un match<br><em>esatto online.</em>`;render(arr,'YOUR EDIT');document.querySelector('#edit')?.scrollIntoView({behavior:'smooth',block:'start'})}}));
 document.querySelectorAll('[data-finder] button').forEach(b=>b.setAttribute('aria-pressed','false'));status();
}
boot();
})();
