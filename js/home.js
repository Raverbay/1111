(async()=>{
 const ps=(await FLIPCO.load()).filter(p=>FLIPCO.stock(p)>0),e=FLIPCO.esc;
 if(!ps.length)return;
 const hero=ps.find(p=>p.id==='NB9060-ERC')||ps[0];
 const kids=ps.filter(p=>p.category==='Kids').slice(0,4);
 const street=ps.filter(p=>p.brand==='Barrow').slice(0,4);
 const latest=ps.filter(p=>p.id!==hero.id).slice(0,6);
 const img=p=>`<img src="${e(p.image)}" alt="${e(p.brand)} ${e(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/products/${e(p.art)}'">`;
 document.querySelector('#homeHero').innerHTML=`
 <section class="hero-stage premium-hero">
   <div class="hero-side">
    <div class="eyebrow">01 / THE FLIP&CO EDIT</div>
    <div class="hero-title"><span>SELECTED</span><em>IN</em><span>CAGLIARI</span></div>
    <div class="hero-intro"><p>Una selezione multibrand con un punto di vista. Sneakers, streetwear e moda kids scelta per la città.</p><a class="arrow" href="shop.html">ENTER SHOP ↗</a></div>
   </div>
   <a class="hero-image" href="product.html?id=${encodeURIComponent(hero.id)}">
     ${img(hero)}<div class="hero-frame"></div><div class="hero-grain"></div>
     <div class="hero-product"><small>${e(hero.brand)} · ${e(hero.color)}</small><h1>${e(hero.name)}</h1><span>${FLIPCO.money(hero.price)} · SCOPRI ↗</span></div>
     <b class="hero-counter">01 / ${String(ps.length).padStart(2,'0')}</b>
   </a>
   <div class="hero-stamp"><span>VIA ITALIA 22</span><span>09124 CAGLIARI</span><span>SINCE 1986</span></div>
 </section>`;
 document.querySelector('#editGrid').innerHTML=latest.slice(0,2).map((p,i)=>`<a class="edit-card ${i?'offset':''}" href="product.html?id=${encodeURIComponent(p.id)}"><div class="edit-img">${img(p)}<span class="edit-index">0${i+2}</span></div><div class="edit-meta"><small>${e(p.brand)} · ${e(p.category)}</small><b>${e(p.name)}</b><span>${FLIPCO.money(p.price)} · VIEW ↗</span></div></a>`).join('');
 document.querySelector('#rail').innerHTML=latest.map((p,i)=>`<a class="rail-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="rail-no">${String(i+2).padStart(2,'0')}</div><div class="rail-img">${img(p)}</div><div class="rail-info"><small>${e(p.brand)}</small><b>${e(p.name)}</b><span>${FLIPCO.money(p.price)}</span></div></a>`).join('');
 document.querySelector('#brandList').innerHTML=[...new Set(ps.map(p=>p.brand))].sort().map((b,i)=>`<a href="shop.html?brand=${encodeURIComponent(b)}"><span>${String(i+1).padStart(2,'0')}</span><b>${e(b)}</b><i>↗</i></a>`).join('');
 const kidsMount=document.querySelector('#kidsEdit'); if(kidsMount) kidsMount.innerHTML=kids.map((p,i)=>`<a href="product.html?id=${encodeURIComponent(p.id)}" class="kids-card"><div>${img(p)}</div><small>0${i+1} / ${e(p.brand)}</small><b>${e(p.name)}</b></a>`).join('');
 const streetMount=document.querySelector('#streetEdit'); if(streetMount) streetMount.innerHTML=street.map((p,i)=>`<a href="product.html?id=${encodeURIComponent(p.id)}" class="street-card"><div>${img(p)}</div><span>${e(p.brand)} / ${e(p.name)}</span></a>`).join('');
 document.querySelector('#heroMeta').textContent=`${String(ps.length).padStart(2,'0')} PIECES / ONE INVENTORY`;
})();
