import { PublishTemplate } from './convert-publish-template'

export function generatePublishTemplateSvg(template: PublishTemplate) {
  const style = {
    background: '#000000',
    foreground: '#ffffff',
    gradientStart: '#9945FF',
    gradientEnd: '#14F195',
    tagColor: '#888888',
    fontFamily: 'SF Pro, Inter, system-ui, sans-serif',
    titleFontSize: 120,
    descriptionFontSize: 60,
    tagFontSize: 40,
  }
  const width = 2400
  const height = 1260

  // A simple text wrapper
  function wrapText(text: string, lineLength: number): string[] {
    const words = text.split(' ')
    if (words.length === 0) return []
    const lines: string[] = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      if (currentLine.length + words[i].length + 1 <= lineLength) {
        currentLine += ' ' + words[i]
      } else {
        lines.push(currentLine)
        currentLine = words[i]
      }
    }
    lines.push(currentLine)
    return lines
  }

  const descriptionLines = wrapText(template.description, 40)
  const descriptionTspans = descriptionLines
    .map((line) => `<tspan x="${width / 2}" dy="1.2em">${line}</tspan>`)
    .join('')

  const tags = template.keywords?.join('  ·  ')

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${style.gradientStart}" />
          <stop offset="100%" stop-color="${style.gradientEnd}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="${style.background}" />
      <text
        x="${width / 2}"
        y="450"
        font-family="${style.fontFamily}"
        font-size="${style.titleFontSize}"
        font-weight="bold"
        fill="url(#titleGradient)"
        text-anchor="middle"
      >
        ${template.name}
      </text>
      <text
        y="580"
        font-family="${style.fontFamily}"
        font-size="${style.descriptionFontSize}"
        fill="${style.foreground}"
        text-anchor="middle"
      >
        ${descriptionTspans}
      </text>
      <text
        x="${width / 2}"
        y="850"
        font-family="${style.fontFamily}"
        font-size="${style.tagFontSize}"
        fill="${style.tagColor}"
        text-anchor="middle"
      >
        ${tags}
      </text>
    </svg>
  `
}
