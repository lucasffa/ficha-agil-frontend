export function DateFormToSend(inputDate: string | null | undefined): string {
  // This function converts dates from various input formats into a format acceptable in C#.

  if (inputDate === null || inputDate === undefined) {
    return 'Invalid input date format'; // Handle null or undefined input
  }

  let date: Date | undefined; // Initialize date as undefined

  // Check if the input is in the "/Date(...)/" format
  const matchResult = inputDate.match(/\/Date\(\d+\)\//);
  if (matchResult) {
    const timestamp = parseInt(matchResult[0]);
    date = new Date(timestamp);
  } else if (inputDate.includes('/')) {
    // Check if the input is in the "dd/mm/yyyy" format
    const parts = inputDate.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);
      date = new Date(year, month, day);
    }
  } else {
    // Assume the input is in the textual format
    date = new Date(inputDate);
  }

  if (date === undefined || isNaN(date.getTime())) {
    return 'Invalid input date format'; // Handle undefined date or invalid date
  }

  return (
    date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]
  );
}
