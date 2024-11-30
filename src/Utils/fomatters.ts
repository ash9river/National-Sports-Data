const days = ['월', '화', '수', '목', '금', '토', '일'];
export const formatWeekday = (weekday: string): string =>
  weekday
    .split('')
    .map((day, index) => (day === '1' ? days[index] : null))
    .filter(Boolean)
    .join(', ');
