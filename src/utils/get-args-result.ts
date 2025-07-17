import { AppInfo } from './get-app-info'

export interface GetArgsResult {
  app: AppInfo
  dryRun: boolean
  verbose: boolean
}
