import { expressionTypes } from '@riotjs/dom-bindings'

// Riot creates a fresh template chunk clone on every mount (see
// core/manage-component-lifecycle.js), so memoizing this function by template
// never hits and keeps every mounted component and its DOM alive forever.
/**
 * Get the computed attribute names from the template instance
 * @param {TemplateChunk} template - template instance
 * @returns {[]} list of attribute names that will be computed by the template expressions
 */
export const getRootComputedAttributeNames = (template) => {
  const firstBinding = template?.bindingsData?.[0]

  // if the first binding has the selector attribute it means that it doesn't belong to the root node
  if (firstBinding?.selector) return []

  return (
    firstBinding?.expressions?.reduce(
      (acc, { name, type }) =>
        type === expressionTypes.ATTRIBUTE ? acc.concat([name]) : acc,
      [],
    ) ?? []
  )
}
