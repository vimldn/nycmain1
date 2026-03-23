import type { RawPostFile } from './rentLeases'
import { rentLeases } from './rentLeases'
import { buildingIssues } from './buildingIssues'
import { safetySecurity } from './safetySecurity'
import { buildingViolationsPart1 } from './buildingViolationsPart1'
import { buildingViolationsPart2 } from './buildingViolationsPart2'
import { buildingViolationsPart3 } from './buildingViolationsPart3'
import { junkRemoval } from './junkRemoval'
import { movingCompanies } from './movingCompanies'
import { packingServices } from './packingServices'
import { pressLaunch } from './pressLaunch'
export type { RawPostFile }
export { rentLeases, buildingIssues, safetySecurity, junkRemoval, movingCompanies, packingServices, pressLaunch }
// Combine all building violations parts
export const buildingViolations = [
  ...buildingViolationsPart1,
  ...buildingViolationsPart2,
  ...buildingViolationsPart3,
]
export const allRawPosts: RawPostFile[] = [
  ...pressLaunch,
  ...rentLeases,
  ...buildingIssues,
  ...safetySecurity,
  ...buildingViolations,
  ...junkRemoval,
  ...movingCompanies,
  ...packingServices,
]
