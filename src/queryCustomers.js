import db from './db.js';
import Customer from './models/Customer.js';

async function run() {
  try {
    // Get all customers
    const customers = await Customer.query();
    console.log('All customers =', customers)

    // Find a customer by ID
    const customer = await Customer.query().findById('ALFKI');
    console.log('Customer ALFKI =', customer)

    // Find customers in a specific city
    const berlinCustomers = await Customer.query().findOne({ CITY: 'Berlin' }) 
    console.log('Berlin Customers =', berlinCustomers);
    // Or with findOne shorthand
    const firstBerlinCustomer = await Customer.query().findOne({ CITY: 'Berlin' });
    console.log('firstBerlinCustomer =', firstBerlinCustomer);

    // Customers from Germany with a phone number
    const germanCustomers = await Customer.query()
      .where('COUNTRY', 'Germany')
      .whereNotNull('PHONE');
    console.log('germanCustomers =', germanCustomers);

    // Customers whose company name starts with "A"
    const aCompanies = await Customer.query()
      .where('COMPANYNAME', 'like', 'A%');
    console.log('aCompanies =', aCompanies);

    // Order customers by company name alphabetically
    const orderedCustomers = await Customer.query()
      .orderBy('COMPANYNAME', 'asc');
    console.log('orderedCustomers =', orderedCustomers);

    // Order customers by city, then company name
    const orderedByCityAndCompany = await Customer.query()
      .orderBy('CITY', 'asc')
      .orderBy('COMPANYNAME', 'asc');
    console.log('orderedByCityAndCompany =', orderedByCityAndCompany);

    // Top 5 countries with the most customers, ordered by count descending
    const topCountries = await Customer.query()
      .select('COUNTRY')
      .count('* as count')
      .groupBy('COUNTRY')
      .orderBy('count', 'desc')
      .limit(5);

  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();   // closes Oracle connections
  }
}

run();
