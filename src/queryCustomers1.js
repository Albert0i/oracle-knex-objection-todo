import db from './db.js';

async function run() {
  try {
    // Get all customers
    const customers = await db('CUSTOMERS').select('*').limit(3);
    console.log('All customers =', customers);

    // Find a customer by ID
    const customer = await db('CUSTOMERS')
      .where('CUSTOMERID', 'ALFKI')
      .first();
    console.log('Customer ALFKI =', customer);

    // Find customers in a specific city
    const berlinCustomers = await db('CUSTOMERS')
      .where('CITY', 'Berlin')
      .limit(3);
    console.log('Berlin Customers =', berlinCustomers);

    // First Berlin customer (shorthand)
    const firstBerlinCustomer = await db('CUSTOMERS')
      .where('CITY', 'Berlin')
      .first();
    console.log('First Berlin Customer =', firstBerlinCustomer);

    // Customers from Germany with a phone number
    const germanCustomers = await db('CUSTOMERS')
      .where('COUNTRY', 'Germany')
      .whereNotNull('PHONE')
      .limit(3);
    console.log('German Customers =', germanCustomers);

    // Customers whose company name starts with "A"
    const aCompanies = await db('CUSTOMERS')
      .where('COMPANYNAME', 'like', 'A%')
      .limit(3);
    console.log("Companies starts with 'A' =", aCompanies);

    // Order customers by company name alphabetically
    const orderedCompanyName = await db('CUSTOMERS')
      .orderBy('COMPANYNAME', 'asc')
      .limit(3);
    console.log('Order by Company Name =', orderedCompanyName);

    // Order customers by city, then company name
    const orderedByCityAndCompany = await db('CUSTOMERS')
      .orderBy('CITY', 'asc')
      .orderBy('COMPANYNAME', 'asc')
      .limit(3);
    console.log('Order By City and Company Name =', orderedByCityAndCompany);

    // Top 5 countries with the most customers, ordered by count descending
    const topCountries = await db('CUSTOMERS')
      .select('COUNTRY')
      .count('* as count')
      .groupBy('COUNTRY')
      .orderBy('count', 'desc')
      .limit(3);
    console.log('Top Countries =', topCountries);

    // Same query using raw SQL
    const topCountriesRaw = await db.raw(`
      SELECT COUNTRY, COUNT(*) AS count
      FROM CUSTOMERS
      GROUP BY COUNTRY
      ORDER BY count DESC
      FETCH FIRST 3 ROWS ONLY
    `);
    console.log('Top Countries (raw) =', topCountriesRaw);

  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();   // closes Oracle connections
  }
}

run();
