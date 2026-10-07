const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..');
const targetDir = 'D:\\EDITOR ANOTADOR-OS-MALL';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Copiar anotador-sambil.html completo a D:\EDITOR ANOTADOR-OS-MALL\anotador.html
const htmlSrc = path.join(srcDir, 'anotador-sambil.html');
const htmlDst = path.join(targetDir, 'anotador.html');
fs.copyFileSync(htmlSrc, htmlDst);
console.log('Copiado anotador.html con exito:', fs.statSync(htmlDst).size, 'bytes');

// 2. Copiar todas las imagenes de niveles
const images = [
  'nivel autopista.jpeg',
  'nivel acuario.jpeg',
  'nivel diversion.jpeg',
  'nivel feria.jpeg',
  'nivel libertador.jpeg'
];

images.forEach(img => {
  const s = path.join(srcDir, img);
  const d = path.join(targetDir, img);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, d);
    console.log('Copiado', img);
  }
});

console.log('Completado');
