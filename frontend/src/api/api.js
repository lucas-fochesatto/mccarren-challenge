export const companyProfile = async (companyUrl, model) => {
  const response = await fetch('/api/company-profile', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: companyUrl, model }),
  });

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};