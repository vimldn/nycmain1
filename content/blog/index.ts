import type { RawPostFile } from './rentLeases'

import { rentLeases } from './rentLeases'
import { buildingIssues } from './buildingIssues'
import { safetySecurity } from './safetySecurity'
import { buildingViolations } from './buildingViolations'

export type { RawPostFile }
export { rentLeases, buildingIssues, safetySecurity, buildingViolations }

export const allRawPosts: RawPostFile[] = [
  ...rentLeases,
  ...buildingIssues,
  ...safetySecurity,
  ...buildingViolations,
]
