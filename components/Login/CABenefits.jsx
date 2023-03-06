const style = { benefitsText: `mb-2`, listMarker: `mr-2` };

const CABenefits = () => {
  const benefits = [
    "Latest News & Exclusive Offers",
    "Order History & Address Book",
    "Save items in your Wish List",
  ];

  return (
    <div className={style.caBenefits}>
      <p className={style.benefitsText}>
        Register with the Silky Touch Online Store and enjoy the benefits of
        having an account:
      </p>
      <ul className={style.benefitsList}>
        {benefits.map((benefit, index) => (
          <li key={index}>
            <span className={style.listMarker}>-</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CABenefits;
