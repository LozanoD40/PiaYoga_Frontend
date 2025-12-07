/* global clients */

self.addEventListener('push', (event) => {
  let data = {
    title: 'Notificación',
    body: 'Tienes una notificación nueva',
    url: '/',
  }

  try {
    data = event.data.json()
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    // ignore si viene vacío
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icons/icon-192.png',
    data: { url: data.url || '/' },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const url = event.notification.data.url || '/'

  event.waitUntil(clients.openWindow(url))
})
