import { remark } from 'remark'
import html from 'remark-html'
import { log } from '@clack/prompts'

export async function convertMarkdownToHtml({ content, verbose }: { content: string; verbose: boolean }) {
  const result = await remark().use(html).process(content)

  if (verbose) {
    log.info(`Converted markdown to HTML`)
  }

  return result.toString()
}
