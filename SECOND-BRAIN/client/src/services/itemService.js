import api from './api'

export const itemService = {
  getAll:  ()         => api.get('/items'),
  getOne:  (id)       => api.get(`/items/${id}`),
  create:  (data)     => api.post('/items', data),
  update:  (id, data) => api.put(`/items/${id}`, data),
  remove:  (id)       => api.delete(`/items/${id}`),
  search:  (q)        => api.get(`/search?q=${q}`),
}