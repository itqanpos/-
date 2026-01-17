// اسم التطبيق للتخزين
const APP_NAME = 'quran-player';
const CACHE_NAME = `${APP_NAME}-v3.0`;

// الملفات التي يجب تخزينها مؤقتاً
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/quran-data.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: تثبيت');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: تخزين الملفات في ذاكرة التخزين المؤقت');
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: تفعيل');
    
    // حذف ذاكرات التخزين القديمة
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: حذف ذاكرة التخزين القديمة', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
    // تجاهل طلبات POST
    if (event.request.method !== 'GET') return;
    
    // تجاهل طلبات chrome-extension
    if (event.request.url.includes('chrome-extension')) return;
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إذا وجد الملف في ذاكرة التخزين المؤقت
                if (response) {
                    console.log('Service Worker: تحميل من ذاكرة التخزين المؤقت:', event.request.url);
                    return response;
                }
                
                // إذا لم يوجد، تحميل من الشبكة
                console.log('Service Worker: تحميل من الشبكة:', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // التحقق من أن الاستجابة صالحة
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // استنساخ الاستجابة
                        const responseToCache = response.clone();
                        
                        // تخزين الملف الجديد في ذاكرة التخزين المؤقت
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.log('Service Worker: فشل التحميل:', error);
                        
                        // إذا فشل التحميل من الشبكة، يمكن إرجاع صفحة بديلة
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // أو يمكن إرجاع رسالة خطأ
                        return new Response('لا يوجد اتصال بالإنترنت', {
                            status: 408,
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});

// استقبال الرسائل
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
