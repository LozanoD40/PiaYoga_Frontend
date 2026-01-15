// helpers/authFetch.js
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token')

  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  }

  // SI ES FORMDATA, BORRAMOS EL CONTENT-TYPE
  if (options.body instanceof FormData) {
    delete headers['Content-Type']
  } else {
    // Solo si NO es FormData, nos aseguramos que sea JSON
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  return res
}
