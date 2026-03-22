export const getLinks = (items) => {
  const links = []
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const shared = items[i].tags.filter(t => items[j].tags.includes(t))
      if (shared.length) {
        links.push({
          source:   items[i]._id || items[i].id,
          target:   items[j]._id || items[j].id,
          strength: shared.length,
          shared,
        })
      }
    }
  }
  return links
}