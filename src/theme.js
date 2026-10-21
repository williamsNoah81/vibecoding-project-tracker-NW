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

/**
 * Calculates due date status and relative label based on ISO timestamp/date input.
 */
export function getDueUrgencyToken(dueDateISO, isDone = false) {
  if (isDone) {
    return {
      label: 'Completed',
      badgeClass: 'bg-slate-800/60 text-slate-400 border-slate-700/40',
      barClass: 'border-l-slate-600',
    };
  }

  if (!dueDateISO) {
    return {
      label: 'No Due Date',
      badgeClass: 'bg-slate-800/60 text-slate-400 border-slate-700/40',
      barClass: 'border-l-slate-600',
    };
  }

  const dueTime = new Date(dueDateISO).getTime();
  const now = Date.now();
  const diffHours = (dueTime - now) / (1000 * 60 * 60);

  // Past Due or critical (< 4 hours) -> RED
  if (diffHours < 4) {
    let label = 'Past Due';
    if (diffHours > 0) {
      label = `Due in ${Math.ceil(diffHours)}h`;
    } else if (Math.abs(diffHours) < 24) {
      label = `Past Due (${Math.floor(Math.abs(diffHours))}h ago)`;
    } else {
      label = `Past Due (${Math.floor(Math.abs(diffHours) / 24)}d ago)`;
    }

    return {
      label,
      badgeClass: 'bg-rose-950/90 text-rose-300 border-rose-800/60 shadow-sm shadow-rose-950/50',
      barClass: 'border-l-rose-500',
    };
  }

  // Under 24 hours -> ORANGE
  if (diffHours < 24) {
    return {
      label: diffHours <= 12 ? `Due in ${Math.ceil(diffHours)}h` : 'Due Today',
      badgeClass: 'bg-amber-950/90 text-amber-300 border-amber-800/60',
      barClass: 'border-l-amber-500',
    };
  }

  // Over 24 hours (Over a day away) -> GREEN
  const daysAway = Math.ceil(diffHours / 24);
  return {
    label: `Due in ${daysAway}d`,
    badgeClass: 'bg-emerald-950/90 text-emerald-300 border-emerald-800/60',
    barClass: 'border-l-emerald-500',
  };
}