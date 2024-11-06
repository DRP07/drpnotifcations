// self.addEventListener('message', (event) => {
//     const { title, options } = event.data;

  
//     if (title && options) {
//         self.registration.showNotification(title, options)
//             .then(() => {
//                 console.log("Notification sent!");
//             })
//             .catch(err => {
//                 console.error("Error : ", err);
//             });
//     }
// });


// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open('pwa-cache').then(cache => {
//             return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
//         })
//     );
//     self.skipWaiting();
// });

// self.addEventListener('install', event => {
//     console.log('Service Worker is installed');
//     event.waitUntil(
//         caches.open('pwa-cache').then(cache => {
//             return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
//         })
//     );
//     self.skipWaiting(); 
// });



// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             return response || fetch(event.request);
//         })
//     );
// });


// self.addEventListener('notificationclick', event => {
//     let message;
//     if (event.action === 'agree') {
//         message = "So we both agree on that!";
//     } else if (event.action === 'disagree') {
//         message = "Let's agree to disagree.";
//     }

//     event.notification.close();
//     if (message) {
//         self.clients.matchAll({ type: 'window' }).then(clients => {
//             clients.forEach(client => client.postMessage(message));
//         });
//     }
// });

// --------------------------------------------------------------------

// self.addEventListener('install', event => {
//     console.log('Service Worker is installed');
//     event.waitUntil(
//         caches.open('pwa-cache').then(cache => {
//             return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
//         })
//     );
//     self.skipWaiting();
// });

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//             return response || fetch(event.request);
//         })
//     );
// });

// self.addEventListener('message', (event) => {
//     const { title, options } = event.data;
//     if (title && options) {
//         self.registration.showNotification(title, options)
//             .then(() => {
//                 console.log("Notification sent!");
//             })
//             .catch(err => {
//                 console.error("Error : ", err);
//             });
//     }
// });

// self.addEventListener('notificationclick', event => {
//     let message;
//     if (event.action === 'agree') {
//         message = "So we both agree on that!";
//     } else if (event.action === 'disagree') {
//         message = "Let's agree to disagree.";
//     }
//     event.notification.close();
//     if (message) {
//         self.clients.matchAll({ type: 'window' }).then(clients => {
//             clients.forEach(client => client.postMessage(message));
//         });
//     }
// });

// self.addEventListener('activate', event => {
//     const currentCaches = ['pwa-cache'];

//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if (!currentCaches.includes(cacheName)) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });


// -----------------------------------------------------------------------
self.addEventListener('install', event => {
    console.log('Service Worker installed');
    event.waitUntil(
        caches.open('pwa-cache').then(cache => {
            return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== 'pwa-cache') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Ensure service worker takes control of the page immediately
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('message', (event) => {
    const { title, options } = event.data;

    console.log('Message received in service worker:', event.data);  // Add this line for debugging
  
    if (title && options) {
        self.registration.showNotification(title, options)
            .then(() => {
                console.log("Notification sent!");
            })
            .catch(err => {
                console.error("Error : ", err);
            });
    }
});
