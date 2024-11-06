if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope: ', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}


const sendNotificationsBtn = document.getElementById('sendNotifications');
const notificationForm = document.getElementById('notificationForm');
const showNotificationBtn = document.getElementById('showNotification');
const output = document.getElementById('output');


document.addEventListener('DOMContentLoaded', () => {
    console.log(Notification.permission); 
    if (Notification.permission === 'granted') {
        sendNotificationsBtn.style.display = 'none';
        notificationForm.style.display = 'block';
    }
});

sendNotificationsBtn.addEventListener('click', async () => {
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    if (permission === 'granted') {
        sendNotificationsBtn.style.display = 'none';
        notificationForm.style.display = 'block';
    }
});


showNotificationBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    if (!title) {
        output.textContent = 'Please enter a title.';
        return;
    }

    const options = {
        body: body,
        actions: [
            { action: 'agree', title: 'Agree' },
            { action: 'disagree', title: 'Disagree' }
        ]
    };

    console.log('Sending message to service worker whose title is:', title); 
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ title, options });
    }
});

navigator.serviceWorker.addEventListener('message', (event) => {
    output.textContent = event.data;
});
