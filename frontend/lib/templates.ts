export function getShopifyTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AuraGlow Luxury Apparel Store</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background-color: #0c0a09; font-family: 'Plus Jakarta Sans', sans-serif; color: #f5f5f4; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300">
  
  <!-- SECTION 1: HEADER -->
  <header class="px-8 py-5 border-b border-stone-800 bg-stone-950 flex justify-between items-center max-w-7xl mx-auto w-full">
    <div class="text-base font-extrabold tracking-wider uppercase text-white flex items-center gap-1.5">
      <span class="w-3.5 h-3.5 bg-emerald-500 rounded-sm"></span> AURAGLOW
    </div>
    <nav class="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-400">
      <a href="#new" class="hover:text-emerald-400 transition">New Arrivals</a>
      <a href="#collections" class="hover:text-emerald-400 transition">Collections</a>
      <a href="#trending" class="hover:text-emerald-400 transition">Trending</a>
      <a href="#about" class="hover:text-emerald-400 transition">Our Values</a>
    </nav>
    <div class="flex items-center gap-4 text-xs font-bold">
      <button class="text-stone-400 hover:text-white transition">Cart (0)</button>
      <button class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition">Shop All</button>
    </div>
  </header>

  <!-- SECTION 2: HERO & CTA -->
  <section class="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div class="space-y-6">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3.5 py-1.5 rounded-full">New Season Collection</span>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
        Elevate Your <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Daily Wardrobe</span>
      </h1>
      <p class="text-stone-400 text-sm leading-relaxed max-w-md">
        Minimalist silhouettes, sustainable Italian organic materials, and engineered comfort details made for the modern lifestyle.
      </p>
      <div class="flex gap-4">
        <button class="bg-white hover:bg-stone-200 text-stone-950 font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-md">Explore New Drops</button>
        <button class="bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 font-semibold text-xs px-6 py-3.5 rounded-xl transition">View Catalog</button>
      </div>
    </div>
    <div class="relative rounded-3xl bg-stone-900 border border-stone-800 p-8 h-80 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 to-transparent"></div>
      <div class="text-stone-700 text-9xl font-bold select-none absolute top-10">GLOW</div>
      <div class="z-10 text-center space-y-2">
        <div class="text-3xl">🧥</div>
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-400">Minimal Tech Coat</div>
        <div class="text-stone-500 text-[10px]">Waterproof Shell • 100% Organic</div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: STORE TELEMETRY BENEFITS -->
  <section class="py-8 bg-stone-950 border-y border-stone-900">
    <div class="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center text-xs">
      <div>
        <div class="font-bold text-white text-sm">Carbon Neutral</div>
        <div class="text-stone-500 mt-0.5">100% Offset logistics</div>
      </div>
      <div>
        <div class="font-bold text-white text-sm">Free Global Shipping</div>
        <div class="text-stone-500 mt-0.5">On orders over $150</div>
      </div>
      <div>
        <div class="font-bold text-white text-sm">Lifetime Warranty</div>
        <div class="text-stone-500 mt-0.5">Free repairs on all coats</div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: PRODUCT CATEGORIES -->
  <section id="collections" class="py-24 max-w-5xl mx-auto px-6 space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-extrabold text-white tracking-tight">Shop by Collection</h2>
      <p class="text-xs text-stone-500">Explore curated product sets built for versatility.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-3 hover:border-emerald-500/30 transition duration-300">
        <div class="text-2xl">🥋</div>
        <h3 class="font-bold text-white text-base">Outerwear</h3>
        <p class="text-stone-500 text-xs leading-relaxed">Insulated tech shells, wind coats, and casual parkas.</p>
      </div>
      <div class="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-3 hover:border-emerald-500/30 transition duration-300">
        <div class="text-2xl">🎒</div>
        <h3 class="font-bold text-white text-base">Bags & Luggage</h3>
        <p class="text-stone-500 text-xs leading-relaxed">Minimal modular backpacks and premium leather goods.</p>
      </div>
      <div class="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-3 hover:border-emerald-500/30 transition duration-300">
        <div class="text-2xl">👟</div>
        <h3 class="font-bold text-white text-base">Footwear</h3>
        <p class="text-stone-500 text-xs leading-relaxed">Engineered knit sneakers and classic waterproof boots.</p>
      </div>
    </div>
  </section>

  <!-- SECTION 5: TRENDING PRODUCTS GRID -->
  <section id="trending" class="py-24 bg-stone-950/40 border-y border-stone-900">
    <div class="max-w-5xl mx-auto px-6 space-y-16">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-extrabold text-white tracking-tight">Trending Items</h2>
        <p class="text-xs text-stone-500">Popular items according to community purchases this week.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div class="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-4">
          <div class="h-44 rounded-xl bg-stone-950 flex items-center justify-center text-4xl">🧥</div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-white text-sm">Minimal Tech Shell</h4>
              <p class="text-[10px] text-stone-500 mt-0.5">Charcoal Black</p>
            </div>
            <span class="text-sm font-extrabold text-emerald-450">$185</span>
          </div>
          <button class="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2 rounded-lg transition">Add to Cart</button>
        </div>
        <div class="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-4">
          <div class="h-44 rounded-xl bg-stone-950 flex items-center justify-center text-4xl">👜</div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-white text-sm">Modular Day Pack</h4>
              <p class="text-[10px] text-stone-500 mt-0.5">Slate grey</p>
            </div>
            <span class="text-sm font-extrabold text-emerald-450">$120</span>
          </div>
          <button class="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2 rounded-lg transition">Add to Cart</button>
        </div>
        <div class="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-4">
          <div class="h-44 rounded-xl bg-stone-950 flex items-center justify-center text-4xl">🧢</div>
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-white text-sm">Waterproof Cap</h4>
              <p class="text-[10px] text-stone-500 mt-0.5">Sand Beige</p>
            </div>
            <span class="text-sm font-extrabold text-emerald-450">$45</span>
          </div>
          <button class="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold py-2 rounded-lg transition">Add to Cart</button>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: DESIGN STANDARDS / SUSTAINABILITY -->
  <section id="about" class="py-24 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div class="space-y-4">
      <h2 class="text-2xl font-extrabold text-white tracking-tight">Our Sustainability Ethos</h2>
      <p class="text-stone-400 text-xs leading-relaxed">
        We partner directly with certified organic Italian weaving mills. By removing intermediaries, we ensure all staff receive living wages while utilizing strictly certified recycled fibers.
      </p>
      <div class="space-y-2">
        <div class="text-xs text-stone-300 font-semibold flex items-center gap-2">✓ Global Organic Textile Standard Certified</div>
        <div class="text-xs text-stone-300 font-semibold flex items-center gap-2">✓ Fair Trade Workplace Approved</div>
      </div>
    </div>
    <div class="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 text-center space-y-3">
      <div class="text-3xl">🌱</div>
      <h4 class="font-bold text-white text-base">Carbon Zero Staging</h4>
      <p class="text-[10px] text-stone-500">Every single parcel shipped from our Florence depot is carbon offset through verified wind farm reforestation partnerships.</p>
    </div>
  </section>

  <!-- SECTION 7: INTERACTIVE REVIEWS CAROUSEL -->
  <section class="py-24 bg-stone-950 border-t border-stone-900">
    <div class="max-w-4xl mx-auto px-6 space-y-12">
      <h2 class="text-2xl font-extrabold text-white tracking-tight text-center">Loved by the Community</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div class="p-6 bg-stone-900 rounded-2xl border border-stone-850 space-y-2">
          <p class="text-stone-400 text-xs italic">"The minimal tech shell fits perfectly. It is light, completely waterproof, and is my go-to for daily commuting. Worth every single cent."</p>
          <div class="text-xs text-white font-bold">— Liam Henderson, Designer</div>
        </div>
        <div class="p-6 bg-stone-900 rounded-2xl border border-stone-850 space-y-2">
          <p class="text-stone-400 text-xs italic">"Amazing service. Fast shipping, plastic-free modular packaging, and the quality of organic fabrics is outstanding. Fully recommend."</p>
          <div class="text-xs text-white font-bold">— Emily Ross, Architect</div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: NEWSLETTER & FOOTER -->
  <footer class="py-12 bg-stone-950 text-center border-t border-stone-900 space-y-8">
    <div class="max-w-md mx-auto space-y-3 px-6">
      <h3 class="font-bold text-white text-base">Join the Club</h3>
      <p class="text-[10px] text-stone-500">Get early notifications on seasonal collection releases and limited sales.</p>
      <div class="flex gap-2">
        <input type="email" placeholder="Enter your email" class="bg-stone-900 border border-stone-850 px-4 py-2.5 rounded-lg text-xs text-white placeholder:text-stone-500 focus:outline-none flex-1" />
        <button class="bg-white hover:bg-stone-250 text-stone-950 text-xs font-bold px-4 py-2.5 rounded-lg transition">Subscribe</button>
      </div>
    </div>
    <div class="text-[10px] text-stone-600">
      &copy; 2026 AuraGlow Luxury. Powered by AuromindAI E-commerce Engine.
    </div>
  </footer>
</body>
</html>`;
}

export function getSaaSTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AuroCloud SaaS Engine</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background-color: #09090b; font-family: 'Plus Jakarta Sans', sans-serif; color: #fafafa; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-300">
  
  <!-- SECTION 1: HEADER -->
  <header class="px-8 py-5 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center max-w-7xl mx-auto w-full">
    <div class="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
      <span class="w-4 h-4 bg-indigo-600 rounded"></span> AuroCloud
    </div>
    <nav class="hidden md:flex items-center gap-8 text-xs font-semibold text-zinc-450">
      <a href="#features" class="hover:text-white transition">Telemetry</a>
      <a href="#console" class="hover:text-white transition">Console</a>
      <a href="#pricing" class="hover:text-white transition">Pricing</a>
    </nav>
    <a href="#signup" class="bg-indigo-655 hover:bg-indigo-550 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">Get Started</a>
  </header>

  <!-- SECTION 2: HERO -->
  <section id="signup" class="max-w-5xl mx-auto text-center px-6 py-24 space-y-8">
    <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/80 px-3.5 py-1.5 rounded-full">Telemetry & Security Engine</span>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
      Scale Your Multi-Tenant <br />
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Database Infrastructure</span>
    </h1>
    <p class="text-zinc-500 text-sm leading-relaxed max-w-xl mx-auto">
      Automate RAG vector indexing, secure token dispatch schemas, and configure rate limit routers with less than 2ms telemetry overhead.
    </p>
    <div class="flex gap-3 justify-center max-w-md mx-auto pt-2">
      <input type="email" placeholder="Enter work email" class="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl text-xs text-white placeholder:text-zinc-550 focus:outline-none flex-1" />
      <button class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md whitespace-nowrap">Create Account</button>
    </div>
  </section>

  <!-- SECTION 3: METRICS STRIP -->
  <section class="py-8 bg-zinc-950 border-y border-zinc-900">
    <div class="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
      <div>
        <div class="text-2xl font-extrabold text-white">&lt; 2ms</div>
        <div class="text-[10px] text-zinc-500 mt-0.5">Average Latency</div>
      </div>
      <div>
        <div class="text-2xl font-extrabold text-white">99.999%</div>
        <div class="text-[10px] text-zinc-550 mt-0.5">Engine Uptime SLA</div>
      </div>
      <div>
        <div class="text-2xl font-extrabold text-white">AES-256</div>
        <div class="text-[10px] text-zinc-550 mt-0.5">Military Encryption</div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: PLATFORM FEATURES -->
  <section id="features" class="py-24 max-w-5xl mx-auto px-6 space-y-16">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-extrabold text-white tracking-tight">Platform Telemetry</h2>
      <p class="text-xs text-zinc-550 max-w-md mx-auto">Zero-latency developer tools for cloud configurations.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-zinc-900 p-6 rounded-2xl border border-zinc-850 space-y-4">
        <div class="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-xl text-indigo-400">⚡</div>
        <h3 class="font-bold text-white text-base">Edge Caching</h3>
        <p class="text-zinc-500 text-xs leading-relaxed">Route database indexing queries through staging CDN endpoints.</p>
      </div>
      <div class="bg-zinc-900 p-6 rounded-2xl border border-zinc-850 space-y-4">
        <div class="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-xl text-indigo-400">🔒</div>
        <h3 class="font-bold text-white text-base">MFA Gateways</h3>
        <p class="text-zinc-500 text-xs leading-relaxed">Secure developer consoles with native hardware key authenticators.</p>
      </div>
      <div class="bg-zinc-900 p-6 rounded-2xl border border-zinc-850 space-y-4">
        <div class="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-xl text-indigo-400">📦</div>
        <h3 class="font-bold text-white text-base">RAG Frameworks</h3>
        <p class="text-zinc-500 text-xs leading-relaxed">Inject custom PDF datasets into neural embeddings databases.</p>
      </div>
    </div>
  </section>

  <!-- SECTION 5: SYSTEM ARCHITECTURE GRAPH -->
  <section class="py-24 bg-zinc-950 border-y border-zinc-900 text-center">
    <div class="max-w-3xl mx-auto px-6 space-y-6">
      <h2 class="text-2xl font-extrabold text-white tracking-tight">Real-Time Routing Pipeline</h2>
      <div class="p-6 rounded-2xl bg-zinc-900 border border-zinc-850 text-left font-mono text-xs text-zinc-400 space-y-3 max-w-xl mx-auto">
        <div class="flex justify-between"><span class="text-indigo-400">[Incoming Request]</span> <span>➔ /api/v1/query</span></div>
        <div class="flex justify-between"><span class="text-purple-400">[Authentication]</span> <span class="text-emerald-400">➔ Token JWT Verified (Ok)</span></div>
        <div class="flex justify-between"><span class="text-amber-400">[Rate Limiting]</span> <span>➔ 23/1000 requests (Passed)</span></div>
        <div class="flex justify-between"><span class="text-blue-400">[RAG Embedding]</span> <span>➔ Vector Context Appended</span></div>
        <div class="flex justify-between text-emerald-400"><span class="font-bold">[Final Dispatch]</span> <span class="font-bold">➔ Dispatched in 1.48ms</span></div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: CONSOLE INTERACTION CODE -->
  <section id="console" class="py-24 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div class="space-y-4">
      <h2 class="text-2xl font-extrabold text-white tracking-tight">The CLI Command Console</h2>
      <p class="text-zinc-550 text-xs leading-relaxed">
        Scale nodes, generate secure secrets, and audit cluster logs from the integrated terminal client.
      </p>
      <div class="space-y-2 text-xs font-semibold text-zinc-300">
        <div>✓ Simple YAML manifest declarations</div>
        <div>✓ Multi-region deployment scripts</div>
      </div>
    </div>
    <div class="rounded-2xl border border-zinc-855 bg-zinc-900 p-5 font-mono text-[11px] text-zinc-400 text-left space-y-1">
      <div><span class="text-indigo-400">root@aurocloud:~$</span> auroctl scale --nodes=3</div>
      <div><span class="text-zinc-500">[system]</span> Initializing scaling manifest...</div>
      <div><span class="text-zinc-500">[system]</span> Spawning cluster node-US-East-1</div>
      <div><span class="text-zinc-500">[system]</span> Spawning cluster node-EU-West-1</div>
      <div class="text-emerald-400 font-bold">[success] scale completed in 2.4s.</div>
    </div>
  </section>

  <!-- SECTION 7: PRICING CARD MATRIX -->
  <section id="pricing" class="py-24 bg-zinc-950 border-t border-zinc-900">
    <div class="max-w-5xl mx-auto px-6 space-y-16">
      <h2 class="text-2xl font-extrabold text-white text-center tracking-tight">Simple Pricing Plans</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-zinc-900 p-6 rounded-2xl border border-zinc-850 space-y-4">
          <h3 class="font-bold text-white text-base">Hobbyist</h3>
          <div class="text-3xl font-extrabold">$0</div>
          <button class="w-full bg-zinc-800 hover:bg-zinc-700 py-2 rounded-lg text-xs font-semibold text-white transition">Deploy Free</button>
        </div>
        <div class="bg-zinc-900 p-6 rounded-2xl border-2 border-indigo-650 space-y-4 relative">
          <span class="absolute -top-3.5 left-4 bg-indigo-650 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">Recommended</span>
          <h3 class="font-bold text-white text-base">Developer Pro</h3>
          <div class="text-3xl font-extrabold">$29</div>
          <button class="w-full bg-indigo-650 hover:bg-indigo-550 py-2 rounded-lg text-xs font-semibold text-white transition">Go Pro</button>
        </div>
        <div class="bg-zinc-900 p-6 rounded-2xl border border-zinc-850 space-y-4">
          <h3 class="font-bold text-white text-base">Enterprise</h3>
          <div class="text-3xl font-extrabold">Custom</div>
          <button class="w-full bg-zinc-800 hover:bg-zinc-700 py-2 rounded-lg text-xs font-semibold text-white transition">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: FAQ & NEWSLETTER -->
  <footer class="py-12 bg-zinc-950 text-center border-t border-zinc-900 space-y-4">
    <div class="text-[10px] text-zinc-600">
      &copy; 2026 AuroCloud Systems. Built dynamically by AuromindAI.
    </div>
  </footer>
</body>
</html>`;
}

export function getPortfolioTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Minimalist Designer Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background-color: #fafaf9; font-family: 'Plus Jakarta Sans', sans-serif; color: #1c1917; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-stone-200">
  
  <!-- SECTION 1: HEADER -->
  <header class="px-8 py-6 flex justify-between items-center max-w-6xl mx-auto w-full">
    <div class="text-sm font-extrabold tracking-widest uppercase text-stone-900">
      ELENA STONE
    </div>
    <nav class="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-500">
      <a href="#work" class="hover:text-stone-950 transition">Selected Work</a>
      <a href="#about" class="hover:text-stone-950 transition">About</a>
      <a href="#contact" class="hover:text-stone-950 transition">Contact</a>
    </nav>
    <a href="#contact" class="bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold px-4 py-2.5 rounded-none transition">Get in Touch</a>
  </header>

  <!-- SECTION 2: HERO -->
  <section class="max-w-4xl mx-auto px-6 py-24 space-y-6 text-left">
    <span class="text-xs font-semibold text-stone-400 uppercase tracking-widest">Digital Architect & Designer</span>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-stone-950">
      Crafting minimal interfaces <br />
      <span class="text-stone-400 font-normal">and interactive digital products.</span>
    </h1>
    <p class="text-stone-500 text-sm leading-relaxed max-w-lg">
      Form follows execution. Partnering with design-driven technology teams to ship visual products.
    </p>
  </section>

  <!-- SECTION 3: STATISTICS METRIC -->
  <section class="py-8 bg-stone-100 border-y border-stone-200/60">
    <div class="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 text-center text-xs font-semibold text-stone-500">
      <div>
        <div class="text-xl font-extrabold text-stone-900">5+ Years</div>
        <div class="text-[10px] text-stone-400 mt-0.5">Active Studio Work</div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-stone-900">40+ Projects</div>
        <div class="text-[10px] text-stone-400 mt-0.5">Successfully Shipped</div>
      </div>
      <div>
        <div class="text-xl font-extrabold text-stone-900">12 Awards</div>
        <div class="text-[10px] text-stone-400 mt-0.5">International Design</div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: SELECTED WORK GALLERY -->
  <section id="work" class="py-24 max-w-4xl mx-auto px-6 space-y-12">
    <div class="space-y-1">
      <h2 class="text-xl font-extrabold text-stone-900 uppercase tracking-wider">Selected Work</h2>
      <p class="text-xs text-stone-450">Curated interface designs shipped for web and iOS platforms.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-3">
        <div class="h-48 bg-stone-100 rounded-none border border-stone-200/60 flex items-center justify-center text-3xl">📱</div>
        <h3 class="font-bold text-stone-900 text-sm">Vecta iOS App</h3>
        <p class="text-stone-500 text-xs">Fintech interfaces & brand strategy.</p>
      </div>
      <div class="space-y-3">
        <div class="h-48 bg-stone-100 rounded-none border border-stone-200/60 flex items-center justify-center text-3xl">💻</div>
        <h3 class="font-bold text-stone-900 text-sm">Nova Web Staging</h3>
        <p class="text-stone-500 text-xs">Developer platform redesign & styling.</p>
      </div>
      <div class="space-y-3">
        <div class="h-48 bg-stone-100 rounded-none border border-stone-200/60 flex items-center justify-center text-3xl">🎨</div>
        <h3 class="font-bold text-stone-900 text-sm">Studio branding</h3>
        <p class="text-stone-500 text-xs">Procedural identity and logotypes.</p>
      </div>
    </div>
  </section>

  <!-- SECTION 5: PROCESS WORK -->
  <section class="py-24 bg-stone-100 border-y border-stone-200/60">
    <div class="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="space-y-4">
        <h2 class="text-xl font-extrabold text-stone-900 uppercase tracking-wider">My Process</h2>
        <p class="text-stone-500 text-xs leading-relaxed">
          I build products iteratively, moving rapidly from lo-fi wireframes to interactive prototyping, engineering code logic, and deploying to production.
        </p>
      </div>
      <div class="space-y-3">
        <div class="text-xs text-stone-700 font-semibold">1. Discovery & Intent Research</div>
        <div class="text-xs text-stone-700 font-semibold border-t border-stone-200/60 pt-2">2. Prototyping & Style Systems</div>
        <div class="text-xs text-stone-700 font-semibold border-t border-stone-200/60 pt-2">3. React/Vite Code Integration</div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: CLIENT LOGOS -->
  <section class="py-16 max-w-4xl mx-auto px-6 text-center space-y-6">
    <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Trusted by Teams At</div>
    <div class="flex flex-wrap justify-center gap-12 text-sm font-extrabold text-stone-300">
      <span>VECTA</span>
      <span>NOVA CLOUD</span>
      <span>STUDIO LOGIC</span>
      <span>AURA SYSTEMS</span>
    </div>
  </section>

  <!-- SECTION 7: TESTIMONIAL -->
  <section class="py-24 bg-stone-900 text-stone-100">
    <div class="max-w-3xl mx-auto px-6 text-center space-y-4">
      <p class="text-stone-350 text-sm italic">"Elena delivered an exceptional, responsive design system. Her ability to translate visual styles straight into clean React code was outstanding."</p>
      <div class="text-xs font-bold text-stone-400">— Sarah Jenkins, CTO at Vecta</div>
    </div>
  </section>

  <!-- SECTION 8: CONTACT FORM & FOOTER -->
  <footer id="contact" class="py-16 max-w-md mx-auto px-6 text-center space-y-6">
    <div class="space-y-2">
      <h3 class="font-bold text-stone-900 text-base">Let's Work Together</h3>
      <p class="text-[10px] text-stone-400">Available for contract design roles starting September 2026.</p>
    </div>
    <div class="space-y-3">
      <input type="email" placeholder="Your email address" class="w-full bg-white border border-stone-200 px-4 py-2.5 rounded-none text-xs text-stone-950 focus:outline-none" />
      <button class="w-full bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold py-2.5 rounded-none transition">Submit Request</button>
    </div>
    <div class="text-[10px] text-stone-400 pt-8 border-t border-stone-100">
      &copy; 2026 Elena Stone. Built dynamically by AuromindAI Portfolio Builder.
    </div>
  </footer>
</body>
</html>`;
}

export function getSummitTemplate(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Future of Creative AI Summit</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background-color: #fafaf9; font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; }
  </style>
</head>
<body class="min-h-screen text-[#0f172a] flex flex-col justify-between selection:bg-purple-200">
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
  <div class="absolute top-20 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

  <!-- SECTION 1: HEADER & NAVIGATION -->
  <header class="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto w-full relative z-10">
    <div class="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-850 bg-clip-text text-transparent flex items-center gap-2">
      <span class="w-5 h-5 rounded bg-indigo-650 flex items-center justify-center text-white text-[11px]">⚡</span>
      FutureCreative
    </div>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
      <a href="#features" class="hover:text-slate-900 transition">Features</a>
      <a href="#speakers" class="hover:text-slate-900 transition">Speakers</a>
      <a href="#agenda" class="hover:text-slate-900 transition">Agenda</a>
      <a href="#pricing" class="hover:text-slate-900 transition">Tickets</a>
    </nav>
    <a href="#register" class="bg-indigo-750 hover:bg-indigo-850 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition shadow-sm">Register Now</a>
  </header>
  
  <!-- SECTION 2: HERO & REGISTRATION -->
  <section id="register" class="max-w-5xl mx-auto text-center px-6 py-24 space-y-8 relative z-10">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/85 border border-purple-200/60 text-purple-800 text-[11px] font-bold uppercase tracking-wider mx-auto">
      ✨ Future of Creative AI Summit 2026
    </div>
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1] max-w-4xl mx-auto">
      Where Artistry Meets <br class="hidden md:inline"/>
      <span class="bg-gradient-to-r from-purple-700 via-indigo-750 to-indigo-900 bg-clip-text text-transparent">Artificial Intelligence</span>
    </h1>
    <p class="text-base md:text-lg text-slate-655 max-w-2xl mx-auto leading-relaxed">
      Join 10,000+ creators, architects, and AI developers to explore the next generation of creative engines and procedural layouts.
    </p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-4">
      <input type="email" placeholder="Enter your email" class="px-5 py-3.5 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm shadow-sm flex-1" />
      <button class="bg-indigo-750 hover:bg-indigo-850 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition shadow-md whitespace-nowrap">Secure Ticket</button>
    </div>
  </section>

  <!-- SECTION 3: METRICS TELEMETRY STRIP -->
  <section class="py-10 bg-white border-y border-slate-200/65 relative z-10">
    <div class="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
      <div>
        <div class="text-3xl md:text-4xl font-extrabold text-indigo-950">20+</div>
        <div class="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">Expert Speakers</div>
      </div>
      <div>
        <div class="text-3xl md:text-4xl font-extrabold text-indigo-950">10k+</div>
        <div class="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">Attendees Live</div>
      </div>
      <div>
        <div class="text-3xl md:text-4xl font-extrabold text-indigo-955">Aug 24</div>
        <div class="text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">Global Broadcast</div>
      </div>
    </div>
  </section>

  <!-- SECTION 4: SUMMIT CORE FEATURES -->
  <section id="features" class="py-24 max-w-5xl mx-auto px-6 space-y-16">
    <div class="text-center space-y-3">
      <h2 class="text-3xl font-extrabold text-slate-950 tracking-tight">Key Learning Themes</h2>
      <p class="text-sm text-slate-655 max-w-lg mx-auto">Explore three core tracks tailored for next-generation generative builders.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
        <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">🎨</div>
        <h3 class="font-bold text-slate-900 text-lg">Neural Creative Pipelines</h3>
        <p class="text-xs text-slate-550 leading-relaxed">Leveraging generative visual synthesis engines and 3D procedural modeling tools.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
        <div class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">💻</div>
        <h3 class="font-bold text-slate-900 text-lg">Generative UI Layouts</h3>
        <p class="text-xs text-slate-550 leading-relaxed">Designing fluid component architectures that assemble dynamically based on user context.</p>
      </div>
      <div class="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
        <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-xl">🤖</div>
        <h3 class="font-bold text-slate-900 text-lg">Autonomous Web Workers</h3>
        <p class="text-xs text-slate-550 leading-relaxed">Configuring backend workflow agents that automate database processing and RAG synchronization.</p>
      </div>
    </div>
  </section>

  <!-- SECTION 5: KEYNOTE SPEAKERS -->
  <section id="speakers" class="py-24 bg-slate-100/50 border-y border-slate-200/40">
    <div class="max-w-5xl mx-auto px-6 space-y-16">
      <div class="text-center space-y-3">
        <h2 class="text-3xl font-extrabold text-slate-950 tracking-tight">Keynote Speakers</h2>
        <p class="text-sm text-slate-500 max-w-lg mx-auto">Hear from the design directors and AI scientists leading industry automation.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-purple-250 flex items-center justify-center text-2xl bg-purple-100">👩‍💻</div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Dr. Clara Vance</h3>
            <p class="text-xs text-purple-700 font-semibold mt-0.5">Head of Creative AI, Auromind</p>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">Pioneering procedural interface synthesis models and real-time canvas tools.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-indigo-250 flex items-center justify-center text-2xl bg-indigo-100">👨‍🎨</div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Marcus Thorne</h3>
            <p class="text-xs text-indigo-700 font-semibold mt-0.5">Creative Director, NeuroStudio</p>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">Focusing on standard typography systems and dark aesthetic layouts in web engineering.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 hover:-translate-y-1 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-pink-250 flex items-center justify-center text-2xl bg-pink-100">👩‍🎨</div>
          <div>
            <h3 class="font-bold text-slate-900 text-base">Elisa Woods</h3>
            <p class="text-xs text-pink-700 font-semibold mt-0.5">3D Generative Lead, AuroVex</p>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">Scaling procedural generation frameworks using real-time latent space editing tools.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: INTERACTIVE AGENT CONSOLE MOCK -->
  <section class="py-24 max-w-5xl mx-auto px-6 space-y-16">
    <div class="text-center space-y-3">
      <h2 class="text-3xl font-extrabold text-slate-950 tracking-tight">Interactive Workspace Console</h2>
      <p class="text-sm text-slate-655 max-w-lg mx-auto">Watch AuroVex 1 compile components dynamically on the staging server.</p>
    </div>
    <div class="rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-zinc-300 shadow-lg max-w-3xl mx-auto text-left space-y-2">
      <div class="flex items-center gap-1.5 border-b border-slate-800 pb-3 mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
        <span class="text-[10px] text-zinc-500 ml-3">aurovex-builder-terminal@staging-console</span>
      </div>
      <div><span class="text-emerald-400">~/auromind-project$</span> npm run dev</div>
      <div><span class="text-zinc-500">[vite]</span> dev server running at <a href="#" class="text-indigo-400 underline">http://localhost:5173/</a></div>
      <div><span class="text-zinc-500">[compiler]</span> compilation successful in 840ms</div>
      <div class="text-zinc-500 animate-pulse">&gt; listening for prompt inputs...</div>
    </div>
  </section>

  <!-- SECTION 7: SUMMIT SCHEDULE AGENDA -->
  <section id="agenda" class="py-24 bg-slate-100/50 border-y border-slate-200/40">
    <div class="max-w-4xl mx-auto px-6 space-y-12">
      <div class="text-center space-y-3">
        <h2 class="text-3xl font-extrabold text-slate-950 tracking-tight font-sans font-extrabold">Summit Agenda</h2>
        <p class="text-sm text-slate-500">Live stream events schedule for August 24, 2026.</p>
      </div>
      <div class="space-y-6">
        <div class="flex gap-6 p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm transition duration-200">
          <div class="text-sm font-extrabold text-indigo-700 shrink-0 w-24">09:00 AM</div>
          <div>
            <h4 class="font-bold text-sm text-slate-900">Keynote: The Latent Creative Revolution</h4>
            <p class="text-xs text-slate-500 mt-1">Exploration of next-generation generative pipelines and creative modeling.</p>
          </div>
        </div>
        <div class="flex gap-6 p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm transition duration-200">
          <div class="text-sm font-extrabold text-indigo-700 shrink-0 w-24">11:30 AM</div>
          <div>
            <h4 class="font-bold text-sm text-slate-900">Panel: Prompting vs Procedural Logic</h4>
            <p class="text-xs text-slate-500 mt-1">Debating the boundaries of descriptive text triggers and structured logical code bases.</p>
          </div>
        </div>
        <div class="flex gap-6 p-5 bg-white rounded-2xl border border-slate-200/60 shadow-sm transition duration-200">
          <div class="text-sm font-extrabold text-indigo-700 shrink-0 w-24">02:00 PM</div>
          <div>
            <h4 class="font-bold text-sm text-slate-900">Interactive Demo: Auromind Site Builder</h4>
            <p class="text-xs text-slate-500 mt-1">First-hand reveal of stateful UI creation using generative multi-agents.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: REGISTRATION & TICKET PACKAGES -->
  <section id="pricing" class="py-24 max-w-5xl mx-auto px-6 space-y-16">
    <div class="text-center space-y-3">
      <h2 class="text-3xl font-extrabold text-slate-950 tracking-tight">Select Your Ticket Package</h2>
      <p class="text-sm text-slate-655 max-w-lg mx-auto">Registration is free but virtual seats are capped. Pick the right pass for you.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-6">
        <div>
          <h3 class="font-bold text-slate-900 text-lg">General Pass</h3>
          <p class="text-xs text-slate-500 mt-1">Free access to all main live broadcast keynotes.</p>
        </div>
        <div class="text-3xl font-extrabold text-slate-900">$0</div>
        <button class="w-full py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">Register Free</button>
      </div>
      <div class="bg-white p-8 rounded-2xl border-2 border-indigo-650 shadow-md space-y-6 relative">
        <span class="absolute -top-3.5 left-6 bg-indigo-750 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Recommended</span>
        <div>
          <h3 class="font-bold text-slate-900 text-lg">Pro Access Pass</h3>
          <p class="text-xs text-slate-550 mt-1">Access to keynotes, workshops, and source code files.</p>
        </div>
        <div class="text-3xl font-extrabold text-indigo-950">$49</div>
        <button class="w-full py-2.5 rounded-full bg-indigo-750 hover:bg-indigo-850 text-white text-xs font-bold hover:bg-indigo-850 transition">Buy Pro Pass</button>
      </div>
      <div class="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm space-y-6">
        <div>
          <h3 class="font-bold text-slate-900 text-lg">Enterprise Pass</h3>
          <p class="text-xs text-slate-550 mt-1">1-on-1 expert consulting plus custom RAG integration.</p>
        </div>
        <div class="text-3xl font-extrabold text-slate-900">Custom</div>
        <button class="w-full py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">Contact Sales</button>
      </div>
    </div>
  </section>

  <!-- FAQ Section (Extra content) -->
  <section class="py-24 bg-slate-100/50 border-t border-slate-200/40">
    <div class="max-w-4xl mx-auto px-6 space-y-12">
      <div class="text-center space-y-3">
        <h2 class="text-3xl font-extrabold text-slate-955 tracking-tight font-sans">Frequently Asked Questions</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
        <div class="space-y-2">
          <h4 class="font-bold text-sm text-slate-900">Is this summit virtual or physical?</h4>
          <p class="text-xs text-slate-550 leading-relaxed">It is a fully online virtual summit streamed worldwide, including interactive live chats and code showcases.</p>
        </div>
        <div class="space-y-2">
          <h4 class="font-bold text-sm text-slate-900">Will session recordings be available?</h4>
          <p class="text-xs text-slate-550 leading-relaxed">Yes! Pro and Enterprise ticket holders can access all keynote recordings and workshop materials indefinitely.</p>
        </div>
      </div>
    </div>
  </section>
  
  <footer class="py-8 text-center text-xs text-slate-500 border-t border-slate-200/40 bg-slate-100/50">
    &copy; 2026 Future of Creative AI Summit. Powered by AuromindAI. All rights reserved.
  </footer>
</body>
</html>`;
}

function extractHtmlFromContent(content: string): string {
  // Use hex escape \x60 for backticks to completely bypass TSX template literal parser issues
  const match = content.match(new RegExp('\\x60\\x60\\x60html([\\s\\S]*?)\\x60\\x60\\x60'));
  if (match && match[1]) {
    return match[1].trim();
  }
  // Try fallback general backticks if they contain HTML nodes
  const generalMatch = content.match(new RegExp('\\x60\\x60\\x60([\\s\\S]*?)\\x60\\x60\\x60'));
  if (generalMatch && generalMatch[1] && (generalMatch[1].includes('<html') || generalMatch[1].includes('<div'))) {
    return generalMatch[1].trim();
  }
  return '';
}

export function getMockPageHtml(prompt: string, content: string): string {
  // 1. Direct priority: Extract real-time HTML generated by Gemini
  const realHtml = extractHtmlFromContent(content);
  if (realHtml) return realHtml;

  // 2. Fallback priority: Match prompt category and serve high-end 8-section layout
  const query = (prompt || '').toLowerCase();
  
  if (query.includes('e-commerce') || query.includes('shopify') || query.includes('store') || query.includes('apparel') || query.includes('clothing')) {
    return getShopifyTemplate();
  }
  if (query.includes('saas') || query.includes('dashboard') || query.includes('analytics') || query.includes('telemetry') || query.includes('cloud')) {
    return getSaaSTemplate();
  }
  if (query.includes('portfolio') || query.includes('artist') || query.includes('designer') || query.includes('showcase')) {
    return getPortfolioTemplate();
  }
  
  // Default fallback is the 8-section Creative AI Summit
  return getSummitTemplate();
}

