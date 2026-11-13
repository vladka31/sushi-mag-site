/* =========================================================
   Суши Маг Royal — скрипты (версия 2)
   1) ФОТО и ДАННЫЕ МЕНЮ — меняйте здесь
   2) Отрисовка карточек и переключение категорий
   3) Корзина: количество, панель, счётчик, оформление
   4) Бургер-меню, окно «Заказать звонок», мелочи
   ========================================================= */

/* ---------- 1. ФОТО ----------
   Фото с Unsplash (бесплатная лицензия Unsplash License).
   В демо фото одного типа используются по кругу — они НЕ соответствуют
   каждому блюду буквально. Когда клиент даст свои фото, впишите ссылку
   в поле img у нужного блюда (например, img: 'photos/filadelfiya.jpg'). */
const photo = (id, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

const PHOTOS = {
  rolls: [
    '1729698597333-358449c1d0e8', // ролл с икрой
    '1712725214706-e564b8dd1bbe', // роллы с соусом
    '1712725213572-443fe866a69a', // суши и палочки
    '1667510293794-d3b02072d154'  // тарелка с роллами
  ],
  pizza: [
    '1542282811-943ef1a977c3',    // пепперони
    '1506354666786-959d6d497f1a', // пицца на дереве
    '1716237389720-2c4fdabf0ac0'  // пицца режут
  ],
  bowls: [
    '1768326119231-bf064c1b8fdf', // боул с тунцом
    '1542354255-839e272e3408'     // боул с палочками
  ]
};

/* Фото на главном экране */
document.querySelector('.hero__bg').style.setProperty('--hero-img', `url("${photo('1667510293794-d3b02072d154', 1800)}")`);
document.getElementById('heroPlate').src = photo('1712725213572-443fe866a69a', 700);

/* ---------- ДАННЫЕ МЕНЮ ----------
   name  — название
   price — цена в рублях (число)
   desc  — состав (в демо многие придуманы — уточнить у клиента)
   img   — (необязательно) своя ссылка на фото. Если не указано —
           берётся фото из списка PHOTOS выше. */
const MENU = {
  rolls: [
    { name: 'Филадельфия с лососем', price: 580, desc: 'Лосось, сливочный сыр, огурец' },
    { name: 'Калифорния с креветкой', price: 530, desc: 'Креветка, авокадо, икра тобико' },
    { name: 'Амори', price: 580, desc: 'Угорь, сливочный сыр, огурец' },
    { name: 'Золотой дракон', price: 640, desc: 'Лосось, угорь, сыр, авокадо' },
    { name: 'Ролл Ёлка', price: 500, desc: 'Лосось, сыр, огурец, зелёная икра' },
    { name: 'Огненный риф', price: 540, desc: 'Запечённый ролл с лососем и соусом спайси' },
    { name: 'Аляска с лососем', price: 510, desc: 'Лосось, сливочный сыр, огурец, кунжут' },
    { name: 'Крэйзи', price: 550, desc: 'Курица, сыр, томаты, фирменный соус' },
    { name: 'Лотос', price: 410, desc: 'Краб, огурец, сливочный сыр, масаго' },
    { name: 'Греческий', price: 370, desc: 'Сыр фета, огурец, болгарский перец, салат' }
  ],
  pizza: [
    { name: 'Пепперони', price: 650, desc: 'Колбаски пепперони, моцарелла, томатный соус' },
    { name: 'Карбонара', price: 700, desc: 'Бекон, сливочный соус, сыр, лук' },
    { name: '4 сыра', price: 700, desc: 'Моцарелла, дорблю, пармезан, чеддер' },
    { name: 'Морская', price: 740, desc: 'Креветки, мидии, лосось, сыр' },
    { name: 'Курица с ананасами', price: 740, desc: 'Курица, ананасы, моцарелла, сливочный соус' },
    { name: 'Охота', price: 700, desc: 'Охотничьи колбаски, ветчина, грибы, моцарелла' },
    { name: 'Салами', price: 650, desc: 'Салями, моцарелла, томатный соус, орегано' },
    { name: 'Пицца Полло', price: 630, desc: 'Курица, томаты, моцарелла, соус барбекю' },
    { name: 'Пицца Креветочка', price: 800, desc: 'Креветки, сливочный соус, моцарелла, зелень' },
    { name: 'Пицца с грушей', price: 610, desc: 'Груша, дорблю, моцарелла, мёд' }
  ],
  bowls: [
    { name: 'Боул с лососем и тунцом', price: 570, desc: 'Рис, лосось, тунец, авокадо, овощи' },
    { name: 'Боул с креветкой', price: 550, desc: 'Рис, тигровые креветки, огурец, томаты' },
    { name: 'Боул с курицей', price: 450, desc: 'Рис, курица терияки, овощи, кунжут' },
    { name: 'Боул с кальмаром', price: 450, desc: 'Рис, кальмар, огурец, водоросли чука' },
    { name: 'Боул с мидиями', price: 450, desc: 'Рис, мидии, авокадо, соус унаги' },
    { name: 'Боул с тунцом', price: 550, desc: 'Рис, тунец, эдамаме, огурец, соус понзу' }
  ]
};

// Проставляем каждому блюду id и ссылку на фото
const DISHES = {}; // id -> блюдо
Object.keys(MENU).forEach(cat => {
  MENU[cat].forEach((dish, i) => {
    dish.id = cat + '-' + i;
    dish.img = dish.img || photo(PHOTOS[cat][i % PHOTOS[cat].length]);
    DISHES[dish.id] = dish;
  });
});

const formatPrice = n => n.toLocaleString('ru-RU') + ' ₽';

/* Если фото не загрузилось — подставляем тёмную заглушку с названием */
document.addEventListener('error', e => {
  const img = e.target;
  if (img.tagName !== 'IMG' || img.dataset.fallback) return;
  img.dataset.fallback = '1';
  const text = encodeURIComponent(img.alt || 'Суши Маг');
  img.src = `https://placehold.co/600x450/2C2C2C/FFB547?font=montserrat&text=${text}`;
}, true);

/* ---------- 2. МЕНЮ: отрисовка и табы ---------- */
const grid = document.getElementById('menuGrid');
const tabs = document.querySelectorAll('.tab');

/* Кнопка «В корзину» или переключатель «− N +» — зависит от количества */
function controlsHTML(id) {
  const qty = cart[id] || 0;
  if (!qty) return `<button class="add-btn" data-action="inc" data-id="${id}">В корзину</button>`;
  return `<div class="qty">
            <button data-action="dec" data-id="${id}" aria-label="Убавить">−</button>
            <span>${qty}</span>
            <button data-action="inc" data-id="${id}" aria-label="Добавить">+</button>
          </div>`;
}

function renderMenu(category) {
  grid.innerHTML = MENU[category].map(dish => `
    <article class="dish" data-id="${dish.id}">
      <div class="dish__imgwrap">
        <img class="dish__img" src="${dish.img}" alt="${dish.name} — доставка Суши Маг" loading="lazy">
        <span class="dish__price">${formatPrice(dish.price)}</span>
      </div>
      <div class="dish__body">
        <h3 class="dish__title">${dish.name}</h3>
        <p class="dish__desc">${dish.desc}</p>
        <div class="dish__ctrl">${controlsHTML(dish.id)}</div>
      </div>
    </article>`).join('');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    renderMenu(tab.dataset.category);
  });
});

/* ---------- 3. КОРЗИНА ----------
   cart = { 'rolls-0': 2, 'pizza-3': 1 }  — id блюда -> количество */
let cart = {};
try {
  const saved = JSON.parse(localStorage.getItem('sushimag-cart') || '{}');
  Object.keys(saved).forEach(id => { if (DISHES[id] && saved[id] > 0) cart[id] = saved[id]; });
} catch (e) { /* без localStorage тоже работает */ }

const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const drawer = document.getElementById('drawer');
const drawerBody = document.getElementById('drawerBody');
const drawerFoot = document.getElementById('drawerFoot');
const overlay = document.getElementById('overlay');
const cartTotal = document.getElementById('cartTotal');

function changeQty(id, delta) {
  const next = (cart[id] || 0) + delta;
  if (next <= 0) delete cart[id]; else cart[id] = next;

  // Обновляем только кнопки этой карточки (картинки не перезагружаются)
  const ctrl = grid.querySelector(`.dish[data-id="${id}"] .dish__ctrl`);
  if (ctrl) ctrl.innerHTML = controlsHTML(id);

  updateCart(delta > 0);
}

function updateCart(bump) {
  const ids = Object.keys(cart);
  const count = ids.reduce((s, id) => s + cart[id], 0);
  const sum = ids.reduce((s, id) => s + cart[id] * DISHES[id].price, 0);

  // Бейдж на иконке
  cartBadge.hidden = count === 0;
  cartBadge.textContent = count;
  if (bump) {
    cartBtn.classList.remove('bump');
    void cartBtn.offsetWidth;           // перезапуск анимации
    cartBtn.classList.add('bump');
  }

  // Содержимое панели
  if (!count) {
    drawerBody.innerHTML = `
      <div class="drawer__empty">
        <b>🍣</b>Корзина пока пуста<br>Добавьте что-нибудь вкусное из меню
        <br><button class="btn btn--primary btn--small" data-close-cart>Перейти к меню</button>
      </div>`;
    drawerFoot.hidden = true;
  } else {
    drawerBody.innerHTML = ids.map(id => {
      const d = DISHES[id];
      return `
        <div class="item">
          <img class="item__img" src="${d.img.replace('w=700', 'w=200')}" alt="${d.name}">
          <div>
            <div class="item__name">${d.name}</div>
            <div class="item__unit">${formatPrice(d.price)} за порцию</div>
          </div>
          <div class="item__row">
            <div class="qty">
              <button data-action="dec" data-id="${id}" aria-label="Убавить">−</button>
              <span>${cart[id]}</span>
              <button data-action="inc" data-id="${id}" aria-label="Добавить">+</button>
            </div>
            <div class="item__sum">${formatPrice(cart[id] * d.price)}</div>
          </div>
        </div>`;
    }).join('');
    drawerFoot.hidden = false;
  }
  cartTotal.textContent = formatPrice(sum);

  try { localStorage.setItem('sushimag-cart', JSON.stringify(cart)); } catch (e) {}
}

/* Клики «+», «−», «В корзину» — один обработчик на карточки и на панель */
function onCartAction(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  changeQty(btn.dataset.id, btn.dataset.action === 'inc' ? 1 : -1);
}
grid.addEventListener('click', onCartAction);
drawerBody.addEventListener('click', e => {
  if (e.target.closest('[data-close-cart]')) { closeCart(); return; }
  onCartAction(e);
});

/* Открытие / закрытие панели */
function openCart() {
  drawer.classList.add('is-open');
  overlay.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  closeNav();
}
function closeCart() {
  drawer.classList.remove('is-open');
  overlay.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}
cartBtn.addEventListener('click', openCart);
overlay.addEventListener('click', closeCart);
document.getElementById('drawerClose').addEventListener('click', closeCart);

document.getElementById('cartClear').addEventListener('click', () => {
  cart = {};
  renderMenu(document.querySelector('.tab.is-active').dataset.category);
  updateCart(false);
});

/* Оформление заказа (демо: просто сообщение) */
document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Заказ оформлен');
  cart = {};
  renderMenu(document.querySelector('.tab.is-active').dataset.category);
  updateCart(false);
  closeCart();
});

/* ---------- 4. БУРГЕР-МЕНЮ ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function closeNav() {
  nav.classList.remove('is-open');
  burger.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

/* ---------- 5. ОКНО «ЗАКАЗАТЬ ЗВОНОК» ---------- */
const modal = document.getElementById('modal');
const form = document.getElementById('callForm');
const formError = document.getElementById('formError');
const formOk = document.getElementById('formOk');

function openModal() {
  modal.hidden = false;
  form.hidden = false;
  formOk.hidden = true;
  formError.hidden = true;
  document.body.classList.add('no-scroll');
  closeNav();
  form.elements.name.focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('no-scroll');
}

document.querySelectorAll('[data-open-modal]').forEach(b => b.addEventListener('click', openModal));
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!modal.hidden) closeModal(); else closeCart();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const digits = form.elements.phone.value.replace(/\D/g, '');
  if (digits.length < 10) { formError.hidden = false; return; }
  formError.hidden = true;
  // ДЕМО: здесь можно подключить отправку на почту/в Telegram.
  form.hidden = true;
  form.reset();
  formOk.hidden = false;
  setTimeout(closeModal, 2500);
});

/* ---------- 6. МЕЛОЧИ ---------- */
// Шапка становится плотнее при прокрутке
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

document.getElementById('year').textContent = new Date().getFullYear();

// Первая отрисовка
renderMenu('rolls');
updateCart(false);
