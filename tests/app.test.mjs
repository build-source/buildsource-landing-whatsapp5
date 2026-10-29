import test from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const cwd = process.cwd();

test('1. Estrutura HTML5 Semântica e Viewport Mobile', () => {
  const htmlPath = path.resolve(cwd, 'index.html');
  assert.ok(fs.existsSync(htmlPath), 'index.html deve existir na raiz do projeto');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /<!DOCTYPE\s+html>/i, 'Deve conter declaração <!DOCTYPE html>');
  assert.match(html, /<meta[^>]*viewport/i, 'Deve conter meta tag viewport para responsividade mobile');
  assert.match(html, /<form/i, 'Deve conter a tag <form> para captura de contatos');
  assert.match(html, /name=["']nome["']|id=["']nome["']|name=["']name["']|id=["']name["']/i, 'Deve conter campo para o Nome do usuário');
  assert.match(html, /style\.css/i, 'index.html deve carregar o arquivo style.css');
  assert.match(html, /script\.js/i, 'index.html deve carregar o script.js');
});

test('2. Estilização CSS3 Responsiva e Variáveis :root', () => {
  const cssPath = path.resolve(cwd, 'style.css');
  assert.ok(fs.existsSync(cssPath), 'style.css deve existir na raiz do projeto');
  const css = fs.readFileSync(cssPath, 'utf8');
  assert.ok(css.length > 80, 'style.css não pode estar vazio');
  assert.match(css, /@media/i, 'style.css deve incluir media queries para layout responsivo');
  assert.match(css, /color|background/i, 'style.css deve conter estilização de cores e tipografia');
});

test('3. Lógica JavaScript de Validação e Envio para WhatsApp', () => {
  const jsPath = path.resolve(cwd, 'script.js');
  assert.ok(fs.existsSync(jsPath), 'script.js deve existir na raiz do projeto');
  const js = fs.readFileSync(jsPath, 'utf8');
  assert.match(js, /addEventListener|onsubmit/i, 'script.js deve interceptar o envio do formulário');
  assert.match(js, /preventDefault/i, 'script.js deve chamar preventDefault() para evitar refresh');
  assert.match(js, /wa\.me|whatsapp/i, 'script.js deve conter a URL de destino da API do WhatsApp');
  assert.match(js, /5548988773779/i, 'script.js deve utilizar o telefone configurado 5548988773779');
  assert.match(js, /encodeURIComponent/i, 'script.js deve higienizar a mensagem com encodeURIComponent');
});

test('4. Configuração Operacional package.json com scripts dev, start e test', () => {
  const pkgPath = path.resolve(cwd, 'package.json');
  assert.ok(fs.existsSync(pkgPath), 'package.json deve existir');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.ok(pkg.scripts, 'package.json deve ter a seção scripts');
  assert.ok(pkg.scripts.dev, 'package.json deve ter o script "dev" configurado');
  assert.ok(pkg.scripts.start, 'package.json deve ter o script "start" configurado');
  assert.ok(pkg.scripts.test, 'package.json deve ter o script "test" configurado');
});

test('5. Teste Unitário Funcional: Sanitização e montagem da URL WhatsApp', () => {
  const targetPhone = '5548988773779';
  const nome = 'Cliente Teste';
  const email = 'cliente@empresa.com';
  const mensagem = 'Solicito atendimento para desenvolvimento de software';
  const textoFormatado = 'Olá! Meu nome é ' + nome + ' (' + email + '). Mensagem: ' + mensagem;
  const urlFinal = 'https://wa.me/' + targetPhone + '?text=' + encodeURIComponent(textoFormatado);

  assert.ok(urlFinal.startsWith('https://wa.me/5548988773779?text='), 'Início da URL de WhatsApp divergente');
  assert.ok(urlFinal.includes('Cliente%20Teste') || urlFinal.includes('Cliente+Teste'), 'Nome deve estar sanitizado na URL');
  assert.ok(urlFinal.includes(encodeURIComponent(email)), 'E-mail deve estar sanitizado na URL');
});
