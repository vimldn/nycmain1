import type { RawPostFile } from './rentLeases'

import { rentLeases } from './rentLeases'
import { buildingIssues } from './buildingIssues'
import { safetySecurity } from './safetySecurity'
import { buildingViolationsPart1 } from './buildingViolationsPart1'
import { buildingViolationsPart2 } from './buildingViolationsPart2'
import { buildingViolationsPart3 } from './buildingViolationsPart3'

export type { RawPostFile }
export { rentLeases, buildingIssues, safetySecurity }

// Combine all building violations parts
export const buildingViolations = [
  ...buildingViolationsPart1,
  ...buildingViolationsPart2,
  ...buildingViolationsPart3,
]

export const allRawPosts: RawPostFile[] = [
  ...rentLeases,
  ...buildingIssues,
  ...safetySecurity,
  ...buildingViolations,
]
