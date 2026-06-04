import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Star, MapPin, Clock, Phone, ChefHat, Banknote, Users, Zap,
  UtensilsCrossed, Truck, ShoppingBag, CalendarCheck, Navigation,
  PhoneCall, Menu, X, Flame, Heart, Shield, Sparkles, Coffee,
  Sandwich, ArrowRight, Minus, Plus, ShoppingCart
} from 'lucide-react';

/* ===== UTILITY: FADE-IN ON SCROLL ===== */
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

/* ===== UTILITY: TYPING TEXT ===== */
function TypingText({ strings }: { strings: string[] }) {
  const [display, setDisplay] = useState('');
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = strings[si];
    let t: ReturnType<typeof setTimeout>;
    if (!del && ci <= cur.length) { t = setTimeout(() => { setDisplay(cur.substring(0, ci)); setCi(c => c + 1); }, 75); }
    else if (!del && ci > cur.length) { t = setTimeout(() => setDel(true), 2200); }
    else if (del && ci > 0) { t = setTimeout(() => { setCi(c => c - 1); setDisplay(cur.substring(0, ci - 1)); }, 35); }
    else { setDel(false); setSi(i => (i + 1) % strings.length); }
    return () => clearTimeout(t);
  }, [ci, del, si, strings]);
  return <>{display}<span className="cursor-blink">|</span></>;
}

/* ===== UTILITY: COUNTER ===== */
function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = Math.max(1, Math.ceil(end / 50));
        const iv = setInterval(() => { s += step; if (s >= end) { s = end; clearInterval(iv); } setCount(s); }, 25);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ===== MENU DATA ===== */
const fullMenu = {
  'Best Sellers': [
    { name: 'Paneer Wrap', desc: 'Grilled paneer stuffed in a warm tortilla with fresh veggies & tangy chutney', price: 150, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop', badge: '🔥 Best Seller' },
    { name: 'Punjabi Burger', desc: 'Desi-spiced patty loaded with crunchy onions, tikka sauce & fresh lettuce', price: 160, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop', badge: '❤️ Most Loved' },
    { name: 'Cheese Loaded Fries', desc: 'Crispy golden fries smothered in melted cheese sauce & seasonings', price: 130, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop', badge: '⭐ Fan Favorite' },
    { name: 'Cold Coffee', desc: 'Creamy blended coffee with chocolate drizzle & whipped cream', price: 90, img: 'https://images.unsplash.com/photo-1461023058943-0708e5cc6929?w=500&auto=format&fit=crop', badge: '' },
  ],
  Burgers: [
    { name: 'Punjabi Burger', desc: 'Desi-spiced patty loaded with crunchy onions, tikka sauce & fresh lettuce', price: 160, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop', badge: '❤️ Most Loved' },
    { name: 'Giga Bite Veg Burger', desc: 'Oversized crispy veg patty with double cheese, pickles & special sauce', price: 220, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&auto=format&fit=crop', badge: '🔥 Mega Size' },
  ],
  Wraps: [
    { name: 'Paneer Wrap', desc: 'Grilled paneer stuffed in a warm tortilla with fresh veggies & tangy chutney', price: 150, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop', badge: '🔥 Best Seller' },
    { name: 'Burger Wrap', desc: 'Crispy burger patty rolled in a soft wrap with cheese, lettuce & mayo', price: 140, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop', badge: '' },
  ],
  Fries: [
    { name: 'French Fries', desc: 'Classic crispy golden fries seasoned with salt & served hot', price: 90, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Cheese Loaded Fries', desc: 'Crispy fries smothered in melted cheese sauce & seasonings', price: 130, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop', badge: '⭐ Fan Favorite' },
    { name: 'Peri Peri Fries with Cheese', desc: 'Spicy peri peri seasoned fries topped with gooey cheese drizzle', price: 140, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Fries with Coke', desc: 'Classic fries combo served with a chilled Coca-Cola', price: 130, img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop', badge: '🥤 Combo' },
  ],
  Pizza: [
    { name: 'Pizza Toast', desc: 'Toasted bread topped with pizza sauce, mozzarella & mixed veggies', price: 100, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Tandoori Pizza', desc: 'Indian-spiced tandoori veggies on a crispy pizza base with mozzarella', price: 200, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Pizza Margherita', desc: 'Classic Italian — fresh tomato sauce, mozzarella & basil on thin crust', price: 180, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Tandoori Paneer Pizza', desc: 'Smoky tandoori paneer with capsicum, onion & spicy tikka sauce', price: 220, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop', badge: '🌶️ Spicy' },
  ],
  'Sides & Snacks': [
    { name: 'Corn and Cheese', desc: 'Sweet corn kernels tossed with butter, cheese & a dash of spices', price: 110, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Paneer Salad', desc: 'Fresh greens with grilled paneer cubes, cherry tomatoes & tangy dressing', price: 130, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Warm Up Sandwich', desc: 'Toasted sandwich with mixed fillings, cheese & herbs served warm', price: 110, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop', badge: '' },
  ],
  'Beverages & Desserts': [
    { name: 'Cold Coffee', desc: 'Creamy blended coffee with chocolate drizzle & whipped cream', price: 90, img: 'https://images.unsplash.com/photo-1461023058943-0708e5cc6929?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Choco Lava Cake', desc: 'Warm chocolate cake with a molten gooey center, served fresh', price: 120, img: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&auto=format&fit=crop', badge: '🍫 Sweet Treat' },
  ],
};

/* ===== REVIEW DATA ===== */
const reviews = [
  { text: "Freshly cooked food in hygienic conditions. The burger was absolutely amazing and the fries were perfectly crispy! We'll definitely be back.", author: "Rahul S.", rating: 5 },
  { text: "Amazing atmosphere and extraordinary taste. Best affordable fast food in Rohini. My family loves coming here every weekend.", author: "Priya M.", rating: 5 },
  { text: "Pocket-friendly and delicious. The paneer wrap is my absolute favorite — fresh ingredients every single time. Can't recommend enough!", author: "Arjun K.", rating: 4 },
  { text: "Great food, great vibe. The cold coffee is unbeatable and the garlic cheese fries are addictive! This place has a chill atmosphere.", author: "Sneha T.", rating: 5 },
  { text: "One of the best places to eat in Rohini. Consistent quality over years. The staff is always friendly and soft spoken.", author: "Amit P.", rating: 5 },
  { text: "The burgers here are better than many premium chains. And the prices are so reasonable! Perfect for students like us.", author: "Kavya R.", rating: 4 },
  { text: "Cute place with amazing food. Perfect hangout spot for friends. The pizza sandwich is an underrated gem here.", author: "Deepak V.", rating: 5 },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop', large: true },
  { src: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop', large: false },
  { src: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop', large: false },
  { src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop', large: false },
  { src: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop', large: true },
  { src: 'https://images.unsplash.com/photo-1461023058943-0708e5cc6929?w=600&auto=format&fit=crop', large: false },
];

/* ===== MAIN APP ===== */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [page, setPage] = useState<'home' | 'order'>('home');
  const [activeTab, setActiveTab] = useState('Best Sellers');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [previewItem, setPreviewItem] = useState<any>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [name, qty]) => {
    for (const items of Object.values(fullMenu)) {
      const found = items.find(i => i.name === name);
      if (found) return sum + found.price * qty;
    }
    return sum;
  }, 0);

  const addToCart = (name: string) => setCart(c => ({ ...c, [name]: (c[name] || 0) + 1 }));
  const removeFromCart = (name: string) => setCart(c => {
    const n = { ...c };
    if (n[name] > 1) n[name]--;
    else delete n[name];
    return n;
  });

  const navTo = (target: string) => {
    setMobileMenu(false);
    if (target === 'order') { setPage('order'); return; }
    if (page !== 'home') { setPage('home'); setTimeout(() => { document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }); }, 100); }
    else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* =================== NAVBAR =================== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a onClick={() => { setPage('home'); }} className="navbar-logo" style={{ cursor: 'pointer' }}>
            <Flame size={20} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '4px', color: 'var(--color-amber)' }} />
            Grill Masters
          </a>

          <div className="navbar-links" style={mobileMenu ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(50,30,30,0.97)', justifyContent: 'center', alignItems: 'center', gap: '36px', zIndex: 1001, fontSize: '20px' } : undefined}>
            {mobileMenu && <button onClick={() => setMobileMenu(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'var(--color-linen)', cursor: 'pointer' }}><X size={28} /></button>}
            <a onClick={() => navTo('full-menu')} style={{ cursor: 'pointer' }}>Menu</a>
            <a onClick={() => navTo('reviews')} style={{ cursor: 'pointer' }}>Reviews</a>
            <a onClick={() => navTo('gallery')} style={{ cursor: 'pointer' }}>Gallery</a>
            <a onClick={() => navTo('location')} style={{ cursor: 'pointer' }}>Visit Us</a>
            <a onClick={() => navTo('order')} className="btn btn-primary inverted nav-cta" style={{ cursor: 'pointer' }}>
              <ShoppingBag size={16} /> Order Now
              {cartCount > 0 && <span style={{ background: 'var(--color-amber)', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginLeft: 4 }}>{cartCount}</span>}
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenu(true)}><Menu size={24} /></button>
        </div>
      </nav>

      {page === 'home' ? (
        <>
          {/* =================== HERO =================== */}
          <section className="hero" id="hero">
            <div className="container">
              <div className="hero-grid">
                <div className="hero-content">
                  <FadeIn><span className="label hero-eyebrow">Rohini's Favorite Fast Food</span></FadeIn>
                  <FadeIn delay={0.08}>
                    <h1 className="display-hero">
                      Freshly Grilled.<br />
                      <TypingText strings={["Freshly Served.", "Always Tasty.", "Made For You.", "Pocket-Friendly."]} />
                    </h1>
                  </FadeIn>
                  <FadeIn delay={0.18}>
                    <p className="subheading hero-subtitle">
                      From loaded burgers and cheesy fries to wraps and shakes — every order is prepared fresh and served with flavor that keeps customers coming back.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.26}>
                    <div className="hero-ctas">
                      <a onClick={() => setPage('order')} className="btn btn-primary inverted" style={{ cursor: 'pointer' }}><ShoppingBag size={18} /> Order Now</a>
                      <a href="#reservation" className="btn btn-ghost"><CalendarCheck size={18} /> Reserve Table</a>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.34}>
                    <div className="hero-trust">
                      <div className="hero-trust-item"><Star fill="#c4843e" color="#c4843e" size={18} /><span style={{ fontWeight: 700, fontSize: 17 }}>4.3</span><span style={{ opacity: 0.6 }}>Rating</span></div>
                      <div className="hero-trust-divider" />
                      <div className="hero-trust-item"><span style={{ fontWeight: 700 }}>996+</span><span style={{ opacity: 0.6 }}>Reviews</span></div>
                      <div className="hero-trust-divider" />
                      <div className="hero-trust-item"><span style={{ opacity: 0.6 }}>Fresh Daily</span></div>
                      <div className="hero-trust-divider" />
                      <div className="hero-trust-item"><span style={{ opacity: 0.6 }}>Dine-In + Delivery</span></div>
                    </div>
                  </FadeIn>
                </div>
                <div className="hero-visual">
                  <FadeIn delay={0.15}>
                    <div className="img-frame hero-main-frame">
                      <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" alt="Gourmet burger" />
                    </div>
                  </FadeIn>
                  <img className="hero-float-img hero-float-1" src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop" alt="Fries" />
                  <img className="hero-float-img hero-float-2" src="https://images.unsplash.com/photo-1461023058943-0708e5cc6929?w=300&auto=format&fit=crop" alt="Cold coffee" />
                </div>
              </div>
            </div>
          </section>

          {/* =================== MARQUEE =================== */}
          <div className="marquee-wrap">
            <div className="marquee">
              {Array.from({ length: 8 }).map((_, i) => <span key={i}>BURGERS • WRAPS • FRIES • SHAKES • SANDWICHES • INDIAN FLAVORS • FRESH DAILY •&nbsp;</span>)}
            </div>
          </div>

          {/* =================== FEATURED FAVORITES =================== */}
          <section className="section" id="favorites">
            <div className="container">
              <FadeIn>
                <div className="section-header">
                  <span className="label">Customer Favorites</span>
                  <h2 className="display-lg">The Dishes Customers Order Again And Again</h2>
                  <p className="subheading">Freshly prepared, generously portioned, and always packed with flavor.</p>
                </div>
              </FadeIn>
              <div className="food-grid">
                {fullMenu['Best Sellers'].map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 0.08}>
                    <div className="food-card" onClick={() => setPreviewItem(item)} style={{ cursor: 'pointer' }}>
                      <div className="food-card-img-wrap">
                        <img className="food-card-img" src={item.img} alt={item.name} />
                        {item.badge && <div className="food-card-badge">{item.badge}</div>}
                      </div>
                      <div className="food-card-body">
                        <h3 className="food-card-name">{item.name}</h3>
                        <p className="food-card-desc">{item.desc}</p>
                        <div className="food-card-footer">
                          <span className="food-card-price">₹{item.price}</span>
                          <button className="btn btn-primary btn-xs" onClick={(e) => { e.stopPropagation(); addToCart(item.name); }}>Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={0.3}>
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                  <a onClick={() => setPage('order')} className="btn btn-ghost-dark" style={{ cursor: 'pointer' }}>View Full Menu <ArrowRight size={16} /></a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* =================== FULL MENU SECTION =================== */}
          <section className="section" style={{ background: '#fff' }} id="full-menu">
            <div className="container">
              <FadeIn>
                <div className="section-header centered">
                  <span className="label">Our Menu</span>
                  <h2 className="display-lg">Explore The Full Menu</h2>
                  <p className="subheading">From burgers and wraps to fries and shakes — everything freshly made, everything affordable.</p>
                </div>
              </FadeIn>

              {Object.entries(fullMenu).filter(([cat]) => cat !== 'Best Sellers').map(([category, items], catIdx) => (
                <div key={category} style={{ marginBottom: catIdx < Object.keys(fullMenu).length - 2 ? '64px' : '0' }}>
                  <FadeIn>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-amber-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', flexShrink: 0 }}>
                        {category === 'Burgers' && <Flame size={20} />}
                        {category === 'Wraps' && <Sandwich size={20} />}
                        {category === 'Fries' && <Sparkles size={20} />}
                        {category === 'Pizza' && <UtensilsCrossed size={20} />}
                        {category === 'Sides & Snacks' && <Heart size={20} />}
                        {category === 'Beverages & Desserts' && <Coffee size={20} />}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{category}</h3>
                        <p style={{ fontSize: 'var(--text-sm)', opacity: 0.5 }}>{items.length} items</p>
                      </div>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(50,30,30,0.1)' }} />
                    </div>
                  </FadeIn>

                  <div className="food-grid">
                    {items.map((item, idx) => (
                      <FadeIn key={idx} delay={idx * 0.06}>
                        <div className="food-card" onClick={() => setPreviewItem(item)} style={{ cursor: 'pointer' }}>
                          <div className="food-card-img-wrap">
                            <img className="food-card-img" src={item.img} alt={item.name} />
                            {item.badge && <div className="food-card-badge">{item.badge}</div>}
                          </div>
                          <div className="food-card-body">
                            <h3 className="food-card-name">{item.name}</h3>
                            <p className="food-card-desc">{item.desc}</p>
                            <div className="food-card-footer">
                              <span className="food-card-price">₹{item.price}</span>
                              {cart[item.name] ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <button className="btn btn-xs btn-ghost-dark" style={{ padding: '5px 9px' }} onClick={(e) => { e.stopPropagation(); removeFromCart(item.name); }}><Minus size={13} /></button>
                                  <span style={{ fontWeight: 700, minWidth: 16, textAlign: 'center', fontSize: 'var(--text-sm)' }}>{cart[item.name]}</span>
                                  <button className="btn btn-xs btn-primary" style={{ padding: '5px 9px' }} onClick={(e) => { e.stopPropagation(); addToCart(item.name); }}><Plus size={13} /></button>
                                </div>
                              ) : (
                                <button className="btn btn-primary btn-xs" onClick={(e) => { e.stopPropagation(); addToCart(item.name); }}>Add</button>
                              )}
                            </div>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =================== WHY US / OUR STORY =================== */}
          <section className="section" style={{ background: 'var(--color-linen)' }} id="why-us">
            <div className="container">
              <div className="story-grid">
                <div className="story-visual">
                  <FadeIn>
                    <div className="img-frame-alt img-frame" style={{ aspectRatio: '4/5' }}>
                      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" alt="Restaurant atmosphere" />
                    </div>
                    <div className="story-stats">
                      <div className="story-stats-number"><Counter end={996} suffix="+" /></div>
                      <div className="story-stats-label">Happy Customers</div>
                    </div>
                  </FadeIn>
                </div>
                <div>
                  <FadeIn>
                    <span className="label">What Makes Us Different</span>
                    <h2 className="display-lg" style={{ marginTop: '12px' }}>Not Just Another Fast Food Joint</h2>
                    <p className="subheading" style={{ marginTop: '14px', opacity: 0.7 }}>
                      Grill Masters is affordable Indian-style fast food with a premium taste experience. We're not a chain. We're not fine dining. We're restaurant-quality food at prices that work for students, families, and everyone in between.
                    </p>
                  </FadeIn>
                  <div className="story-features">
                    {[
                      { icon: <Sparkles size={22} />, title: 'Fresh, Never Frozen', desc: 'Every order prepared fresh when you order it. No pre-made patties, no heat-and-serve shortcuts.' },
                      { icon: <Heart size={22} />, title: 'Indian Flavors, Global Format', desc: 'Indian-spiced burgers, masala wraps, and desi cheese fries. Familiar formats with bold local taste.' },
                      { icon: <Banknote size={22} />, title: 'Pocket-Friendly Pricing', desc: 'Full meals under ₹200. Great food shouldn\'t empty your wallet. Period.' },
                      { icon: <Shield size={22} />, title: 'Trusted By Hundreds', desc: '4.3★ from 996+ Google reviews. Nearly a thousand customers publicly recommend us.' },
                      { icon: <Coffee size={22} />, title: 'Chill Vibe, Friendly Staff', desc: 'A cute hangout spot with soft-spoken staff. Not just food — an experience worth coming back to.' },
                    ].map((f, idx) => (
                      <FadeIn key={idx} delay={idx * 0.08}>
                        <div className="story-feature">
                          <div className="story-feature-icon">{f.icon}</div>
                          <div>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================== STATS BAR =================== */}
          <div className="stats-bar">
            <div className="container">
              <div className="stats-grid">
                {[
                  { num: 996, suffix: '+', label: 'Google Reviews' },
                  { num: 4, suffix: '.3 ★', label: 'Average Rating' },
                  { num: 5000, suffix: '+', label: 'Orders Served' },
                  { num: 5, suffix: '+', label: 'Years Serving Rohini' },
                ].map((s, idx) => (
                  <FadeIn key={idx} delay={idx * 0.08}>
                    <div><div className="stat-item-number"><Counter end={s.num} suffix={s.suffix} /></div><div className="stat-item-label">{s.label}</div></div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* =================== REVIEWS =================== */}
          <section className="section reviews-section" id="reviews">
            <div className="container">
              <FadeIn>
                <div className="reviews-header-row">
                  <div>
                    <span className="label" style={{ color: 'var(--color-amber-light)' }}>Customer Reviews</span>
                    <h2 className="display-lg" style={{ marginTop: '10px' }}>Loved By Local Foodies</h2>
                    <p className="subheading" style={{ marginTop: '8px', opacity: 0.6 }}>If almost a thousand people recommend this place, it's probably worth trying.</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="reviews-big-rating">4.3</div>
                    <div className="reviews-stars">{[1,2,3,4].map(i => <Star key={i} size={18} fill="#c4843e" color="#c4843e" />)}<Star size={18} fill="none" color="#c4843e" /></div>
                    <div className="reviews-count"><Counter end={996} suffix="+" /> Google Reviews</div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="reviews-track">
                  {reviews.map((r, idx) => (
                    <div key={idx} className="review-card">
                      <div className="review-stars">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill="#c4843e" color="#c4843e" />)}</div>
                      <p className="review-text">"{r.text}"</p>
                      <p className="review-author">— {r.author}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>

          {/* =================== GALLERY =================== */}
          <section className="section" id="gallery">
            <div className="container">
              <FadeIn>
                <div className="section-header">
                  <span className="label">Food Gallery</span>
                  <h2 className="display-lg">A Feast For The Eyes</h2>
                  <p className="subheading">A glimpse into the flavors, textures, and experiences waiting for you.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="gallery-grid">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className={`gallery-item ${img.large ? 'large' : ''}`}>
                      <img src={img.src} alt={`Grill Masters food ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>

          {/* =================== EXPERIENCE =================== */}
          <section className="section" style={{ background: '#fff' }} id="experience">
            <div className="container">
              <FadeIn>
                <div className="section-header centered">
                  <span className="label">How To Enjoy</span>
                  <h2 className="display-lg">Enjoy Grill Masters Your Way</h2>
                </div>
              </FadeIn>
              <div className="experience-grid">
                {[
                  { icon: <UtensilsCrossed size={24} />, title: 'Dine In', desc: 'Comfortable seating, chill vibe, and food served fresh at your table.' },
                  { icon: <Truck size={24} />, title: 'Delivery', desc: 'Hot and fresh to your doorstep. No-contact delivery available.' },
                  { icon: <ShoppingBag size={24} />, title: 'Takeaway', desc: 'Grab and go. Packed fresh and ready in minutes.' },
                  { icon: <CalendarCheck size={24} />, title: 'Reserve a Table', desc: 'Planning ahead? Book your table for a guaranteed seat.' },
                ].map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 0.08}>
                    <div className="experience-card">
                      <div className="experience-icon">{item.icon}</div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* =================== LOCATION =================== */}
          <section className="section" id="location">
            <div className="container">
              <FadeIn>
                <div className="section-header">
                  <span className="label">Find Us</span>
                  <h2 className="display-lg">Visit Us Today</h2>
                </div>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="location-grid">
                  <div className="location-info">
                    <div className="location-item">
                      <div className="location-item-icon"><MapPin size={20} /></div>
                      <div><h4>Address</h4><p>Grill Masters, Sector 9, Rohini, New Delhi, Delhi 110085</p></div>
                    </div>
                    <div className="location-item">
                      <div className="location-item-icon"><Clock size={20} /></div>
                      <div><h4>Opening Hours</h4><p>Monday – Sunday: 11:00 AM – 11:00 PM</p></div>
                    </div>
                    <div className="location-item">
                      <div className="location-item-icon"><Phone size={20} /></div>
                      <div><h4>Phone</h4><p>+91 98765 43210</p></div>
                    </div>
                    <div className="location-item">
                      <div className="location-item-icon"><Banknote size={20} /></div>
                      <div><h4>Price Range</h4><p>₹200 – ₹400 per person</p></div>
                    </div>
                    <a href="https://www.google.com/maps/place/Grill+Masters/@28.7262884,77.094801,953m/data=!3m1!1e3!4m7!3m6!1s0x390d06c9df3b8811:0x939a63bdc1b8b6a0!4b1!8m2!3d28.7262884!4d77.094801!16s%2Fg%2F11fyx99t32?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                      <Navigation size={16} /> Get Directions
                    </a>
                  </div>
                  <div className="location-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.9!2d77.094801!3d28.7262884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d06c9df3b8811%3A0x939a63bdc1b8b6a0!2sGrill%20Masters!5e0!3m2!1sen!2sin!4v1700000000000"
                      title="Grill Masters Location"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* =================== RESERVATION CTA =================== */}
          <section className="section reservation-cta" id="reservation">
            <div className="container reservation-inner">
              <FadeIn>
                <span className="label" style={{ color: 'var(--color-amber-light)' }}>Reservations</span>
                <h2 className="display-lg" style={{ marginTop: '12px' }}>Reserve Your Table</h2>
                <p className="subheading">Planning a meal with family or friends? Secure your table before you arrive.</p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="tel:+919876543210" className="btn btn-primary inverted"><PhoneCall size={18} /> Call to Reserve</a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp Us</a>
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      ) : (
        /* =================== ORDER PAGE =================== */
        <div className="order-page">
          <div className="container">
            <FadeIn>
              <div style={{ marginBottom: '8px' }}>
                <a onClick={() => setPage('home')} style={{ cursor: 'pointer', opacity: 0.6, fontSize: 'var(--text-sm)' }}>← Back to Home</a>
              </div>
              <div className="section-header">
                <span className="label">Full Menu</span>
                <h2 className="display-lg">Order Your Favorites</h2>
                <p className="subheading">Browse our complete menu. Add items to cart and place your order.</p>
              </div>
            </FadeIn>

            <div className="menu-tabs">
              {Object.keys(fullMenu).map(tab => (
                <button key={tab} className={`menu-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>

            <div className="menu-grid">
              {(fullMenu[activeTab as keyof typeof fullMenu] || []).map((item, idx) => (
                <FadeIn key={`${activeTab}-${idx}`} delay={idx * 0.05}>
                  <div className="menu-item-card" onClick={() => setPreviewItem(item)} style={{ cursor: 'pointer' }}>
                    <div style={{ overflow: 'hidden' }}>
                      <img className="menu-item-img" src={item.img} alt={item.name} />
                    </div>
                    <div className="menu-item-body">
                      <div className="menu-item-name">{item.name}</div>
                      {item.badge && <span style={{ fontSize: 11, color: 'var(--color-amber)', fontWeight: 600 }}>{item.badge}</span>}
                      <div className="menu-item-desc">{item.desc}</div>
                      <div className="menu-item-bottom">
                        <span className="menu-item-price">₹{item.price}</span>
                        {cart[item.name] ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <button className="btn btn-xs btn-ghost-dark" style={{ padding: '6px 10px' }} onClick={(e) => { e.stopPropagation(); removeFromCart(item.name); }}><Minus size={14} /></button>
                            <span style={{ fontWeight: 700, minWidth: 18, textAlign: 'center' }}>{cart[item.name]}</span>
                            <button className="btn btn-xs btn-primary" style={{ padding: '6px 10px' }} onClick={(e) => { e.stopPropagation(); addToCart(item.name); }}><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button className="btn btn-primary btn-xs" onClick={(e) => { e.stopPropagation(); addToCart(item.name); }}>Add</button>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {cartCount > 0 && (
              <div className="cart-summary">
                <div className="cart-summary-info">
                  <div className="cart-badge">{cartCount}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{cartCount} item{cartCount > 1 ? 's' : ''} in cart</div>
                    <div style={{ fontSize: 'var(--text-sm)', opacity: 0.7 }}>Total: ₹{cartTotal}</div>
                  </div>
                </div>
                <a href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I'd like to order from Grill Masters:\n${Object.entries(cart).map(([name, qty]) => `• ${name} x${qty}`).join('\n')}\n\nTotal: ₹${cartTotal}`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-sm">
                  <ShoppingCart size={16} /> Place Order via WhatsApp
                </a>
              </div>
            )}
          </div>
          <div style={{ height: '80px' }} />
        </div>
      )}

      {/* =================== FOOTER =================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ fontSize: 22, fontWeight: 700 }}>
                <Flame size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 4, color: 'var(--color-amber)' }} />
                Grill Masters
              </div>
              <p>Affordable Indian-style fast food with a premium taste experience. Great food shouldn't be expensive. Fresh ingredients, bold flavors, and friendly service — right here in Rohini.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <div className="footer-links">
                <a onClick={() => navTo('hero')} style={{ cursor: 'pointer' }}>Home</a>
                <a onClick={() => navTo('order')} style={{ cursor: 'pointer' }}>Order Online</a>
                <a onClick={() => navTo('favorites')} style={{ cursor: 'pointer' }}>Menu</a>
                <a onClick={() => navTo('reviews')} style={{ cursor: 'pointer' }}>Reviews</a>
                <a onClick={() => navTo('gallery')} style={{ cursor: 'pointer' }}>Gallery</a>
              </div>
            </div>
            <div>
              <h4>Contact</h4>
              <div className="footer-links">
                <a href="tel:+919876543210">+91 98765 43210</a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href="https://www.google.com/maps/place/Grill+Masters/@28.7262884,77.094801" target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </div>
            <div>
              <h4>Hours</h4>
              <div className="footer-links">
                <span>Monday – Sunday</span>
                <span>11:00 AM – 11:00 PM</span>
                <span style={{ marginTop: 8 }}>₹200 – ₹400 per person</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">© 2026 Grill Masters, Rohini, Delhi. All rights reserved.</div>
        </div>
      </footer>

      {/* =================== MOBILE STICKY BAR =================== */}
      <div className="mobile-bar">
        <div className="mobile-bar-inner">
          <a href="tel:+919876543210"><PhoneCall size={14} /> Call</a>
          <a href="https://www.google.com/maps/place/Grill+Masters/@28.7262884,77.094801,953m/data=!3m1!1e3!4m7!3m6!1s0x390d06c9df3b8811:0x939a63bdc1b8b6a0!4b1!8m2!3d28.7262884!4d77.094801!16s%2Fg%2F11fyx99t32?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer"><Navigation size={14} /> Directions</a>
          <a onClick={() => setPage('order')} className="primary" style={{ cursor: 'pointer' }}><ShoppingBag size={14} /> Order</a>
        </div>
      </div>
      {/* =================== PREVIEW MODAL =================== */}
      <div className={`preview-overlay ${previewItem ? 'active' : ''}`} onClick={() => setPreviewItem(null)}>
        {previewItem && (
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <img className="preview-modal-img" src={previewItem.img} alt={previewItem.name} />
            <div className="preview-modal-body">
              <button className="preview-modal-close" onClick={() => setPreviewItem(null)}><X size={20} /></button>
              <h3 className="preview-modal-name">{previewItem.name}</h3>
              <p className="preview-modal-desc">{previewItem.desc}</p>
              <div className="preview-modal-price">₹{previewItem.price}</div>
              {cart[previewItem.name] ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button className="btn btn-ghost-dark" style={{ padding: '12px 16px' }} onClick={() => removeFromCart(previewItem.name)}><Minus size={18} /></button>
                  <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center', fontSize: 'var(--text-lg)' }}>{cart[previewItem.name]}</span>
                  <button className="btn btn-primary" style={{ padding: '12px 16px' }} onClick={() => addToCart(previewItem.name)}><Plus size={18} /></button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => addToCart(previewItem.name)}><ShoppingBag size={18} /> Add to Cart</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
