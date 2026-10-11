'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Store,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  BarChart3,
  Users,
  Sparkles,
  MapPin,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp,
  Cpu,
  Baby,
  Accessibility,
  QrCode,
  ExternalLink,
  Mail,
  Send
} from 'lucide-react';

export default function HomePage() {
  const [demoRequested, setDemoRequested] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', mall: '', email: '', phone: '' });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoRequested(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* ========================================================================= */}
      {/* 1. NAVBAR INSTITUCIONAL                                                   */}
      {/* ========================================================================= */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-500/20">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-xl">MALL OS</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ENTERPRISE
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium block">
                Sistema Operativo para Centros Comerciales
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-indigo-600 transition-colors">Soluciones</a>
            <a href="#executive" className="hover:text-indigo-600 transition-colors">Mall Executive</a>
            <a href="#store-os" className="hover:text-indigo-600 transition-colors">Store OS</a>
            <a href="#mobile" className="hover:text-indigo-600 transition-colors">App Visitante</a>
            <a href="#impacto" className="hover:text-indigo-600 transition-colors">Impacto & ROI</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://mall-os-web-portal.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white shadow-sm"
            >
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
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-20 pb-24 px-6 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Plataforma Digital de Retail Físico para Consorcios
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-5xl leading-[1.1]">
            El Sistema Operativo que Digitaliza los Grandes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Centros Comerciales</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
            Conectamos la experiencia de millones de visitantes con consolas de gestión en tiempo real para juntas directivas y más de 1.000 locales comerciales. Cero hardware, cero obras en techos y retorno medible por pasillo.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-105"
            >
              <span>Agendar Demostración Ejecutiva</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://mall-os-web-portal.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-7 py-4 rounded-2xl font-bold text-sm border border-slate-200 shadow-sm transition-all hover:border-slate-300"
            >
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Entrar al Portal Privado B2B</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Social Proof / Centros Comerciales */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 w-full max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Diseñado para los Principales Complejos Comerciales de la Región
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 text-slate-400 font-extrabold text-sm tracking-wider">
              <span className="hover:text-slate-800 transition-colors">SAMBIL CHACAO</span>
              <span className="text-slate-300">·</span>
              <span className="hover:text-slate-800 transition-colors">CENTRO COMERCIAL LA CASCADA</span>
              <span className="text-slate-300">·</span>
              <span className="hover:text-slate-800 transition-colors">CENTRO LÍDER</span>
              <span className="text-slate-300">·</span>
              <span className="hover:text-slate-800 transition-colors">TOLÓN FASHION MALL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MÉTRICAS CLAVE (KPIs DE NEGOCIO)                                       */}
      {/* ========================================================================= */}
      <section id="impacto" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-4xl font-black text-indigo-400 mb-2">+42 min</div>
              <div className="text-sm font-bold text-slate-200 mb-1">Permanencia Familiar</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Incremento promedio en tiempo de estadía gracias a la gamificación del Modo Niño.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-4xl font-black text-emerald-400 mb-2">18.4%</div>
              <div className="text-sm font-bold text-slate-200 mb-1">Conversión en Tienda</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                De las búsquedas en el Conserje IA se convierten en visitas y canjes presenciales en caja.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-4xl font-black text-blue-400 mb-2">3 seg</div>
              <div className="text-sm font-bold text-slate-200 mb-1">Validación POS Atómica</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                El cajero valida cupones QR con candado criptográfico para eliminar el fraude de papel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-4xl font-black text-amber-400 mb-2">0 Obras</div>
              <div className="text-sm font-bold text-slate-200 mb-1">Infraestructura Ligera</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Navegación 2.5D GPU y geolocalización asistida sin instalar antenas ni cablear techos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LOS 3 PILARES DEL PRODUCTO (ECOSISTEMA)                                */}
      {/* ========================================================================= */}
      <section id="soluciones" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-3">
            Arquitectura Integral de 3 Capas
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Una sola plataforma. Tres experiencias diseñadas para la excelencia.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Mall OS une al visitante que camina por los pasillos, al locatario que cobra en caja y a la gerencia que toma decisiones estratégicas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pilar 1: Mall Executive */}
          <div id="executive" className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/30">
                <Building2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Para la Junta Directiva
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Mall Executive Suite</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Cabina de mando con visibilidad total sobre afluencia, calor de vitrinas y retorno medible para la administración del centro comercial.
              </p>

              <ul className="space-y-3 text-xs font-semibold text-slate-700 border-t border-slate-200/60 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Embudo de conversión de pasillos en vivo</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Directorio multi-nivel de más de 500 locales</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Onboarding self-service con tokens para gerentes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conserje Broadcast con difusión segmentada</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <span className="text-xs font-bold text-indigo-600">Control operativo y financiero total →</span>
            </div>
          </div>

          {/* Pilar 2: Store OS */}
          <div id="store-os" className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                <Store className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                Para los Locatarios
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Store OS (Locales)</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                La herramienta que los gerentes de tienda aman: digitalización de inventario físico y validación instantánea de promociones en caja.
              </p>

              <ul className="space-y-3 text-xs font-semibold text-slate-700 border-t border-slate-200/60 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Catálogo D-086 con galería de fotos por color</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Validador POS atómico con cupones anti-fraude</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Publicación de ofertas flash en tiempo real</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cero fricción de IT: activación en 30 segundos</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <span className="text-xs font-bold text-blue-600">Tráfico directo del pasillo a la caja registradora →</span>
            </div>
          </div>

          {/* Pilar 3: App Móvil de Visitante */}
          <div id="mobile" className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-slate-900/30">
                <Smartphone className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Para el Visitante & Familias
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-3">App Móvil de Visitante</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Hospitalidad digital y navegación autónoma en smartphones. Diseñada con arquitectura offline-first para operar sin señal celular.
              </p>

              <ul className="space-y-3 text-xs font-semibold text-slate-700 border-t border-slate-200/60 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mapa 2.5D GPU vectorial con rutas paso a paso</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conserje IA conversacional para hallar marcas y productos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Modo Niño: Búsqueda del tesoro con gamificación</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Modo Accesible: Rutas exclusivas en ascensor</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-900">Hospitalidad y lealtad que multiplican las visitas →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SEGURIDAD Y PRIVACIDAD CORPORATIVA                                     */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Seguridad Empresarial & Multi-Tenant
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Aislamiento Estricto de Datos entre Locales y Centros Comerciales
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cada centro comercial opera en una partición segura protegida por PostgreSQL Row Level Security (RLS) y autenticación OAuth 2.0 criptográfica. Una tienda jamás puede ver las ventas ni la analítica de otra marca.
            </p>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <Lock className="w-5 h-5 text-indigo-600 mb-2" />
              <div className="text-xs font-bold text-slate-900">Cifrado de Extremo a Extremo</div>
              <p className="text-[11px] text-slate-500">Credenciales bajo hashing seguro y tokens JWT de sesión.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <Cpu className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-xs font-bold text-slate-900">Offline-First Engine</div>
              <p className="text-[11px] text-slate-500">Caché persistido en el teléfono para operar en sótanos sin señal.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <Baby className="w-5 h-5 text-amber-600 mb-2" />
              <div className="text-xs font-bold text-slate-900">Protección al Menor</div>
              <p className="text-[11px] text-slate-500">El Modo Niño no almacena datos biométricos ni de rastreo infantil.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <Accessibility className="w-5 h-5 text-emerald-600 mb-2" />
              <div className="text-xs font-bold text-slate-900">Accesibilidad Universal</div>
              <p className="text-[11px] text-slate-500">Cumplimiento estricto de estándares WCAG para movilidad reducida.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FORMULARIO DE DEMO / CONTACTO EJECUTIVO                                */}
      {/* ========================================================================= */}
      <section id="contacto" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-2">
              Piloto Comercial Llave en Mano
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Agende una Demostración Ejecutiva para su Centro Comercial
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Conozca en vivo el funcionamiento de Mall OS con el plano y los locales reales de su propio complejo comercial.
            </p>

            {demoRequested ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-lg text-white">¡Solicitud Recibida con Éxito!</h4>
                <p className="text-xs text-emerald-300">
                  Un director de Mall OS se comunicará en las próximas 24 horas para coordinar la demostración ejecutiva.
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
      {/* 7. FOOTER CORPORATIVO                                                     */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
              M
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">MALL OS</span>
              <p className="text-[11px] text-slate-400">© 2026 Mall OS Enterprise. Todos los derechos reservados.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href="#soluciones" className="hover:text-slate-900 transition-colors">Soluciones</a>
            <a href="#impacto" className="hover:text-slate-900 transition-colors">Impacto & ROI</a>
            <a
              href="https://mall-os-web-portal.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition-colors font-bold flex items-center gap-1"
            >
              <span>Portal Privado B2B</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
