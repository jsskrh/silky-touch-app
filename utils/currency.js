const formatCurrency = (number) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(number * 865);
  return price;
};

export { formatCurrency };
