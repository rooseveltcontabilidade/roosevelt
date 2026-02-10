
const BASE_URL = 'http://localhost:3001/api/chat';

async function chat(message) {
  console.log(`\nUser: "${message}"`);
  try {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: message }] })
    });
    const data = await res.json();
    if (!data.reply) {
        console.error('Error response from server:', JSON.stringify(data, null, 2));
    } else {
        console.log(`Roosevelt IA: "${data.reply}"`);
    }
    console.log('-'.repeat(50));
  } catch (err: any) {
    console.error('Error:', err.message || err);
  }
}


const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function runTests() {
  console.log('--- TESTANDO ROOSEVELT IA (PROMPT RIGOROSO DEFINITIVO) ---\n');

  // 1. Custo Abertura (Resposta Canônica)
  await chat('Quanto custa abrir empresa?');
  await sleep(2000);

  // 2. Escopo Geográfico (Recusa)
  await chat('Sou de SC');
  await sleep(2000);

  // 3. MEI Mensal (Recusa)
  await chat('Vocês atendem MEI mensal?');
  await sleep(2000);

  // 4. Hospital (Recusa)
  await chat('Sou hospital');
  await sleep(2000);

  // 5. Preço Mensal (CTA Form)
  await chat('Quanto custa por mês?');
  await sleep(2000);

  // 6. Fidelidade (Resposta Curta)
  await chat('Tem fidelidade/multa?');
}

runTests();
