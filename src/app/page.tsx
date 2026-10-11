'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Building2,
  Store,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Lock,
  ExternalLink,
  Send,
  Play,
  Layers,
  Baby,
  Cpu,
  ShoppingBag,
  Compass,
  Radio,
  Clock,
  Award,
  TrendingUp,
  Users,
  BarChart3,
  Check,
  DollarSign,
  Target
} from 'lucide-react';

export default function HomePage() {
  const [demoRequested, setDemoRequested] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', mall: '', email: '', phone: '' });
  const [simulatedStores, setSimulatedStores] = useState(450);
  const [adoptionPercent, setAdoptionPercent] = useState(60);

  const payingStores = Math.round((simulatedStores * adoptionPercent) / 100);
  const freeStores = simulatedStores - payingStores;
  const monthlyRevenue = payingStores * 15;
  const annualRevenue = monthlyRevenue * 12;

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoRequested(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. NAVBAR INSTITUCIONAL                                                   */}
      {/* ========================================================================= */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/25">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-xl">MALL OS</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Sistema Operativo para Centros Comerciales
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-indigo-600 transition-colors">Ecosistema</a>
            <a href="#mapa-25d" className="hover:text-indigo-600 transition-colors">Plano 2.5D</a>
            <a href="#conserje" className="hover:text-indigo-600 transition-colors">Conserje IA</a>
            <a href="#modo-nino" className="hover:text-indigo-600 transition-colors">Modo Niño</a>
            <a href="#store-os" className="hover:text-indigo-600 transition-colors">Store OS</a>
            <a href="#planes" className="hover:text-indigo-600 transition-colors font-bold text-indigo-600">Planes & Alianzas</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://mall-os-web-portal.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Acceso Portales B2B</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
            >
              <span>Solicitar Demo</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION CON SMARTPHONE 3D Y VIDEO EN LOOP                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Columna Izquierda: Mensaje Comercial */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Suite Empresarial Retail para Grandes Consorcios
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                El Sistema Operativo que Digitaliza los Grandes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Centros Comerciales</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Conectamos la experiencia de millones de visitantes con consolas de gestión en tiempo real para juntas directivas y más de 1.000 locales. 
                Navegación Turn-by-Turn indoor, Conserje IA, Modo Niño gamificado y validación atómica en caja.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  <span>Agendar Demostración Ejecutiva</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://mall-os-web-portal.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-6 py-4 rounded-2xl font-bold text-sm border border-slate-200 shadow-sm transition-all hover:border-slate-300"
                >
                  <Lock className="w-4 h-4 text-indigo-600" />
                  <span>Portal Privado B2B</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

              {/* Indicadores de rendimiento */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl font-black text-slate-900">+42 min</div>
                  <div className="text-xs text-slate-500 font-medium">Permanencia Familiar</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-indigo-600">18.4%</div>
                  <div className="text-xs text-slate-500 font-medium">Conversión en Caja</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600">0 Obras</div>
                  <div className="text-xs text-slate-500 font-medium">Cero Antenas en Techos</div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Smartphone 3D con Plano y Routing */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900/10 bg-slate-950 group">
                <img
                  src="/assets/images/feature-4.jpg"
                  alt="Navegación 3D Indoor Mall OS"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/80 text-white backdrop-blur">
                      <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                      Ruta en Tiempo Real
                    </span>
                    <h3 className="text-lg font-black leading-tight">Navegación Turn-by-Turn 2.5D</h3>
                    <p className="text-xs text-slate-300">Guía precisa a puerta de tienda sin requerir señal GPS.</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta flotante de confianza */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Sambil Chacao Ready</div>
                  <div className="text-[11px] text-slate-500">Mapeo de 4 niveles completo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOWCASE 1: PLANO ARQUITECTÓNICO 2.5D (TIJERAZO, ZARA, BERSHKA)        */}
      {/* ========================================================================= */}
      <section id="mapa-25d" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block">
              Cartografía Vectorial GPU
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              El Plano Arquitectónico del Mall como Nunca Antes se Vio
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Modelado de alta resolución que refleja exactamente la distribución de los locales comerciales, pasillos centrales, plazas y áreas gastronómicas.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            <img
              src="/assets/images/feature-5.png"
              alt="Plano Arquitectónico 3D CAD Sambil Chacao"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  MALL OS CAD 2.5D ENGINE
                </span>
                <h3 className="text-xl font-black text-white">Sambil Chacao · Distribución de Locales Insignia</h3>
                <p className="text-xs text-slate-300">Tiendas Tijerazo, ZARA, Bershka, Stradivarius, McCafé y Cines Unidos georreferenciados.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800/90 text-slate-300 text-xs font-bold border border-slate-700">
                  Render 60 FPS
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">
                  Vectorial Nativo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SHOWCASE 2: CONSERJE IA CONVERSACIONAL (VIDEO REAL)                    */}
      {/* ========================================================================= */}
      <section id="conserje" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              Inteligencia Artificial Especializada en Retail
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Un Conserje de IA que Guía a los Compradores en Segundos
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              El visitante no tiene que adivinar dónde conseguir lo que busca. Pregunta en lenguaje natural: 
              <em> &ldquo;¿Dónde venden blazers de dama en oferta?&rdquo;</em> o <em> &ldquo;¿Qué cafetería tiene wifi en el nivel Acuario?&rdquo;</em>, 
              y el Conserje responde con el local exacto, foto y traza la ruta.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">Búsqueda Multimarca Inmediata</h4>
                  <p className="text-xs text-slate-500">Conecta el catálogo de todas las tiendas para recomendar opciones según presupuesto y gusto.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">Difusión Masiva y Avisos Proactivos</h4>
                  <p className="text-xs text-slate-500">La junta directiva puede enviar avisos de eventos o promociones relámpago a audiencias segmentadas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Real del Conserje IA */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900/10 bg-slate-950 aspect-[9/16] sm:aspect-video flex items-center justify-center">
              <video
                src="/assets/videos/conserge-ia.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-white flex items-center gap-2 text-xs font-bold">
                <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Demo en Vivo · Conserje IA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHOWCASE 3: MODO NIÑO & GAMIFICACIÓN (BÚSQUEDA DEL TESORO)             */}
      {/* ========================================================================= */}
      <section id="modo-nino" className="py-24 bg-gradient-to-b from-blue-900 to-indigo-950 text-white px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Baby className="w-3.5 h-3.5 text-amber-400" />
              Impacto en Permanencia Familiar (+42 min)
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Modo Niño: Gamificación que Convierte el Mall en una Aventura
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mientras los padres compran con tranquilidad, los niños participan en la Búsqueda del Tesoro interactiva escaneando pistas en vitrinas comerciales y desbloqueando premios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Banner Oficial Búsqueda del Tesoro */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-700/60 bg-blue-950">
              <img
                src="/assets/images/feature-2.jpg"
                alt="Búsqueda del Tesoro Modo Niño"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-black">Una Aventura para Toda la Familia</h3>
                <p className="text-xs text-blue-200">
                  Misiones interactivas con personajes de detectives que incentivan a las familias a recorrer todos los pisos del centro comercial.
                </p>
              </div>
            </div>

            {/* Familia Escaneando Cofre en Vitrina */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-700/60 bg-blue-950">
              <img
                src="/assets/images/feature-3.jpg"
                alt="Familia canjeando premio en vitrina de juguetería"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-black">Generador de Tráfico a Puerta de Tienda</h3>
                <p className="text-xs text-blue-200">
                  Los locales comerciales participan como &ldquo;Estaciones del Tesoro&rdquo;, recibiendo flujo peatonal constante y activando canjes directos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SHOWCASE 4: STORE OS & VALIDACIÓN POS EN CAJA                          */}
      {/* ========================================================================= */}
      <section id="store-os" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Banner Explora el Mall */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="/assets/images/feature-1.jpg"
              alt="Explora el Mall en la palma de tu mano"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              Herramienta Operativa para Locatarios
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Store OS: Catálogo D-086 y Validador de Caja en 3 Segundos
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Los locatarios digitalizan sus prendas y productos físicos con cambio interactivo de fotos por color (Regla D-086) y validan cupones de descuento en el punto de venta sin fricción.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">Catálogo Dinámico por Color (D-086)</h4>
                  <p className="text-xs text-slate-500">El cliente elige el color y la galería se actualiza al instante, dando certeza absoluta antes de ir al local.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-slate-900">Candado Anti-Fraude de Cupones</h4>
                  <p className="text-xs text-slate-500">Cada código se valida con bloqueo atómico en la base de datos, impidiendo duplicaciones o canjes repetidos.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://mall-os-web-portal.vercel.app/store/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
              >
                <span>Ver demostración de Store OS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. MODELO DE NEGOCIO Y PLANES COMERCIALES (D-087)                        */}
      {/* ========================================================================= */}
      <section id="planes" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              Modelo B2B2C Mixto · Estrategia de Adopción Año 1
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Precios y Alianzas para Conquistar el Centro Comercial
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              La prioridad del primer año no es exprimir a los locatarios, sino derribar las barreras de entrada: el mall adopta la plataforma como socio estratégico, el 100% de las tiendas tiene presencia gratuita y las tiendas activas monetizan con herramientas comerciales por solo $15 al mes.
            </p>
          </div>

          {/* Grilla de 3 Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Plan 1: Mall Institucional */}
            <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700 uppercase tracking-wider">
                    Cliente Principal
                  </span>
                  <Building2 className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Plan Institucional Mall</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">Para juntas de condominio y administraciones comerciales.</p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">$0</span>
                    <span className="text-xs font-bold text-indigo-600 uppercase">durante el piloto</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Piloto limitado a 30–60 días según alcance acordado</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Directorio general del centro comercial 100% digitalizado.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Plano arquitectónico 2.5D interactivo por niveles y pasillos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Acceso al panel ejecutivo con medición de afluencia y rutas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Coordinación comercial con locatarios y soporte en campo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tarifa institucional negociada post-piloto según escala.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href="#contacto"
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold block text-center transition-colors"
                >
                  Solicitar Piloto para Mall
                </a>
              </div>
            </div>

            {/* Plan 2: Básico Locatario */}
            <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                    Presencia Permanente
                  </span>
                  <Store className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Directorio Básico Tienda</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">Para todos los locales físicos del centro comercial.</p>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">$0</span>
                    <span className="text-xs font-bold text-slate-500">/ mes</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">Gratis para siempre · Cero barreras de entrada</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ficha con nombre, logo, número de local y piso.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Categoría comercial y horarios de atención al público.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ubicación exacta y ruteo Turn-by-Turn en el plano 2.5D.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Garantiza que el visitante nunca encuentre locales vacíos en el mapa.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href="https://mall-os-web-portal.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold block text-center transition-colors"
                >
                  Registrar Ficha Gratuita
                </a>
              </div>
            </div>

            {/* Plan 3: Comercial de Lanzamiento (Tiendas Fundadoras) */}
            <div className="rounded-3xl bg-slate-900 text-white p-8 border-2 border-indigo-500 shadow-2xl relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                Oferta Lanzamiento Tiendas Fundadoras
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-indigo-950 text-indigo-300 border border-indigo-700 uppercase tracking-wider">
                    Herramienta de Ventas
                  </span>
                  <ShoppingBag className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-xl font-black text-white">Plan Comercial Store OS</h3>
                <p className="text-xs text-slate-300 mt-1 mb-6">Para tiendas que desean impulsar ventas y fidelizar compradores.</p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">$15</span>
                    <span className="text-xs font-bold text-slate-400">/ mes</span>
                  </div>
                  <span className="text-[11px] text-indigo-400 font-bold block mt-1">Precio introductorio para locatarios fundadores</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Catálogo Dinámico por Color (D-086):</strong> fotos reales por variante (+75% conversión).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Promociones y Cupones:</strong> activación de ofertas con candado anti-fraude en caja.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Store OS Autónomo:</strong> gestión total de inventario y stock desde cualquier navegador.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Estadísticas de Tienda:</strong> visualizaciones de productos, búsquedas y canjes.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a
                  href="https://mall-os-web-portal.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold block text-center transition-all shadow-lg shadow-indigo-600/30"
                >
                  Activar Plan Comercial ($15/mes)
                </a>
              </div>
            </div>
          </div>

          {/* Banner de Campañas Patrocinadas y Fondo de Mercadeo */}
          <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 p-8 text-white border border-indigo-700/50 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-left">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-800/80 text-indigo-200 uppercase tracking-wider">
                Ingresos Compartidos
              </span>
              <h4 className="text-xl sm:text-2xl font-black">Campañas Patrocinadas & Fondo de Activación Comercial</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Las marcas pueden pautar banners destacados y promociones especiales. En lugar de complicar la contabilidad con comisiones fijas, se crea un <strong>fondo de mercadeo conjunto</strong> que reinvierte en actividades para atraer visitantes al centro comercial.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-lg"
              >
                <span>Consultar Opciones de Pauta</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SIMULADOR INTERACTIVO DE FACTURACIÓN (EJEMPLO 450 LOCALES)            */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                Simulador de Escala Comercial
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                ¿Qué Significa Esto en un Centro Comercial Real?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ajuste los controles para proyectar la facturación mensual y anual según el número de locales y la tasa de adopción del plan comercial de $15/mes.
              </p>
            </div>

            {/* Controles de Simulación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-slate-100">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Total de Locales del Centro Comercial:</span>
                  <span className="text-indigo-600 font-extrabold">{simulatedStores} locales</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="700"
                  step="10"
                  value={simulatedStores}
                  onChange={(e) => setSimulatedStores(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50 locales (Mall Express)</span>
                  <span>450 (Sambil Chacao)</span>
                  <span>700 (Gran Escala)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Adopción Plan Comercial ($15/mes):</span>
                  <span className="text-emerald-600 font-extrabold">{adoptionPercent}% de locales</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={adoptionPercent}
                  onChange={(e) => setAdoptionPercent(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>10% (Inicio)</span>
                  <span>60% (Objetivo Año 1)</span>
                  <span>90% (Madurez)</span>
                </div>
              </div>
            </div>

            {/* Resultados del Simulador */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                  Tiendas de Pago ($15)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-indigo-900">{payingStores}</span>
                <span className="text-[10px] text-indigo-600 block mt-1">Con catálogo y ofertas activas</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Tiendas Gratuitas ($0)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-slate-800">{freeStores}</span>
                <span className="text-[10px] text-slate-500 block mt-1">Directorio 100% completo</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  Facturación Mensual
                </span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-900">
                  ${monthlyRevenue.toLocaleString('en-US')}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-1">Ingreso recurrente por tiendas</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Facturación Anualizada
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  ${annualRevenue.toLocaleString('en-US')}
                </span>
                <span className="text-[10px] text-indigo-400 block mt-1">Sin contar pauta ni licencias</span>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* LAS 5 MÉTRICAS CLAVE DEL AÑO 1                                        */}
          {/* ===================================================================== */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Las 5 Métricas de Éxito Durante el Primer Año
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                No medimos el éxito únicamente por la facturación inmediata, sino por la adopción y salud de la plataforma.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="text-sm font-black text-slate-900">Cobertura</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  % de locales del mall con ficha completa, horarios y ubicación en mapa.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="text-sm font-black text-slate-900">Adopción</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  % de gerentes y encargados que utilizan Store OS activamente cada mes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="text-sm font-black text-slate-900">Actividad</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Búsquedas de visitantes, vistas a fichas de productos y rutas solicitadas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-xs">
                  4
                </div>
                <h4 className="text-sm font-black text-slate-900">Conversión</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Promociones consultadas en la app y cupones canjeados físicamente en caja.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-xs">
                  5
                </div>
                <h4 className="text-sm font-black text-slate-900">Retención</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  % de tiendas que continúan utilizando y renovando su plan mes a mes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FORMULARIO EJECUTIVO / CONTACTO PARA PILOTO                            */}
      {/* ========================================================================= */}
      <section id="contacto" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-2">
              Piloto Comercial de 30 a 60 Días
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Agende una Demostración Ejecutiva para su Complejo Comercial
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Descubra en vivo el impacto de Mall OS configurado con los locales y el plano real de su propio centro comercial.
            </p>

            {demoRequested ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-lg text-white">¡Solicitud Recibida con Éxito!</h4>
                <p className="text-xs text-emerald-300">
                  Un director de Mall OS se comunicará en las próximas 24 horas para coordinar la presentación ejecutiva.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Nombre y Apellido
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Oscar Martínez"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Centro Comercial / Consorcio
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Sambil Chacao / La Cascada"
                      value={demoForm.mall}
                      onChange={(e) => setDemoForm({ ...demoForm, mall: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Correo Corporativo
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="directorio@consorcio.com"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Teléfono Móvil
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+58 412 000 0000"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Presentación Ejecutiva</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER CORPORATIVO                                                     */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
              M
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">MALL OS ENTERPRISE</span>
              <p className="text-[11px] text-slate-400">© 2026 Mall OS. Todos los derechos reservados.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href="#soluciones" className="hover:text-slate-900 transition-colors">Ecosistema</a>
            <a href="#mapa-25d" className="hover:text-slate-900 transition-colors">Plano 2.5D</a>
            <a href="#modo-nino" className="hover:text-slate-900 transition-colors">Modo Niño</a>
            <a
              href="https://mall-os-web-portal.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition-colors font-bold flex items-center gap-1"
            >
              <span>Acceso Portales B2B</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
