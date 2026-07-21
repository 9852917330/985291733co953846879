const CACHE_NAME="millionaire-v22-full-width-chart-fix";
const APP_SHELL=[
  "./","./index.html","./millionaire.html","./manifest.webmanifest",
  "./millionaire-favicon-v14.ico","./millionaire-icon-192-v14.png","./millionaire-icon-512-v14.png",
  "./millionaire-apple-touch-icon-v14.png","./lightweight-charts.standalone.production.js"
];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME&&/millionaire|crypto100|fullcapital/i.test(key)).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  const request=event.request;
  if(request.method!=="GET")return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const isDocument=request.mode==="navigate"||request.destination==="document"||/\.(?:html?|webmanifest)$/i.test(url.pathname);
  if(isDocument){
    event.respondWith(fetch(request).then(response=>{
      const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));return response;
    }).catch(()=>caches.match(request).then(hit=>hit||caches.match("./millionaire.html"))));
    return;
  }
  event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>{
    const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));return response;
  })));
});
