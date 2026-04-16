const Magic = require('mtgsdk-ts');
async function run() {
  const c1 = await Magic.Cards.where({ name: 'Fading Hope' });
  console.log('Fading Hope:', c1.length);
  const c2 = await Magic.Cards.where({ name: 'Otawara, Soaring City (NEO) 271' });
  console.log('Otawara with set:', c2.length);
}
run();
