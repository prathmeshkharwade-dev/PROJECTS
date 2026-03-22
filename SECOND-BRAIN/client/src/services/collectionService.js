import api from './api'

export const collectionService = {
  getAll:     ()              => api.get('/collections'),
  create:     (data)          => api.post('/collections', data),
  update:     (id, data)      => api.put(`/collections/${id}`, data),
  remove:     (id)            => api.delete(`/collections/${id}`),
  addItem:    (id, itemId)    => api.post(`/collections/${id}/items`, { itemId }),
  removeItem: (id, itemId)    => api.delete(`/collections/${id}/items/${itemId}`),
}