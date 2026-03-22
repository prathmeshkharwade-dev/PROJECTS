import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { TYPE_CONFIG } from '../../utils/theme'
import { getLinks } from '../../utils/graphHelpers'

export default function GraphCanvas({ items, selectedId, onSelect, dark }) {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el || !items.length) return
    const w = el.clientWidth, h = el.clientHeight
    const nodes = items.map(d => ({ ...d, id: d._id || d.id }))
    const links = getLinks(items)

    const svg = d3.select(el)
    svg.selectAll('*').remove()

    const g = svg.append('g')
    svg.call(d3.zoom().scaleExtent([0.1, 6]).on('zoom', e => g.attr('transform', e.transform)))
    svg.on('click.bg', () => onSelect(null))

    const defs = svg.append('defs')

    // Glow filter
    const filter = defs.append('filter').attr('id', 'glow')
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur')
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Grid pattern
    const pat = defs.append('pattern')
      .attr('id', 'grid').attr('width', 30).attr('height', 30)
      .attr('patternUnits', 'userSpaceOnUse')
    pat.append('circle').attr('cx', 1).attr('cy', 1).attr('r', 0.8)
      .attr('fill', dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)')

    g.append('rect')
      .attr('width', w * 6).attr('height', h * 6)
      .attr('x', -w * 2).attr('y', -h * 2)
      .attr('fill', 'url(#grid)').style('pointer-events', 'all')

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(d => 160 - d.strength * 15).strength(0.4))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(w / 2, h / 2))
      .force('collide', d3.forceCollide(60))

    const link = g.append('g').selectAll('line').data(links).join('line')
      .attr('stroke', dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)')
      .attr('stroke-width', d => d.strength * 0.8 + 0.5)

    const node = g.append('g').selectAll('g').data(nodes, d => d.id).join('g')
      .attr('cursor', 'pointer')
      .on('click', (e, d) => { e.stopPropagation(); onSelect(d.id) })
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
        .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y })
        .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null })
      )

    // Outer glow ring
    node.append('circle').attr('r', 34)
      .attr('fill', d => TYPE_CONFIG[d.type]?.color + '08' || '#7C6FCD08')
      .attr('stroke', d => TYPE_CONFIG[d.type]?.color || '#7C6FCD')
      .attr('stroke-width', 0.5).attr('opacity', 0.4)

    // Main circle
    node.append('circle').attr('r', 22)
      .attr('fill', dark ? '#1C1C28' : '#FFFFFF')
      .attr('stroke', d => TYPE_CONFIG[d.type]?.color || '#7C6FCD')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#glow)')

    // Icon
    node.append('text')
      .text(d => TYPE_CONFIG[d.type]?.icon || '◈')
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
      .attr('fill', d => TYPE_CONFIG[d.type]?.color || '#7C6FCD')
      .attr('font-size', '13px').style('pointer-events', 'none')

    // Label
    node.append('text')
      .text(d => d.title.length > 16 ? d.title.slice(0, 16) + '…' : d.title)
      .attr('text-anchor', 'middle').attr('y', 36)
      .attr('fill', dark ? '#4E4A70' : '#9490B8')
      .attr('font-size', '9px').style('pointer-events', 'none')

    sim.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    return () => sim.stop()
  }, [items.length, dark])

  useEffect(() => {
    const svg = d3.select(ref.current)
    if (!selectedId) {
      svg.selectAll('g g').attr('opacity', 1)
      svg.selectAll('line').attr('opacity', 1)
      return
    }
    const links = getLinks(items)
    const connected = new Set()
    links.forEach(l => {
      if (l.source === selectedId || l.source?.id === selectedId) connected.add(l.target?.id || l.target)
      if (l.target === selectedId || l.target?.id === selectedId) connected.add(l.source?.id || l.source)
    })
    svg.selectAll('g g').attr('opacity', function () {
      const d = d3.select(this).datum()
      return (!d || d.id === selectedId || connected.has(d.id)) ? 1 : 0.12
    })
    svg.selectAll('line').each(function (d) {
      const s = d.source?.id || d.source, t = d.target?.id || d.target
      const hit = s === selectedId || t === selectedId
      d3.select(this)
        .attr('stroke', hit ? '#7C6FCD' : 'rgba(255,255,255,0.04)')
        .attr('opacity', hit ? 1 : 0.08)
        .attr('stroke-width', hit ? d.strength * 2 : 0.5)
    })
  }, [selectedId, items])

  return <svg ref={ref} className="w-full h-full block" />
}