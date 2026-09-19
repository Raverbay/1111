(async()=>{
 const ps=await FLIPCO.load(),id=FLIPCO.param('id'),p=ps.find(x=>x.id===id),e=FLIPCO.esc;
 if(!p){const root=document.querySelector('#pdp'); if(root) root.innerHTML='<section class="pdp-not-found wrap"><span>404 / PRODUCT</span><h1>Prodotto<br><i>non trovato.</i></h1><p>La selezione che cerchi non è disponibile in questo momento.</p><a class="pdp-v29-cta" href="shop.html">TORNA ALLO SHOP ↗</a></section>'; return;}
 document.title=`${p.brand} ${p.name} — Flip&Co`;
 const art=p.art?`assets/products/${e(p.art)}`:'';
 const main=p.image||art;
 const wa=`https://wa.me/393661087819?text=${encodeURIComponent(`Ciao Flip&Co, vorrei informazioni su ${p.brand} ${p.name}.`)}`;
 const sizes=Object.entries(p.stock||{});
 const related=ps.filter(x=>x.id!==p.id&&(x.brand===p.brand||x.category===p.category)&&(FLIPCO.stock(x)>0||x.available)).slice(0,4);
 document.querySelector('#pdp').innerHTML=`
 <section class="pdp-v29">
  <div class="pdp-v29-gallery">
   <span class="pdp-v29-index">PRODUCT / ${e(p.id)}</span>
   <div class="pdp-v29-main"><img src="${e(main)}" alt="${e(p.brand)} ${e(p.name)}" onerror="this.onerror=null;this.src='${art}'"></div>
   <div class="pdp-v29-side"><div><img src="${e(art||main)}" alt="${e(p.name)} detail" onerror="this.style.display='none'"><span>01 / DETAIL</span></div><div><span>FLIP&CO<br>ONLINE EDIT</span></div></div>
  </div>
  <div class="pdp-v29-info">
   <span class="pdp-v29-kicker">${e(p.badge||'SELECTED')} · ${e(p.season||'FW26')}</span>
   <span class="pdp-v29-brand">${e(p.brand)} / ${e(p.category)}</span>
   <h1>${e(p.name)}</h1>
   <div class="pdp-v29-price">${p.compareAt&&Number(p.compareAt)>Number(p.price)?`<del>${FLIPCO.money(p.compareAt)}</del>`:''}${FLIPCO.money(p.price)}</div>
   <p class="pdp-v29-desc">${e(p.description||'Un pezzo selezionato da Flip&Co per l’Online Edit.')}</p>
   ${sizes.length?`<div class="pdp-v29-size-head"><span>SELECT SIZE</span><a href="faq.html">SIZE GUIDE ↗</a></div><div class="pdp-v29-sizes">${sizes.map(([s,n])=>`<button class="p29-size" data-size="${e(s)}" ${Number(n)<=0?'disabled':''}>${e(s)}</button>`).join('')}</div><button id="p29Add" class="pdp-v29-cta" disabled>ADD TO BAG <span>↗</span></button>`:`<div class="pdp-v29-size-head"><span>AVAILABILITY</span><span>CHECK WITH STORE</span></div><a class="pdp-v29-cta" href="${wa}" target="_blank" rel="noopener">CHECK AVAILABILITY ↗</a>`}
   <div class="pdp-v29-help"><b>NOT SURE?</b><span>Taglia, fit, abbinamento: scrivici e ti risponde il team Flip&Co.</span><a href="${wa}" target="_blank" rel="noopener">TALK TO US ON WHATSAPP ↗</a></div>
   <div class="pdp-v29-details"><details open><summary>DETAILS</summary><p>${e(p.material||'Composizione non specificata.')}<br>Fit: ${e(p.fit||'Non specificato.')}<br>Colore: ${e(p.color||'—')}</p></details><details><summary>THE ONLINE EDIT</summary><p>L’Online Edit è una selezione. In store trovi più pezzi, più taglie e altre proposte non pubblicate online.</p></details><details><summary>DELIVERY / STORE PICKUP</summary><p>Ritiro in Via Italia 22, Cagliari. Spedizione in Italia. Le condizioni definitive vengono confermate al momento dell’ordine.</p></details></div>
   <div class="pdp-v29-service"><div><b>STORE PICKUP</b><span>Cagliari · Via Italia 22</span></div><div><b>HUMAN SERVICE</b><span>WhatsApp · +39 366 108 7819</span></div></div>
  </div>
 </section>
 ${related.length?`<section class="pdp-related wrap"><div class="section-line"><span>YOU MAY ALSO LIKE</span><span>${String(related.length).padStart(2,'0')} PIECES</span></div><div class="shop-grid">${related.map(x=>`<a class="shop-card" href="product.html?id=${encodeURIComponent(x.id)}"><div class="shop-img"><img src="${e(x.image||`assets/products/${x.art||''}`)}" alt="${e(x.brand)} ${e(x.name)}" onerror="this.onerror=null;this.src='assets/products/${e(x.art||'nb-9060-erc.svg')}'"></div><div class="shop-meta"><div><small>${e(x.brand)}</small><b>${e(x.name)}</b></div><strong>${FLIPCO.money(x.price)}</strong></div></a>`).join('')}</div></section>`:''}`;
 let selected='';document.querySelectorAll('.p29-size').forEach(b=>b.onclick=()=>{selected=b.dataset.size;document.querySelectorAll('.p29-size').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');document.querySelector('#p29Add').disabled=false});
 document.querySelector('#p29Add')?.addEventListener('click',()=>{if(!selected)return;FLIPCO_CART.add(p.id,selected);document.querySelector('#p29Add').textContent='ADDED TO BAG ✓'});
})();
