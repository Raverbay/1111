(()=>{
const esc=window.FLIPCO?.esc||((s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));
const live=p=>{try{return FLIPCO.stock(p)>0||p.available===true}catch{return !!p?.available}};
const fallback=p=>p?.art?`assets/products/${esc(p.art)}`:'';
const src=p=>p?.image||fallback(p);
const img=(p,alt='')=>`<img src="${esc(src(p))}" alt="${esc(alt||`${p?.brand||''} ${p?.name||''}`)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallback(p)}'>`;
async function boot(){
 const products=await FLIPCO.load(); if(!products.length)return; const available=products.filter(live);
 const grid=document.querySelector('#fxEditGrid'),count=document.querySelector('#fxEditCount');
 const curated=['NB9060-ERC','FLI-GCDS-BAND-MAN','DSQ2-PUFF-KIDS','FLI-PINKO-LOVE-BAG'].map(id=>products.find(p=>p.id===id)).filter(Boolean).filter(live);
 const card=(p,i)=>`<a class="f29-product-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="f29-product-image">${img(p)}</div><div class="f29-product-meta"><small>${esc(p.brand)} · ${esc(p.category)}</small><b>${esc(p.name)}</b><span>${p.compareAt&&Number(p.compareAt)>Number(p.price)?`<del>${FLIPCO.money(p.compareAt)}</del> `:''}${FLIPCO.money(p.price)}</span><div class="f29-product-status">${esc(p.badge||'SELECTED')}</div></div></a>`;
 const render=arr=>{if(grid)grid.innerHTML=arr.map(card).join('');if(count)count.textContent=`${String(arr.length).padStart(2,'0')} PIECES / CURATED`};render(curated);
 const state={audience:null,need:null},result=document.querySelector('#finderResult');
 const audienceMatch=(p,a)=>{const c=String(p.category||'').toLowerCase(), q=a.toLowerCase(); return c===q||(c==='unisex'&&(q==='uomo'||q==='donna'))};
 const find=()=>available.filter(p=>{if(!state.audience||!state.need)return false;if(!audienceMatch(p,state.audience))return false;return state.need==='all'||String(p.type||'').toLowerCase()===state.need});
 const finder=()=>{if(!result)return;const n=Number(!!state.audience)+Number(!!state.need);result.classList.toggle('is-ready',n===2);result.querySelector('small').textContent=`${n} / 2`;if(n<2){result.querySelector('strong').textContent=n===1?'Perfetto. Ora scegli cosa cerchi.':'Completa le due scelte.';return}const arr=find();result.querySelector('strong').textContent=arr.length?`Ecco la tua selezione: ${arr.length} ${arr.length===1?'pezzo':'pezzi'}.`:'Non lo vediamo nell’Online Edit. Il team può cercarlo in store.';if(arr.length)render(arr);document.querySelector('#edit')?.scrollIntoView({behavior:'smooth',block:'start'})};
 document.querySelectorAll('[data-finder] button').forEach(b=>b.addEventListener('click',()=>{const g=b.closest('[data-finder]').dataset.finder;state[g]=b.dataset.value;b.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));finder()}));
 finder();
 // hero showcase — editorial campaign rotation
 const heroSlides=[
  {image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=88',brand:'FLIP&CO',name:'THE EDIT',price:'CAGLIARI',link:'shop.html'},
  {image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=88',brand:'WOMEN / MEN / KIDS',name:'SELECTED NOW',price:'ONLINE EDIT',link:'shop.html'},
  {image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=88',brand:'CAGLIARI / ITALIA',name:'NEW SEASON',price:'DEMO CAMPAIGN',link:'collections.html'}
 ];
 let hi=0;
 const himg=document.querySelector('#heroImg'),hbrand=document.querySelector('#heroBrand'),hname=document.querySelector('#heroName'),hprice=document.querySelector('#heroPrice'),hlink=document.querySelector('#heroLink'),hidx=document.querySelector('#heroIndex'),dots=[...document.querySelectorAll('.f29-showcase-controls i')];
 const paint=()=>{const p=heroSlides[hi];if(!p)return;himg.style.opacity='0';setTimeout(()=>{himg.src=p.image;himg.alt=`${p.brand} ${p.name}`;himg.onerror=()=>{};hbrand.textContent=p.brand;hname.textContent=p.name;hprice.textContent=p.price;hlink.href=p.link;hidx.textContent=`0${hi+1} / 0${heroSlides.length}`;dots.forEach((d,i)=>d.classList.toggle('active',i===hi));himg.style.opacity='1'},180)};
 const next=()=>{hi=(hi+1)%heroSlides.length;paint()},prev=()=>{hi=(hi-1+heroSlides.length)%heroSlides.length;paint()};
 document.querySelector('#heroNext')?.addEventListener('click',next);document.querySelector('#heroPrev')?.addEventListener('click',prev);paint();
 let timer=setInterval(next,5600);document.querySelector('#heroShowcase')?.addEventListener('mouseenter',()=>clearInterval(timer));document.querySelector('#heroShowcase')?.addEventListener('mouseleave',()=>timer=setInterval(next,5600));
}
boot();
})();
