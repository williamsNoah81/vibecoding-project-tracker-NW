/**
 * Formats task details into a structured, clean prompt briefing for AI tools.
 */
export function formatTaskBrief(task) {
  const toolText = task.contextTool ? `Target Tool: ${task.contextTool}` : '';
  const dueText = task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleString()}` : '';

  return `# Task Briefing: ${task.title}

**Type:** ${task.type || 'FEAT'}
**Assignee:** ${task.assignee || 'Unassigned'}
${dueText}
${toolText}

---

## Prompt Context & Technical Instructions

${task.promptContext || 'No context provided.'}
`;
}