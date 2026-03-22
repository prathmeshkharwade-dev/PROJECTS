export const timeAgo = (date) => {
  const days = Math.floor((Date.now() - new Date(date)) / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30)  return `${days}d ago`
  if (days < 60)  return '1mo ago'
  return `${Math.floor(days / 30)}mo ago`
}