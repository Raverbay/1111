/* FLIPCO V35.4 — MENU NAVIGATION FIX */
(()=>{
const loader=document.createElement('div'); loader.id='flipLoader'; loader.innerHTML='<div class=\"loader-mark\">FLIP&CO</div><div class=\"loader-line\"><i></i></div><div class=\"loader-meta\"><span>SELECTED / CAGLIARI</span><span>LOADING EDIT</span></div>'; document.documentElement.classList.add('is-loading'); document.addEventListener('DOMContentLoaded',()=>{document.body.prepend(loader); requestAnimationFrame(()=>loader.classList.add('ready')); window.setTimeout(()=>{loader.classList.add('done'); document.documentElement.classList.remove('is-loading'); window.setTimeout(()=>loader.remove(),700)},820)});})();
(()=>{
const $=s=>document.querySelector(s), esc=FLIPCO.esc;
const usable=p=>FLIPCO.stock(p)>0||p.available===true;
function shell(){
$('#siteHeader').innerHTML=`
<div class="utility"><span>FLIP&CO / CAGLIARI</span><span>UOMO · DONNA · KIDS</span><span>ONLINE EDIT · FULL STORE EXPERIENCE</span></div>
<header class="header"><div class="header-inner">
<button class="menu-btn" id="menuBtn" aria-label="Apri menu" aria-expanded="false"><i></i><i></i></button>
<a class="brandmark" href="index.html" aria-label="Flip&Co home"><img src="assets/logo-flipco.png" alt="Flip&Co"></a>
<nav class="desktop-nav" aria-label="Navigazione principale"><a href="shop.html">Shop</a><a href="collections.html">Collections</a><a href="brand.html">Brands</a><a href="index.html#look">Ti facciamo il look</a><a href="index.html#store">Store</a></nav>
<div class="head-actions"><button id="searchBtn" class="icon" aria-label="Cerca"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><button id="cartBtn" class="bag" aria-label="Bag"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><b id="cartCount">0</b></button></div>
</div></header>
<div class="overlay" id="navOverlay"></div>
<aside class="mega" id="mega" aria-hidden="true"><div class="mega-top"><span>FLIP&CO</span><button id="closeMega">CHIUDI ×</button></div><div class="mega-grid"><div><small>SHOP</small><a href="shop.html">TUTTO</a><a href="shop.html?category=Uomo">UOMO</a><a href="shop.html?category=Donna">DONNA</a><a href="shop.html?category=Kids">KIDS</a><a href="shop.html?type=accessory">ACCESSORI</a><a href="shop.html?type=sneaker">SNEAKERS</a></div><div><small>DISCOVER</small><a href="collections.html">COLLECTIONS</a><a href="brand.html">BRANDS</a><a href="index.html#finder">FLIP FINDER</a><a href="index.html#look">TI FACCIAMO IL LOOK</a><a href="index.html#store">THE STORE</a><a href="faq.html">FAQ</a></div><div class="mega-note"><small>CAGLIARI</small><p>Via Italia 22<br>09124 Cagliari</p><a href="https://www.google.com/maps/search/?api=1&query=Flip%26Co%20Via%20Italia%2022%20Cagliari" target="_blank" rel="noopener">OPEN MAP ↗</a></div></div></aside>
<div class="search" id="searchPanel" aria-hidden="true"><div class="search-inner"><div class="mega-top"><span>SEARCH</span><button id="closeSearch">CHIUDI ×</button></div><input id="searchInput" placeholder="Cerca brand, prodotto…" autocomplete="off" aria-label="Cerca brand o prodotto"><div id="searchResults"></div></div></div>`;
$('#siteFooter').innerHTML=`<footer class="footer"><div class="footer-main"><div class="footer-brand"><img src="assets/logo-flipco.png" alt="Flip&Co"><p>Una selezione online.<br>Un negozio da vivere.</p></div><div><small>SHOP</small><a href="shop.html">Tutto</a><a href="shop.html?category=Uomo">Uomo</a><a href="shop.html?category=Donna">Donna</a><a href="shop.html?category=Kids">Kids</a><a href="shop.html?type=sneaker">Sneakers</a><a href="shop.html?type=accessory">Accessori</a></div><div><small>INFO</small><a href="brand.html">Brands</a><a href="shipping.html">Spedizioni</a><a href="returns.html">Resi</a><a href="faq.html">FAQ</a><a href="privacy.html">Privacy</a><a href="terms.html">Termini</a><a href="cookies.html">Cookie</a></div><div><small>STORE</small><span>Via Italia 22<br>Cagliari</span><span>Lun—Sab<br>09:00—13:30 / 16:00—20:00</span><a href="https://www.instagram.com/flipabbigliamento/" target="_blank" rel="noopener">Instagram ↗</a><a href="https://wa.me/393661087819" target="_blank" rel="noopener">WhatsApp ↗</a><a href="tel:+393661087819">+39 366 108 7819</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Flip&Co</span><span>ONLINE + STORE</span><span>MADE IN CAGLIARI</span></div></footer>`;
$('#cartRoot').innerHTML=`<div class="cart-backdrop" id="cartBackdrop"></div><aside class="cart" id="cart"><div class="cart-top"><span>YOUR BAG</span><button id="closeCart">CHIUDI ×</button></div><div id="cartList" class="cart-list"></div><div class="cart-bottom"><div><span>SUBTOTAL</span><strong id="cartTotal">€ 0,00</strong></div><a class="button dark full" href="checkout.html">CHECKOUT <span>↗</span></a><small>Ritiro gratuito in store · modalità di consegna confermate al momento dell’ordine.</small></div></aside>`;
}
shell();
$('#siteFooter').insertAdjacentHTML('afterend',`<div class="cookie-bar" id="cookieBar"><div><b>PRIVACY / COOKIE</b><span>Usiamo cookie tecnici necessari al funzionamento del sito e del bag. Nessun tracciamento marketing attivo in questa versione.</span></div><div><a href="privacy.html">PRIVACY ↗</a><button id="cookieOk">OK</button></div></div>`);
const cookie=$('#cookieBar');if(localStorage.getItem('flipco_cookie_ok')==='1')cookie.remove();else $('#cookieOk').onclick=()=>{localStorage.setItem('flipco_cookie_ok','1');cookie.remove()};
const body=document.body,mega=$('#mega'),search=$('#searchPanel'),ov=$('#navOverlay');
const closePanels=()=>{mega.classList.remove('open');search.classList.remove('open');ov.classList.remove('open');mega.setAttribute('aria-hidden','true');search.setAttribute('aria-hidden','true');body.classList.remove('no-scroll');$('#menuBtn').setAttribute('aria-expanded','false')};
$('#menuBtn').onclick=()=>{const on=!mega.classList.contains('open');closePanels();if(on){mega.classList.add('open');ov.classList.add('open');mega.setAttribute('aria-hidden','false');body.classList.add('no-scroll');$('#menuBtn').setAttribute('aria-expanded','true')}};
$('#closeMega').onclick=closePanels;ov.onclick=closePanels;
$('#searchBtn').onclick=()=>{closePanels();search.classList.add('open');ov.classList.add('open');search.setAttribute('aria-hidden','false');body.classList.add('no-scroll');$('#searchInput').focus()};$('#closeSearch').onclick=closePanels;
$('#searchInput').oninput=async e=>{const q=e.target.value.trim().toLowerCase(),ps=await FLIPCO.load();const a=ps.filter(p=>usable(p)&&(p.name+' '+p.brand+' '+p.category+' '+(p.type||'')).toLowerCase().includes(q)).slice(0,10);$('#searchResults').innerHTML=q?(a.length?a.map(p=>`<a class="search-row" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${esc(p.image)}" alt="" onerror="this.onerror=null;this.src='assets/products/${esc(p.art||'nb-9060-erc.svg')}'"><span><small>${esc(p.brand)}</small><b>${esc(p.name)}</b></span><strong>${FLIPCO.money(p.price)}</strong></a>`).join(''):'<p class="muted">Nessun risultato.</p>'):'<p class="muted">Cerca un brand o un prodotto.</p>'};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closePanels();closeCart()}});
// Single, delegated navigation handler. The menu layer sits above the overlay, so every link remains tappable on mobile.
document.addEventListener('click',e=>{
  const link=e.target.closest('#mega a, #searchResults a');
  if(!link)return;
  const href=link.getAttribute('href');
  if(!href || href==='#')return;
  e.preventDefault();
  e.stopPropagation();
  closePanels();
  window.location.assign(href);
});
function closeCart(){$('#cart')?.classList.remove('open');$('#cartBackdrop')?.classList.remove('open');body.classList.remove('no-scroll')}
$('#cartBtn').onclick=()=>{$('#cart').classList.add('open');$('#cartBackdrop').classList.add('open');body.classList.add('no-scroll')};$('#closeCart').onclick=closeCart;$('#cartBackdrop').onclick=closeCart;
async function cartRefresh(){const ps=await FLIPCO.load(),items=FLIPCO_CART.items();$('#cartCount').textContent=FLIPCO_CART.count();$('#cartList').innerHTML=items.length?items.map(x=>{const p=ps.find(y=>y.id===x.id);return p?`<div class="cart-row"><img src="${esc(p.image)}" alt="" onerror="this.onerror=null;this.src='assets/products/${esc(p.art||'nb-9060-erc.svg')}'"><div><small>${esc(p.brand)}</small><b>${esc(p.name)}</b><span>${esc(x.size)} · ${x.qty} × ${FLIPCO.money(p.price)}</span><button data-remove="${esc(x.id)}" data-size="${esc(x.size)}">RIMUOVI</button></div></div>`:''}).join(''):'<div class="cart-empty"><span>0</span><p>Il tuo bag è vuoto.</p><a href="shop.html" class="arrow">SCOPRI LA SELEZIONE ↗</a></div>';
$('#cartTotal').textContent=FLIPCO.money(FLIPCO_CART.total(ps));document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>FLIPCO_CART.remove(b.dataset.remove,b.dataset.size))}
cartRefresh();document.addEventListener('cart:change',cartRefresh);
const header=$('.header');let lastY=window.scrollY,ticking=false;const update=()=>{const y=window.scrollY;header.classList.toggle('scrolled',y>24);body.classList.toggle('nav-hidden',y>120&&y>lastY);body.classList.toggle('nav-show',y<=120||y<lastY);lastY=y;ticking=false};window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href');const el=id&&document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',id)}});
})();
