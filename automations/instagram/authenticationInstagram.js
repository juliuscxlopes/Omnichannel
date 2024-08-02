// authentication.js
const puppeteer = require('puppeteer');
const readline = require('readline');

async function login(username, password) {
  // Inicia o navegador
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navega para a página de login do Instagram
  await page.goto('https://www.instagram.com/accounts/login/');

  // Aguarda os campos de login estarem disponíveis
  await page.waitForSelector('input[name="username"]');
  
  // Insere o nome de usuário e a senha
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  
  // Clica no botão de login
  await page.click('button[type="submit"]');

  // Aguarda a possível página de verificação em duas etapas
  try {
    // Pausa para a inserção manual do código de verificação
    console.log('Insira o código de verificação manualmente.');

    // Aguarda que o código seja inserido e o botão de confirmação seja clicado
    await waitForConfirmationButton(page);
  } catch (e) {
    console.log('A verificação em duas etapas não foi necessária ou não foi detectada.');
  }

  // Retorna o navegador e a página
  return { browser, page };
}

async function waitForConfirmationButton(page) {
  const confirmationButtonSelector = 'button[type="button"]'; // Seletor para o botão de confirmação (ajuste conforme necessário)
  
  // Espera até o botão de confirmação estar disponível
  try {
    await page.waitForSelector(confirmationButtonSelector, { timeout: 60000 });
    console.log('Botão de confirmação detectado. Certifique-se de que o código foi inserido.');
    // Aguarda um tempo adicional para que o usuário insira o código e clique no botão
    await page.waitForTimeout(30000); // Aguarda 30 segundos (ajuste conforme necessário)
  } catch (error) {
    console.log('O botão de confirmação não foi detectado a tempo. Certifique-se de inserir o código de verificação corretamente.');
  }
}

module.exports = { login };
