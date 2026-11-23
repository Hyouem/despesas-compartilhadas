import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1536,height:1000},deviceScaleFactor:1});
 await page.goto('http://localhost:5191',{waitUntil:'networkidle'});
 const data=["Jantar da equipe", "Ana", "75.90"];
 for(let i=0;i<data.length;i++) await page.locator('form input').nth(i).fill(data[i]);
 await page.getByRole('button',{name:'Adicionar registro'}).click();
 await page.getByText(data[0]).last().waitFor({timeout:15000});
 mkdirSync('docs/images',{recursive:true});
 await page.screenshot({path:'docs/images/funcionamento.png',fullPage:true});
 console.log('Captura real concluída');
} finally {await browser.close();}
