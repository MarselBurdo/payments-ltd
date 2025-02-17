import { formatRelative } from 'date-fns';

export function RelativeDate({ date }: { date?: string }) {
  const now = new Date();
  const yesterday =  new Date(Date.now() - 86400000);
  return formatRelative(yesterday, now);
}
