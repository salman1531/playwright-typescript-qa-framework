const http = require('node:http');
const { randomUUID } = require('node:crypto');

const port = Number(process.env.PORT || 4173);
const products = [
  { id: 'backpack', name: 'Trail Backpack', price: 49.99 },
  { id: 'bottle', name: 'Steel Water Bottle', price: 19.5 },
];

const layout = (title, body, script = '') => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title><style>
body{font:16px system-ui;margin:0;background:#f4f7fb;color:#172033}main{max-width:900px;margin:48px auto;padding:28px;background:white;border-radius:14px;box-shadow:0 8px 30px #1d35571a}nav{display:flex;justify-content:space-between;align-items:center}label{display:block;margin:14px 0}input{display:block;padding:10px;width:min(420px,90%)}button,a.button{padding:10px 16px;border:0;border-radius:8px;background:#175cd3;color:white;text-decoration:none;cursor:pointer}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}.card{border:1px solid #dbe3ef;border-radius:10px;padding:18px}.error{color:#b42318}[role=alert]{margin-top:12px}.muted{color:#667085}</style></head><body><main>${body}</main><script>${script}</script></body></html>`;

function send(res, status, type, body) { res.writeHead(status, { 'content-type': type }); res.end(body); }
function readJson(req) { return new Promise((resolve, reject) => { let data=''; req.on('data', c => data += c); req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); } }); }); }

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/api/health') return send(res, 200, 'application/json', JSON.stringify({ status: 'ok' }));
  if (url.pathname === '/api/products') return send(res, 200, 'application/json', JSON.stringify(products));
  if (url.pathname === '/api/orders' && req.method === 'POST') {
    const body = await readJson(req).catch(() => null);
    if (!body?.productId || !body?.email || !products.some(p => p.id === body.productId)) return send(res, 400, 'application/json', JSON.stringify({ error: 'Invalid order' }));
    return send(res, 201, 'application/json', JSON.stringify({ id: `ORD-${randomUUID().slice(0, 8).toUpperCase()}`, productId: body.productId, email: body.email, status: 'created' }));
  }
  if (url.pathname === '/') return send(res, 200, 'text/html', layout('Login', `<h1>Demo Store Login</h1><p class="muted">A local application used only for this automation portfolio.</p><form id="login"><label>Email<input name="email" type="email" required></label><label>Password<input name="password" type="password" required></label><button>Sign in</button><div role="alert" class="error"></div></form>`, `login.onsubmit=e=>{e.preventDefault();const d=new FormData(login);if(d.get('email')==='qa.user@example.test'&&d.get('password')==='Portfolio123!')location='/inventory';else document.querySelector('[role=alert]').textContent='Invalid email or password'}`));
  if (url.pathname === '/inventory') return send(res, 200, 'text/html', layout('Products', `<nav><h1>Products</h1><a href="/cart" aria-label="Cart">Cart (<span id="count">0</span>)</a><button onclick="location='/'">Sign out</button></nav><section class="grid">${products.map(p => `<article class="card" data-testid="product-card"><h2>${p.name}</h2><p>$${p.price.toFixed(2)}</p><button data-id="${p.id}" data-name="${p.name}">Add to cart</button></article>`).join('')}</section>`, `document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>{sessionStorage.cart=JSON.stringify({id:b.dataset.id,name:b.dataset.name});count.textContent='1'})`));
  if (url.pathname === '/cart') {
    return send(res, 200, 'text/html', layout('Cart', `<h1>Your Cart</h1><p id="item"></p><button id="checkout">Checkout</button><section id="form" hidden><h2>Checkout details</h2><label>Full name<input id="name"></label><label>Email<input id="email" type="email"></label><label>Address<input id="address"></label><button id="place">Place order</button></section><section id="success" hidden><h1>Order confirmed</h1><p>Order <strong data-testid="order-number"></strong> has been created.</p><p id="confirmed-item"></p></section>`, `const cart=JSON.parse(sessionStorage.cart||'{"name":"Trail Backpack","id":"backpack"}');item.textContent=cart.name;checkout.onclick=()=>form.hidden=false;place.onclick=async()=>{const r=await fetch('/api/orders',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({productId:cart.id,email:email.value})});const o=await r.json();form.hidden=true;checkout.hidden=true;document.querySelector('[data-testid=order-number]').textContent=o.id;document.querySelector('#confirmed-item').textContent=cart.name;success.hidden=false}`));
  }
  send(res, 404, 'text/plain', 'Not found');
});

server.listen(port, '127.0.0.1', () => console.log(`Demo store running at http://127.0.0.1:${port}`));
