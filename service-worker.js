self.addEventListener('message', (event) => {
    const { title, options } = event.data;

  
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


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('pwa-cache').then(cache => {
            return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
        })
    );
    self.skipWaiting();
});

self.addEventListener('install', event => {
    console.log('Service Worker is installed');
    event.waitUntil(
        caches.open('pwa-cache').then(cache => {
            return cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
        })
    );
    self.skipWaiting(); 
});



self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener('notificationclick', event => {
    let message;
    if (event.action === 'agree') {
        message = "So we both agree on that!";
    } else if (event.action === 'disagree') {
        message = "Let's agree to disagree.";
    }

    event.notification.close();
    if (message) {
        self.clients.matchAll({ type: 'window' }).then(clients => {
            clients.forEach(client => client.postMessage(message));
        });
    }
});
