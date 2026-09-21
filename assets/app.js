const fallback=[
{id:"demo",title:"Welcome to SENQUARA E-BOOK",author:"SENQUARA",description:"A sample public welcome page. Replace this record with books you are legally allowed to publish.",file:"books/sample.pdf",rights:"OWNED / DEMO"}
];
let books=[];
async function loadBooks(){try{const r=await fetch("books/books.json",{cache:"no-store"});if(!r.ok)throw 0;books=await r.json()}catch(e){books=fallback}render()}
function render(){const q=(document.querySelector("#search")?.value||"").toLowerCase();const list=books.filter(b=>(b.title+" "+b.author+" "+b.description).toLowerCase().includes(q));const grid=document.querySelector("#bookGrid");grid.innerHTML=list.map(b=>`<article class="book"><div class="cover">📖</div><h3>${esc(b.title)}</h3><div class="muted">${esc(b.author||"Unknown author")}</div><div class="muted">${esc(b.rights||"Rights verified by administrator")}</div><p>${esc(b.description||"")}</p><a class="read" href="${safe(b.file)}" target="_blank" rel="noopener">Read Now</a></article>`).join("");document.querySelector("#empty").classList.toggle("hidden",list.length>0)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function safe(s){return String(s||"").replace(/[^a-zA-Z0-9_./?=&%-]/g,"")}
document.querySelector("#search")?.addEventListener("input",render);document.querySelector("#year").textContent=new Date().getFullYear();loadBooks();
