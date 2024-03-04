export const convertDate = (date: string) => {
    if (date == null) {
      return "";
    };
    const messageDate = new Date(date);
    const currentDate = new Date();

    if (
      currentDate.getFullYear() === messageDate.getFullYear() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getDate() === messageDate.getDate()
    ) {
      const timeOnly = messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      return timeOnly;

    } else {
      const fullDate = messageDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      return fullDate;
    }
  }