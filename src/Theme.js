// Design System Token Helper Constants

export const ASSIGNEES = [
  { name: 'George Clooney', initials: 'GC', color: 'bg-blue-600' },
  { name: 'Meryl Streep', initials: 'MS', color: 'bg-indigo-600' },
  { name: 'Bill Murray', initials: 'BM', color: 'bg-emerald-600' },
  { name: 'Jason Swartzman', initials: 'JS', color: 'bg-purple-600' },
  { name: 'Owen Wilson', initials: 'OW', color: 'bg-slate-600' },
];

export const COLUMNS = [
  { id: 'todo', title: 'To do', countColor: 'text-slate-400' },
  { id: 'in_progress', title: 'In Progress', countColor: 'text-indigo-400' },
  { id: 'review', title: 'Review', countColor: 'text-amber-400' },
  { id: 'done', title: 'Done', countColor: 'text-emerald-400' },
];

export const TASK_TYPES = {
  FEAT: {
    label: 'FEAT',
    badge: 'bg-indigo-950/90 text-indigo-300 border-indigo-700/60',
    bar: 'bg-indigo-500',
  },
  BUG: {
    label: 'BUG',
    badge: 'bg-rose-950/90 text-rose-300 border-rose-700/60',
    bar: 'bg-rose-500',
  }
};

export function getDueUrgencyToken(dueString, isDone = false) {
  if (isDone) {
    return 'bg-slate-800/60 text-slate-400 border-slate-700/40';
  }
  const lower = dueString.toLowerCase();
  if (lower.includes('h') || lower.includes('today')) {
    return 'bg-rose-950/80 text-rose-300 border-rose-800/50 shadow-sm shadow-rose-950/50';
  }
  if (lower.includes('1d') || lower.includes('2d')) {
    return 'bg-amber-950/80 text-amber-300 border-amber-800/50';
  }
  return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50';
}