export const lastActiveFormatter = (date: string) => {
  const currentDate = new Date();
  const inputDate = new Date(date);
  const inputDay = inputDate.getDate();
  const inputMonth = inputDate.getMonth();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const timeDifferenceInHours = (currentDate.getTime() - inputDate.getTime()) / (60 * 60 * 1000);

  if (
    inputDay === currentDay &&
    inputMonth === currentMonth &&
    inputDate.getFullYear() === currentYear
  ) {
    // To jest dzisiaj
    if (timeDifferenceInHours < 1) {
      // Mniej niż 1 godzina, zwróć liczbę minut
      const minutesDifference = Math.round(timeDifferenceInHours * 60);
      return minutesDifference > 1 ? `${minutesDifference} minutes ago` : minutesDifference == 1 ? `${minutesDifference} minute ago` : "moment ago";
    } else {
      // W przeciwnym razie zwróć liczbę godzin
      const hours = Math.floor(timeDifferenceInHours)
      return hours != 1 ? `${hours} hours ago` : `${hours} hour ago`;
    }
  } else if (
    inputDay === currentDay - 1 &&
    inputMonth === currentMonth &&
    inputDate.getFullYear() === currentYear
  ) {
    // To było wczoraj
    return 'yesterday';
  } else {
    return `${inputDay}.${inputMonth}`
  }
}
