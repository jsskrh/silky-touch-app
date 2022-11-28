const formatCurrency = (number) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
  return price;
};

export { formatCurrency };
