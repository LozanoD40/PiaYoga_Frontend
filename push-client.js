// push-client.js (frontend)
const publicVapidKey = 'PUBLIC_KEY' // pega VAPID_PUBLIC que generaste

// utility to urlBase64ToUint8Array (necesario por la API)
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function subscribeUser() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push no soportado en este navegador')
    return null
  }

  // registrar service worker
  const swRegistration = await navigator.serviceWorker.register('/sw.js')
  // pedir permiso
  const permiso = await Notification.requestPermission()
  if (permiso !== 'granted') {
    console.warn('Permiso de notificaciones denegado')
    return null
  }

  // suscribirse
  const subscription = await swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  })

  // enviar al backend
  const token = localStorage.getItem('token') // o tu método de auth
  await fetch('https://<TU_BACKEND_RENDER>/api/push/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  })

  return subscription
}
