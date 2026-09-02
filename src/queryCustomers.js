import db from './db.js';
import Customer from './models/Customer.js';

async function run() {
  try {
    // Get all customers
    const customers = await Customer.query().limit(3);
    console.log('All customers =', customers)

    // Find a customer by ID
    const customer = await Customer.query().findById('ALFKI');
    console.log('Customer ALFKI =', customer)

    // Find customers in a specific city
    const berlinCustomers = await Customer.query().findOne({ CITY: 'Berlin' }).limit(3) 
    console.log('Berlin Customers =', berlinCustomers);
    // Or with findOne shorthand
    const firstBerlinCustomer = await Customer.query().findOne({ CITY: 'Berlin' }).limit(3);
    console.log('First Berlin Customer =', firstBerlinCustomer);

    // Customers from Germany with a phone number
    const germanCustomers = await Customer.query()
      .where('COUNTRY', 'Germany')
      .whereNotNull('PHONE').limit(3);
    console.log('German Customers =', germanCustomers);

    // Customers whose company name starts with "A"
    const aCompanies = await Customer.query()
      .where('COMPANYNAME', 'like', 'A%').limit(3);
    console.log("Companies starts with 'A' =", aCompanies);

    // Order customers by company name alphabetically
    const orderedCompanyName = await Customer.query()
      .orderBy('COMPANYNAME', 'asc').limit(3);
    console.log('Order by Company Name =', orderedCompanyName);

    // Order customers by city, then company name
    const orderedByCityAndCompany = await Customer.query()
      .orderBy('CITY', 'asc')
      .orderBy('COMPANYNAME', 'asc')
      .limit(3);
    console.log('Order By City and Company Name =', orderedByCityAndCompany);

    // Top 5 countries with the most customers, ordered by count descending
    const topCountries = await Customer.query()
      .select('COUNTRY')
      .count('* as count')
      .groupBy('COUNTRY')
      .orderBy('count', 'desc')
      .limit(3);
    console.log('Top Countries =', topCountries);

    const topCountriesRaw = await db.raw(`
      SELECT COUNTRY, COUNT(*) AS count
      FROM CUSTOMERS
      GROUP BY COUNTRY
      ORDER BY count DESC
      FETCH FIRST 3 ROWS ONLY
    `);

    console.log('Top Countries =', topCountriesRaw);

  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();   // closes Oracle connections
  }
}

run();
