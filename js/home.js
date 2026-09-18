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