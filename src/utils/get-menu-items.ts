import { TemplateJsonGroup, TemplateJsonTemplate } from './parse-template-json'

export interface MenuItem {
  description: string
  id: string
  name: string
  templates: TemplateJsonTemplate[]
}

export interface MenuConfigItem extends Omit<MenuItem, 'templates'> {
  groups: string[]
  keywords: string[]
}

export type MenuConfig = MenuConfigItem[]

export function getMenuItems({ config, groups }: { config: MenuConfig; groups: TemplateJsonGroup[] }): MenuItem[] {
  return config.map((config) => getMenuItem({ config, groups })).filter((structure) => !!structure)
}

function getMenuItem({
  config,
  groups,
}: {
  config: MenuConfigItem
  groups: TemplateJsonGroup[]
}): MenuItem | undefined {
  const templates: TemplateJsonTemplate[] = groups
    // Make sure we are looking in the groups defined in the MenuConfig
    .filter(({ path }) => config.groups.includes(path))
    // We are only interested in the Templates
    .flatMap((g) => g.templates)
    // Make sure we are taking only the templates that match the MenuConfig keywords (if they exist)
    .filter((template) =>
      config.keywords?.length ? config.keywords.every((i) => template.keywords.includes(i)) : true,
    )

  return templates?.length ? { ...config, templates } : undefined
}
