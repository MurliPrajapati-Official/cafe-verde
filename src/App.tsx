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
    { name: 'Strawberry Matcha Latte', desc: 'Ceremonial grade stone-ground Uji matcha layered over fresh organic strawberry puree and creamy milk', price: 280, img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop', badge: '🔥 Best Seller' },
    { name: 'Coconut Matcha', desc: 'Refreshing iced ceremonial matcha layered over sweet coconut water—a tropical, energizing treat', price: 260, img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop', badge: '❤️ Most Loved' },
    { name: 'Matcha Cheesecake', desc: 'Rich, velvety baked cheesecake infused with ceremonial matcha on a buttery biscuit base', price: 320, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop', badge: '⭐ Must Try' },
    { name: 'Loaded Veg Nachos', desc: 'Crispy corn tortilla chips piled high with warm cheese sauce, fresh pico de gallo, beans, jalapenos & sour cream', price: 290, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop', badge: '⭐ Fan Favorite' },
  ],
  'Matcha Signatures': [
    { name: 'Strawberry Matcha Latte', desc: 'Ceremonial grade stone-ground Uji matcha layered over fresh organic strawberry puree and creamy milk', price: 280, img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop', badge: '🔥 Best Seller' },
    { name: 'Coconut Matcha', desc: 'Refreshing iced ceremonial matcha layered over sweet coconut water—a tropical, energizing treat', price: 260, img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop', badge: '❤️ Most Loved' },
    { name: 'Traditional Whisk', desc: 'Pure stone-ground Ceremonial Uji Matcha whisked with hot water in a traditional bowl. Rich in antioxidants.', price: 220, img: 'https://images.unsplash.com/photo-1598214886806-c87b2a370944?w=500&auto=format&fit=crop', badge: '🍵 Ceremonial' },
    { name: 'Classic Matcha Latte', desc: 'Ceremonial grade matcha whisked with warm oat milk and a touch of honey', price: 240, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop', badge: '' }
  ],
  'Brews & Coffees': [
    { name: 'Iced Rose Latte', desc: 'Double espresso shot with creamy milk, infused with organic rose water syrup over ice', price: 220, img: 'https://images.unsplash.com/photo-1582730147233-cbd8112f353c?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Espresso', desc: 'Bold, rich double shot of our house blend arabica beans', price: 140, img: 'https://images.unsplash.com/photo-1510707513156-466d22c37848?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Cold Brew Coffee', desc: 'Steeped for 18 hours in cold water, clean-bodied, low-acidity coffee served over ice', price: 180, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop', badge: '' }
  ],
  'Bakes & Desserts': [
    { name: 'Matcha Cheesecake', desc: 'Rich, velvety baked cheesecake infused with ceremonial matcha on a buttery biscuit base', price: 320, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop', badge: '⭐ Must Try' },
    { name: 'Matcha Cookie', desc: 'Fudgy, white chocolate chip cookie infused with green tea matcha, crispy edges with a soft center', price: 120, img: 'https://images.unsplash.com/photo-1620300285425-57fcd5e3a53d?w=500&auto=format&fit=crop', badge: '🍫 Sweet Treat' },
    { name: 'Butter Croissant', desc: 'Flaky, golden, multi-layered French croissant baked fresh every morning', price: 150, img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop', badge: '🥐 Fresh Daily' },
    { name: 'Strawberry Matcha Tart', desc: 'Crisp pastry shell filled with rich matcha ganache and topped with sweet fresh strawberries', price: 180, img: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop', badge: '' }
  ],
  'Savoury Plates': [
    { name: 'Loaded Veg Nachos', desc: 'Crispy corn tortilla chips piled high with warm cheese sauce, fresh pico de gallo, beans, jalapenos & sour cream', price: 290, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop', badge: '⭐ Fan Favorite' },
    { name: 'Crunchy Chicken Sandwich', desc: 'Crispy fried chicken breast, toasted sourdough, house-made herb garlic aioli, pickles & leaf lettuce', price: 320, img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop', badge: '' },
    { name: 'Avocado Sourdough Toast', desc: 'Crushed seasoned avocado, cherry tomatoes, feta cheese crumble, and chili flakes on artisanal sourdough toast', price: 280, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop', badge: '🥑 Healthy' },
    { name: 'Garden Green Salad', desc: 'Fresh crisp mixed greens, avocado slices, cucumber, pumpkin seeds, and a tangy house lemon-herb dressing', price: 240, img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&auto=format&fit=crop', badge: '' }
  ]
};

/* ===== REVIEW DATA ===== */
const reviews = [
  { text: "It’s a great spot in Koregaon Park and I loved the ambience here. A calm and pleasing place in KP for amazing Matcha beverages, delicious food and some mind-blowing desserts. Had a great time here and hoping to visit soon again.", author: "Neeldana Bakshi (Local Guide)", rating: 5 },
  { text: "Matcha Brew & Bake exceeded expectations! 🍴 Food was delicious with great presentation and taste. The ambiance was cozy and perfect for a chill afternoon. Service was on point too! 👍 Would definitely return for more matcha magic and tasty bites.", author: "Beena Pandit (Local Guide)", rating: 5 },
  { text: "Quality, texture, presentation & taste of the food is outstanding. Ambience is beautiful. The best part is they prepare Matcha in front of you and it’s a MUST TRY. I loved their strawberry matcha, coconut matcha & the matcha cheesecake…!", author: "Naqiyah Bohari", rating: 5 },
  { text: "Service was good, we ordered strawberry matcha, iced latte & loaded veg nachos. Loved the flavors and the cozy vibe.", author: "Rahul S.", rating: 5 },
  { text: "Very good place to hangout, good food, atmosphere. The matcha preparation is mesmerizing to watch.", author: "Priya M.", rating: 5 },
  { text: "Crunchy chicken sandwich and a salad along with matcha and a great vibe!! Perfect afternoon spent here.", author: "Arjun K.", rating: 5 },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop', large: true }, // Cafe interior
  { src: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop', large: false }, // Strawberry Matcha
  { src: 'https://images.unsplash.com/photo-1628258334864-3f0817b5e025?w=600&auto=format&fit=crop', large: false }, // Matcha whisking
  { src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop', large: false }, // Matcha cheesecake
  { src: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop', large: true }, // Croissants
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop', large: false }, // Loaded nachos
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
            <Coffee size={20} style={{ display: 'inline', verticalAlign: '-3px', marginRight: '4px', color: 'var(--color-amber)' }} />
            Matcha Brew & Bake
          </a>

          <div className="navbar-links" style={mobileMenu ? { display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(28,40,30,0.97)', justifyContent: 'center', alignItems: 'center', gap: '36px', zIndex: 1001, fontSize: '20px' } : undefined}>
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
                  <FadeIn><span className="label hero-eyebrow">मैचा ब्रेव & बेक • Koregaon Park's Premium Matcha & Cafe</span></FadeIn>
                  <FadeIn delay={0.08}>
                    <h1 className="display-hero">
                      Ceremonial Matcha.<br />
                      <TypingText strings={["Whisked Live.", "Freshly Baked.", "Perfectly Balanced.", "Cozy Vibes."]} />
                    </h1>
                  </FadeIn>
                  <FadeIn delay={0.18}>
                    <p className="subheading hero-subtitle">
                      Indulge in authentic stone-ground Uji matcha whisked live, fresh warm pastries, specialty coffees, and comforting savory eats in Koregaon Park's coziest sanctuary.
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
                      <div className="hero-trust-item"><Star fill="var(--color-amber)" color="var(--color-amber)" size={18} /><span style={{ fontWeight: 700, fontSize: 17 }}>4.7</span><span style={{ opacity: 0.6 }}>Rating</span></div>
                      <div className="hero-trust-divider" />
                      <div className="hero-trust-item"><span style={{ fontWeight: 700 }}>180+</span><span style={{ opacity: 0.6 }}>Reviews</span></div>
                      <div className="hero-trust-divider" />
                      <div className="hero-trust-item"><span style={{ opacity: 0.6 }}>Live Matcha Prep</span></div>
                      <div className="hero-trust-divider" />
                      <div className="hero-trust-item"><span style={{ opacity: 0.6 }}>Dine-In + Cafe Vibe</span></div>
                    </div>
                  </FadeIn>
                </div>
                <div className="hero-visual">
                  <FadeIn delay={0.15}>
                    <div className="img-frame hero-main-frame">
                      <img src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop" alt="Matcha Presentation" />
                    </div>
                  </FadeIn>
                  <img className="hero-float-img hero-float-1" src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&auto=format&fit=crop" alt="Matcha Latte" />
                  <img className="hero-float-img hero-float-2" src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop" alt="Matcha Cheesecake" />
                </div>
              </div>
            </div>
          </section>

          {/* =================== MARQUEE =================== */}
          <div className="marquee-wrap">
            <div className="marquee">
              {Array.from({ length: 8 }).map((_, i) => <span key={i}>MATCHA SIGNATURES • ARTISANAL BAKES • SPECIALTY BREWS • SAVOURY BITES • LIVE MATCH PREPARATION • UJI KYOTO QUALITY • MEERA NAGAR •&nbsp;</span>)}
            </div>
          </div>

          {/* =================== FEATURED FAVORITES =================== */}
          <section className="section" id="favorites">
            <div className="container">
              <FadeIn>
                <div className="section-header">
                  <span className="label">Customer Favorites</span>
                  <h2 className="display-lg">The Dishes Customers Order Again And Again</h2>
                  <p className="subheading">Mesmerizing matcha preparation, freshly baked pastries, and mouthwatering savory selections.</p>
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
                  <p className="subheading">From rich stone-ground lattes to fresh flaky bakes—every dish crafted with quality, care, and precision.</p>
                </div>
              </FadeIn>

              {Object.entries(fullMenu).filter(([cat]) => cat !== 'Best Sellers').map(([category, items], catIdx) => (
                <div key={category} style={{ marginBottom: catIdx < Object.keys(fullMenu).length - 2 ? '64px' : '0' }}>
                  <FadeIn>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-amber-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', flexShrink: 0 }}>
                        {category === 'Matcha Signatures' && <Sparkles size={20} />}
                        {category === 'Brews & Coffees' && <Coffee size={20} />}
                        {category === 'Bakes & Desserts' && <Heart size={20} />}
                        {category === 'Savoury Plates' && <UtensilsCrossed size={20} />}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{category}</h3>
                        <p style={{ fontSize: 'var(--text-sm)', opacity: 0.5 }}>{items.length} items</p>
                      </div>
                      <div style={{ flex: 1, height: '1px', background: 'rgba(28,40,30,0.1)' }} />
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
                      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop" alt="Cafe atmosphere" />
                    </div>
                    <div className="story-stats">
                      <div className="story-stats-number"><Counter end={180} suffix="+" /></div>
                      <div className="story-stats-label">Google Reviews</div>
                    </div>
                  </FadeIn>
                </div>
                <div>
                  <FadeIn>
                    <span className="label">What Makes Us Different</span>
                    <h2 className="display-lg" style={{ marginTop: '12px' }}>A Matcha Sanctuary in Pune</h2>
                    <p className="subheading" style={{ marginTop: '14px', opacity: 0.7 }}>
                      Matcha Brew & Bake brings the rich traditions of Japanese Uji green tea to the vibrant heart of Koregaon Park. We are not just a coffee shop. We are a sanctuary for matcha lovers, pastry foodies, and creators seeking a calm, cozy vibe.
                    </p>
                  </FadeIn>
                  <div className="story-features">
                    {[
                      { icon: <Sparkles size={22} />, title: 'Uji Ceremonial Matcha', desc: 'We source pure, stone-ground green tea directly from Uji, Kyoto—the capital of premium Japanese matcha.' },
                      { icon: <Flame size={22} />, title: 'Live Whisk Preparation', desc: 'Watch our baristas traditionally whisk your ceremonial matcha live at the bar for perfect texture and flavor.' },
                      { icon: <Heart size={22} />, title: 'Baked Fresh Daily', desc: 'Flaky croissants, fudgy matcha cookies, and rich matcha cheesecakes baked daily in-house using premium ingredients.' },
                      { icon: <Shield size={22} />, title: 'Rated 4.7★ by KP Locals', desc: '4.7★ average rating from 180+ reviews. Koregaon Park\'s most loved matcha destination.' },
                      { icon: <Coffee size={22} />, title: 'Cozy Cafe & Hangout Vibe', desc: 'A serene and aesthetically pleasing spot in Meera Nagar to study, work, or relax with friends.' },
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
                  { num: 180, suffix: '+', label: 'Google Reviews' },
                  { num: 4, suffix: '.7 ★', label: 'Average Rating' },
                  { num: 8000, suffix: '+', label: 'Matchas Whisked' },
                  { num: 1, suffix: 'st', label: 'Matcha Bar in KP' },
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
                    <p className="subheading" style={{ marginTop: '8px', opacity: 0.6 }}>If nearly two hundred people recommend this place, it's definitely worth visiting.</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="reviews-big-rating">4.7</div>
                    <div className="reviews-stars">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="var(--color-amber)" color="var(--color-amber)" />)}</div>
                    <div className="reviews-count"><Counter end={180} suffix="+" /> Google Reviews</div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="reviews-track">
                  {reviews.map((r, idx) => (
                    <div key={idx} className="review-card">
                      <div className="review-stars">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill="var(--color-amber)" color="var(--color-amber)" />)}</div>
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
                  <p className="subheading">A glimpse into the textures, flavors, and cozy spaces waiting for you.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="gallery-grid">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className={`gallery-item ${img.large ? 'large' : ''}`}>
                      <img src={img.src} alt={`Matcha Brew and Bake ${idx + 1}`} />
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
                  <h2 className="display-lg">Enjoy Matcha Brew & Bake Your Way</h2>
                </div>
              </FadeIn>
              <div className="experience-grid">
                {[
                  { icon: <UtensilsCrossed size={24} />, title: 'Dine In', desc: 'Serene seating, green views, and traditionally whisked matcha served warm.' },
                  { icon: <Truck size={24} />, title: 'Delivery', desc: 'Fresh drinks and soft croissants sent right to your doorstep via local ordering.' },
                  { icon: <ShoppingBag size={24} />, title: 'Takeaway', desc: 'On the go? Grab an iced matcha latte and fresh cookies in minutes.' },
                  { icon: <CalendarCheck size={24} />, title: 'Reserve a Table', desc: 'Secure the best window seat for your reading, working, or meeting dates.' },
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
                      <div><h4>Address</h4><p>Survey No.21, A/10, B Plot, S Main Rd, Ashok Chakra Society, Meera Nagar, Koregaon Park, Pune, Maharashtra 411001</p></div>
                    </div>
                    <div className="location-item">
                      <div className="location-item-icon"><Clock size={20} /></div>
                      <div><h4>Opening Hours</h4><p>Monday – Sunday: 11:00 AM – 11:00 PM</p></div>
                    </div>
                    <div className="location-item">
                      <div className="location-item-icon"><Phone size={20} /></div>
                      <div><h4>Phone</h4><p>+91 XXXXX XXXXX</p></div>
                    </div>
                    <div className="location-item">
                      <div className="location-item-icon"><Banknote size={20} /></div>
                      <div><h4>Price Range</h4><p>₹600 – ₹1,600 per person</p></div>
                    </div>
                    <a href="https://www.google.com/maps/place/India" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                      <Navigation size={16} /> Get Directions
                    </a>
                  </div>
                  <div className="location-map">
                    <iframe
                      src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed"
                      title="Matcha Brew & Bake Location"
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
                <p className="subheading">Planning an afternoon with friends, study sessions, or work dates? Secure your spot.</p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="tel:+91XXXXXXXXXX" className="btn btn-primary inverted"><PhoneCall size={18} /> Call to Reserve</a>
                  <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp Us</a>
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
                <span className="label">Matcha Menu</span>
                <h2 className="display-lg">Order Your Favorites</h2>
                <p className="subheading">Browse our full selection of matchas, coffees, warm bakes, and savory plates.</p>
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
                <a href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(`Hi! I'd like to order from Matcha Brew & Bake:\n${Object.entries(cart).map(([name, qty]) => `• ${name} x${qty}`).join('\n')}\n\nTotal: ₹${cartTotal}`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-sm">
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
                <Coffee size={18} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 4, color: 'var(--color-amber)' }} />
                Matcha Brew & Bake
              </div>
              <p>Premium stone-ground Uji matcha, artisanal warm bakes, specialty coffees, and delicious savory plates served in Koregaon Park's coziest sanctuary.</p>
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
                <a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a>
                <a href="https://www.google.com/maps/place/India" target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </div>
            <div>
              <h4>Hours</h4>
              <div className="footer-links">
                <span>Monday – Sunday</span>
                <span>11:00 AM – 11:00 PM</span>
                <span style={{ marginTop: 8 }}>₹600 – ₹1,600 per person</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">© 2026 Matcha Brew & Bake, Koregaon Park, Pune. All rights reserved.</div>
        </div>
      </footer>

      {/* =================== MOBILE STICKY BAR =================== */}
      <div className="mobile-bar">
        <div className="mobile-bar-inner">
          <a href="tel:+91XXXXXXXXXX"><PhoneCall size={14} /> Call</a>
          <a href="https://www.google.com/maps/place/India" target="_blank" rel="noopener noreferrer"><Navigation size={14} /> Directions</a>
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
