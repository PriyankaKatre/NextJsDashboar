export const dateString = (isoDate) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) {
    return text;
  }
  return text?.slice(0, maxLength) + "...";
};
