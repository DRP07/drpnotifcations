// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//             console.log('Service Worker registered with scope: ', registration.scope);
//         })
//         .catch(error => {
//             console.error('Service Worker registration failed:', error);
//         });
// }


// const sendNotificationsBtn = document.getElementById('sendNotifications');
// const notificationForm = document.getElementById('notificationForm');
// const showNotificationBtn = document.getElementById('showNotification');
// const output = document.getElementById('output');


// document.addEventListener('DOMContentLoaded', () => {
//     console.log(Notification.permission); 
//     if (Notification.permission === 'granted') {
//         sendNotificationsBtn.style.display = 'none';
//         notificationForm.style.display = 'block';
//     }
// });

// sendNotificationsBtn.addEventListener('click', async () => {
//     const permission = await Notification.requestPermission();
//     console.log('Notification permission:', permission);
//     if (permission === 'granted') {
//         sendNotificationsBtn.style.display = 'none';
//         notificationForm.style.display = 'block';
//     }
// });


// showNotificationBtn.addEventListener('click', () => {
//     const title = document.getElementById('title').value;
//     const body = document.getElementById('body').value;

//     if (!title) {
//         output.textContent = 'Please enter a title.';
//         return;
//     }

//     const options = {
//         body: body,
//         actions: [
//             { action: 'agree', title: 'Agree' },
//             { action: 'disagree', title: 'Disagree' }
//         ]
//     };

//     console.log('Sending message to service worker whose title is:', title); 
//     if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
//         navigator.serviceWorker.controller.postMessage({ title, options });
//     }
// });

// navigator.serviceWorker.addEventListener('message', (event) => {
//     output.textContent = event.data;
// });
// Register the service worker if it's available in the browser
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope: ', registration.scope);
            
            // Check if the service worker is controlling the page after registration
            navigator.serviceWorker.ready.then(registration => {
                console.log('Service Worker is controlling the page.');
            }).catch(err => {
                console.log('Error while waiting for Service Worker to take control:', err);
            });

        })
        .catch(err => {
            console.error('Service Worker registration failed: ', err);
        });
} else {
    console.error('Service Worker is not supported in this browser.');
}

// Check if the service worker is controlling the page
if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    console.log('Service Worker is controlling the page');
    
    // Handle button click to send notifications
    document.getElementById('showNotification').addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        // Send message to service worker if title and body are filled
        if (title && body) {
            navigator.serviceWorker.controller.postMessage({
                title: title,
                options: {
                    body: body,
                    icon: '/icon.png'  // Set your icon path here
                }
            });
        } else {
            document.getElementById('messageOutput').textContent = 'Please fill in both title and body fields.';
        }
    });

} else {
    console.log('Service Worker is not yet available or not controlling the page');
    document.getElementById('messageOutput').textContent = 'Service Worker is not yet ready.';
}

// Request permission for notifications if it's not already granted
if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            document.getElementById('notificationForm').style.display = 'block'; // Show form when permission granted
        } else {
            document.getElementById('messageOutput').textContent = 'You have denied notifications. You can enable them from browser settings.';
        }
    });
} else if (Notification.permission === 'granted') {
    document.getElementById('notificationForm').style.display = 'block';  // Show form if permission is granted
}
