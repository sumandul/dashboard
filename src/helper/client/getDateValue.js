const getDateValue = (date) => {
  const dateValue = new Date(date);
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const day = String(dateValue.getDate()).padStart(2, "0");
  const year = dateValue.getFullYear();
  return `${year}-${month}-${day}`;
};
export default getDateValue;
