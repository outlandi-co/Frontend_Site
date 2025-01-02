const Membership = () => {
  const tiers = [
      { level: 'Bronze', price: 10 },
      { level: 'Silver', price: 20 },
      { level: 'Gold', price: 30 },
  ];

  return (
      <div style={{ padding: '20px' }}>
          <h1>Choose Your Membership</h1>
          <ul>
              {tiers.map((tier) => (
                  <li key={tier.level}>
                      <h2>{tier.level} Membership</h2>
                      <p>Price: ${tier.price}/month</p>
                      <button>Enroll</button>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Membership;
