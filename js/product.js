(async()=>{
const ps=await FLIPCO.load(),id=FLIPCO.param('id'),p=ps.find(x=>x.id===id)||ps[0],e=FLIPCO.esc;
if(!p)return;
document.title=`${p.brand} — ${p.name} | Flip&Co`;
const sizes=Object.entries(p.stock||{});
document.querySelector('#pdp').innerHTML=`<div class="pdp-media"><div class="pdp-index">PRODUCT / ${e(p.id)}</div><img src="${e(p.image)}" alt="${e(p.brand)} ${e(p.name)}" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'"></div>
<div class="pdp-info"><div class="pdp-kicker">${e(p.badge||'SELECTED')} · ${e(p.season||'FLIP&CO')}</div>
<div class="pdp-brand">${e(p.brand)}</div><h1>${e(p.name)}</h1>
<div class="pdp-price">${p.compareAt?`<del>${FLIPCO.money(p.compareAt)}</del> `:''}${FLIPCO.money(p.price)}</div>
<p class="pdp-desc">${e(p.description||'Selezionato da Flip&Co Cagliari.')}</p>
<div class="source-note">Dati prodotto verificati sulla scheda ufficiale del brand · prezzo da ricontrollare prima del go-live.</div>
<div class="size-head"><span>SELECT SIZE</span><a href="faq.html">SIZE GUIDE ↗</a></div>
<div class="sizes">${sizes.map(([s,n])=>`<button class="size" data-size="${e(s)}" ${Number(n)<=0?'disabled':''}>${e(s)}${Number(n)<=0?' · SOLD OUT':''}</button>`).join('')}</div>
<button id="add" class="button dark full" disabled>AGGIUNGI AL BAG <span>↗</span></button>
<div id="added" class="added" aria-live="polite"></div>
<div class="delivery"><div><b>STORE PICKUP</b><span>Gratuito · Cagliari, Via Italia 22</span></div><div><b>SHIPPING</b><span>Disponibile · Italia</span></div></div>
<details open><summary>DETTAGLI</summary><p>${e(p.material||'Composizione non specificata.')}<br>${e(p.fit||'Vestibilità non specificata.')}<br>Colore: ${e(p.color||'—')}</p></details>
<details><summary>DISPONIBILITÀ</summary><p>La disponibilità mostrata è una demo dello stock Flip&Co. Prima del go-live va collegata all'inventario reale.</p></details>
${p.source?`<a class="official-link" href="${e(p.source)}" target="_blank" rel="noopener">APRI SCHEDA UFFICIALE DEL BRAND ↗</a>`:''}
<a class="whatsapp-link" href="https://wa.me/393661087819?text=${encodeURIComponent('Ciao Flip&Co, vorrei informazioni su '+p.brand+' '+p.name)}" target="_blank" rel="noopener">HAI BISOGNO DI AIUTO? WHATSAPP ↗</a></div>`;
let selected='';
document.querySelectorAll('.size').forEach(b=>b.onclick=()=>{selected=b.dataset.size;document.querySelectorAll('.size').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelector('#add').disabled=false});
document.querySelector('#add').onclick=()=>{if(!selected)return;FLIPCO_CART.add(p.id,selected);document.querySelector('#added').textContent='Aggiunto al bag · puoi continuare a navigare.'};
})();