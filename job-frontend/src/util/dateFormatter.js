const dateFormatter = (givenDate) => {
  const date = new Date(givenDate);

  return date.toLocaleString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default dateFormatter;
