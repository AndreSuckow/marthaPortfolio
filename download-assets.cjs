const fs = require('fs');
(async()=>{
const html=fs.readFileSync('reference-source.html','utf8');
const paths=[...new Set([...html.matchAll(/src="(\/images\/delivery\/[^\"]+)/g)].map(x=>x[1]))];
const chosen=['starbucks','basis-theory','servicebell.','bt2.','bt4.','kapa.'];
for(const key of chosen){const path=paths.find(p=>p.includes(key));if(!path)continue;const r=await fetch('https://www.radilson.com'+path);if(!r.ok)throw Error(r.status);fs.writeFileSync('public/assets/'+key.replace('.','')+'.webp',Buffer.from(await r.arrayBuffer()));}
const r=await fetch('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Space+Mono&display=swap');let css=await r.text();let i=0;for(const u of [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(x=>x[1]))]){const name='font-'+i+++'.woff2';const f=await fetch(u);fs.writeFileSync('public/assets/'+name,Buffer.from(await f.arrayBuffer()));css=css.split(u).join('/assets/'+name);}fs.writeFileSync('fonts.css',css);
})();
