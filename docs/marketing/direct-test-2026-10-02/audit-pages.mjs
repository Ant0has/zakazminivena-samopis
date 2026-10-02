import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const paths = ['/routes/ekaterinburg-chelyabinsk','/routes/chelyabinsk-ekaterinburg','/routes/ekaterinburg-tyumen','/routes/tyumen-ekaterinburg','/routes/rostov-krasnodar','/routes/krasnodar-rostov','/routes/volgograd-elista','/routes/elista-volgograd','/routes/kazan-samara','/routes/samara-kazan','/airport/svo/tver','/airport/vko/tver','/airport/dme/tver','/cities/ekaterinburg','/cities/rostov','/routes/moskva-tver'];
const decode = s => s.replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'");
const strip = s => decode(s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const rows = [];
for (const path of paths) {
  try {
    const raw = execFileSync('curl',['--max-time','25','--silent','--show-error','--write-out','\nZM_STATUS:%{http_code}',`https://zakazminivena.ru${path}`],{encoding:'utf8',maxBuffer:12*1024*1024});
    const status = Number(raw.match(/ZM_STATUS:(\d+)$/)?.[1]);
    const html = raw.replace(/\nZM_STATUS:\d+$/,'');
    const text = strip(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,''));
    const row={path,status,title:strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(x=>strip(x[1])),canonical:html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]||null,hasConstructor:html.includes('/trip-constructor/constructor.html?'),visiblePerPerson:[...text.matchAll(/.{0,75}(?:руб\/чел|на человека).{0,90}/gi)].slice(0,6).map(x=>x[0]),wholeVehicle:text.includes('За весь минивэн')||text.includes('за весь автомобиль'),seatExclusion:/места не прода|мест не прода|отдельное место не|не за место/i.test(text)};
    rows.push(row); console.log(JSON.stringify(row));
  } catch(error) { rows.push({path,error:error.message.slice(0,200)}); console.log(JSON.stringify({path,error:error.message.slice(0,120)})); }
}
writeFileSync(fileURLToPath(new URL('./landing-audit.json',import.meta.url)),JSON.stringify({checkedOn:'2026-10-02',method:'Public GET from Mac; visible text excludes scripts; no form submissions',rows},null,2)+'\n');
