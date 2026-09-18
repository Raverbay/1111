(()=>{
const KEY='flipco_bag_v1';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
const write=a=>{localStorage.setItem(KEY,JSON.stringify(a));document.dispatchEvent(new CustomEvent('cart:change'))};
window.FLIPCO_CART={
 items:()=>read(), count:()=>read().reduce((n,x)=>n+x.qty,0),
 add:(id,size,qty=1)=>{const a=read(),x=a.find(i=>i.id===id&&i.size===size);x?x.qty+=qty:a.push({id,size,qty});write(a)},
 remove:(id,size)=>write(read().filter(i=>!(i.id===id&&i.size===size))),
 clear:()=>write([]), total:ps=>read().reduce((t,x)=>{const p=ps.find(p=>p.id===x.id);return t+(p?Number(p.price)*x.qty:0)},0)
};})();