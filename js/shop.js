(async()=>{
const all=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0),e=FLIPCO.esc,grid=document.querySelector('#productGrid');
let state={cat:FLIPCO.param('category')||'all',brand:FLIPCO.param('brand')||'all',type:FLIPCO.param('type')||'all'};
const card=p=>`<a class="shop-card" href="product.html?id=${encodeURIComponent(p.id)}">
<div class="shop-img"><img src="${e(p.image)}" alt="${e(p.brand)} ${e(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'">
<span>${e(p.badge||'SELECTED')}</span>${p.compareAt?'<i class="sale-dot">SALE</i>':''}</div>
<div class="shop-meta"><div><small>${e(p.brand)} · ${e(p.category)}</small><b>${e(p.name)}</b></div>
<strong>${p.compareAt?`<del>${FLIPCO.money(p.compareAt)}</del> `:''}${FLIPCO.money(p.price)}</strong></div></a>`;
document.querySelector('#shopFilters').innerHTML=`<div class="filter-group"><button data-cat="all">ONLINE EDIT</button><button data-cat="Uomo">UOMO</button><button data-cat="Donna">DONNA</button><button data-cat="Kids">KIDS</button></div><div class="shop-sort"><span id="shopCount"></span><button id="clearFilter">RESET ↺</button></div>`;
const count=document.querySelector('#shopCount');
function render(){
 let ps=all;
 if(state.cat!=='all')ps=ps.filter(p=>p.category===state.cat);
 if(state.brand!=='all')ps=ps.filter(p=>p.brand===state.brand); if(state.type!=='all')ps=ps.filter(p=>p.type===state.type);
 grid.innerHTML=ps.map(card).join('')||'<div class="empty-grid">Nessun prodotto nella selezione.</div>';
 count.textContent=String(ps.length).padStart(2,'0')+' PIECES';
 document.querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('active',b.dataset.cat===state.cat));
}
document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{state.cat=b.dataset.cat;state.brand='all';render()});
document.querySelector('#clearFilter').onclick=()=>{state={cat:'all',brand:'all',type:'all'};history.replaceState({},'', 'shop.html');render()};
render();
})();