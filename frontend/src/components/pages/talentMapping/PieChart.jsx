import { groupColors } from './data'

export default function PieChart({ data, size = 250 }) {
  const total = data.reduce((sum, [, value]) => sum + value, 0)
  const radius = size / 2
  const stroke = Math.max(12, Math.round(size * 0.12))
  const circumference = 2 * Math.PI * (radius - stroke / 2)

  // Calculate segment dimensions functionally before rendering to avoid mutating offset
  const segments = data.map(([group, value], index) => {
    const dash = (value / total) * circumference
    const dashOffset = data
      .slice(0, index)
      .reduce((sum, [, val]) => sum + (val / total) * circumference, 0)
    return { group, dash, dashOffset }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Komposisi potensi">
      <g transform={`translate(${radius}, ${radius}) rotate(-90)`}>
        {segments.map(({ group, dash, dashOffset }) => (
          <circle 
            key={group} 
            r={radius - stroke / 2} 
            cx="0" 
            cy="0" 
            fill="none" 
            stroke={groupColors[group]} 
            strokeWidth={stroke} 
            strokeDasharray={`${dash} ${circumference - dash}`} 
            strokeDashoffset={-dashOffset} 
          />
        ))}
      </g>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontWeight="700" fontSize={Math.round(size * 0.11)} fill="#4b3b2b">
        {Math.round(((data[0]?.[1] || 0) / Math.max(1, total)) * 100)}%
      </text>
    </svg>
  )
}
