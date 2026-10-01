// functions/_middleware.js — ogni sottodominio di magikenergy.it apre la sua landing.
// Cambia SOLO la radice «/»: tutto il resto (/api, /crm, /grazie, /privacy, immagini, video) passa com'è.
// L'indirizzo nella barra resta quello del sottodominio, con UTM e cr intatti.
const LANDING = {
  'offerta.magikenergy.it': '/12000/',
  'almese.magikenergy.it': '/rata/',
  'risparmio.magikenergy.it': '/risparmio/',
};
const CRM = 'crm.magikenergy.it';

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  if (url.pathname !== '/') return next();

  if (url.hostname === CRM) {
    return new Response(null, { status: 302, headers: { Location: '/crm/', 'Cache-Control': 'no-store' } });
  }

  const pagina = LANDING[url.hostname];
  if (!pagina) return next(); // pages.dev, prova.…: resta il 302 di _redirects verso /12000/

  const dentro = new URL(pagina, url.origin);
  dentro.search = url.search;
  return env.ASSETS.fetch(new Request(dentro.toString(), request));
}
