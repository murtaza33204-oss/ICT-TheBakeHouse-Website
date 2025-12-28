// ===== Currency: Pakistani Rupees =====
function formatPKR(amount){
  const n = Math.round(amount);
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

// ===== Catalog (sample items) =====
const ITEMS = {
  "Bread": [
    { name:"Sourdough Loaf", price:799, tag:"Fresh", img:"images/bread1.jpg" },
    { name:"Baguette", price:399, tag:"Crispy", img:"images/bread2.jpg" },
    { name:"Whole Wheat Bread", price:649, tag:"Healthy", img: 'images/breadBundle.jpg' }
  ],
  "Cakes": [
    { name:"Chocolate Dream Cake", price:3100, tag:"Bestselling", img:'images/chocolatedream.jpg'},
    { name:"Red Velvet Cake", price:2300, tag:"Classic", img:'images/Red_Velvet_Cake_0.jpg' },
    { name:"Ferrero Style Cake", price:3500, tag:"Premium", img:'images/ferrero-cake_1.jpg' }
  ],
  "Donuts": [
    { name:"Glazed Donut", price:199, tag:"Soft", img:'images/donut1.jpg' },
    { name:"Chocolate Sprinkles", price:249, tag:"Fun", img:'images/donut3.jpg' },
    { name:"Strawberry Donut", price:229, tag:"Sweet", img:'images/donut2.jpg' }
  ],
  "Biscuits": [
    { name:"Butter Cookies", price:499, tag:"Crunchy", img:'images/cookies1.jpg' },
    { name:"Choco Chip Cookies", price:549, tag:"Warm", img:'images/cookies2.jpeg' },
    { name:"Almond Biscotti", price:649, tag:"Coffee Pair", img:'images/cookies3.jpg' }
  ],
  "Pie": [
    { name:"Apple Pie Slice", price:499, tag:"Homestyle", img:'images/pie.jpg' },
    { name:"Blueberry Pie Slice", price:549, tag:"Fruity", img:'images/pie2.jpeg' },
    { name:"Pecan Pie Slice", price:599, tag:"Rich", img:'images/pie3.jpg' }
  ],
  "Cup cakes / Muffins": [
    { name:"Vanilla Cupcake", price:250, tag:"Bestselling", img:'images/cupcake2.jpg' },
    { name:"Dark Chocolate Cupcake", price:250, tag:"Classic", img:'images/cupcake1.jpg' },
    { name:"Blueberry Muffin", price:279, tag:"Soft", img:'images/cupcake3.jpg' }
  ],
  "Pizza": [
    { name:"Margherita Slice", price:499, tag:"Hot", img:'images/slice1.jpeg' },
    { name:"Pepperoni Slice", price:549, tag:"Spicy", img:'images/slice2.jpg' },
    { name:"Veggie Slice", price:529, tag:"Fresh", img:'images/slice3.jpg' }
  ],
  "Pastries": [
    { name:"Croissant", price:249, tag:"Flaky", img:'images/pastry1.jpg' },
    { name:"Cinnamon Roll", price:349, tag:"Warm", img:'images/pastry2.jpg' },
    { name:"Eclair", price:399, tag:"Cream", img:'images/pastry3.jpg' }
  ],
  "Sandwiches": [
    { name:"Chicken Sandwich", price:699, tag:"Lunch", img:'images/sandwich2.jpg' },
    { name:"Club Sandwich", price:799, tag:"Classic", img:'images/sandwich1.jpg' },
    { name:"Veg Sandwich", price:599, tag:"Fresh", img:'images/sandwich.jpg' }
  ]
};

// ===== Helpers =====
function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// ===== Cart badge =====
function getCartCount(){ return parseInt(localStorage.getItem("tb_cart_count") || "0", 10); }
function setCartCount(n){
  localStorage.setItem("tb_cart_count", String(n));
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = String(n));
}
function wireCartBadge(){ setCartCount(getCartCount()); }
function addToCart(){ setCartCount(getCartCount()+1); }

// ===== Category items render =====
function renderCategoryItems(){
  const cat = decodeURIComponent(getParam("cat") || "Bread");
  const list = ITEMS[cat] || [];
  const titleEl = document.querySelector("[data-cat-title]");
  const gridEl = document.querySelector("[data-items-grid]");
  if(titleEl) titleEl.textContent = cat;
  if(!gridEl) return;

  gridEl.innerHTML = list.map((it, idx)=>`
    <div class="card">
      <div class="thumb" style="background-image:url('${it.img}')"></div>
      <div class="body">
        <div class="pill">${it.tag}</div>
        <div class="title">${it.name}</div>
        <div class="small">Freshly prepared. Packed with care.</div>
        <div class="price-row">
          <div class="price">${formatPKR(it.price)}</div>
          <button class="btn primary" type="button" data-add="${idx}">Add to cart</button>
        </div>
      </div>
    </div>
  `).join("");

  gridEl.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", addToCart));
}

// ===== Home hero auto-slides =====
function initHero(){
  const hero = document.querySelector("[data-hero]");
  if(!hero) return;

  const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
  const dots = Array.from(hero.querySelectorAll("[data-hero-dot]"));
  if(!slides.length) return;

  let idx = 0;
  function go(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, j)=> s.classList.toggle("active", j===idx));
    dots.forEach((d, j)=> d.classList.toggle("active", j===idx));
  }

  dots.forEach((d, i)=> d.addEventListener("click", ()=> go(i)));

  let timer = setInterval(()=> go(idx+1), 3000);
  hero.addEventListener("mouseenter", ()=> clearInterval(timer));
  hero.addEventListener("mouseleave", ()=> timer = setInterval(()=> go(idx+1), 3000));

  go(0);
}

// ===== Boot =====
document.addEventListener("DOMContentLoaded", ()=>{
  wireCartBadge();
  initHero();

  if(document.body.dataset.page === "category-items"){
    renderCategoryItems();
  }
});
