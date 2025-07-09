export const companyProfile = async (companyUrl) => {
    console.log(`Fetching profile for: ${companyUrl}`);
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple URL validation
    if (!companyUrl.startsWith('http') || !companyUrl.includes('.')) {
        throw new Error("Please enter a valid URL (e.g., https://www.company.com).");
    }

    // Returns the mocked object as specified
    return {
      "company_name": "Lockheed Martin Corporation",
      "company_description": "Lockheed Martin Corporation is a global leader in aerospace, defense, and security, providing innovative solutions across air, land, sea, space, and cyber domains. It delivers advanced technology systems, products, and services to support the most critical and complex missions for governments, militaries, and commercial customers worldwide.",
      "tier1_keywords": "aerospace, defense systems, missile defense, fighter jets, unmanned aerial systems, cyber security, space systems, C4ISR, radar, weapon systems, aircraft, training and simulation, satellite systems",
      "tier2_keywords": "artificial intelligence, autonomy, directed energy, spectrum dominance, digital transformation, sustainability, border security, sustainment, logistics, human space exploration, weather and earth science, electronic warfare, hypersonics",
      "service_line": "Aerospace and Defense Contractor",
      "emails": "", // Field for the user to fill in
      "poc": ""      // Field for the user to fill in
    };
};