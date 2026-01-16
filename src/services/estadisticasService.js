import { authFetch } from '../helpers/authFetch'

const API = import.meta.env.VITE_API_URL

export async function obtenerRutinasUsuario() {
  const res = await authFetch(`${API}/usuarios/rutina`)

  if (!res.ok) {
    throw new Error('Error obteniendo rutinas')
  }

  const data = await res.json()
  return data
}
