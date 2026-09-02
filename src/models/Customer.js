/**
 * Customer.js
 */
import { Model } from 'objection';

class Customer extends Model {
  static get tableName() {
    return 'CUSTOMERS';
  }

  static get idColumn() {
    return 'CUSTOMERID';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['customerId', 'companyName'],
      properties: {
        customerId: { type: 'string', maxLength: 5 },
        companyName: { type: 'string', maxLength: 40 },
        contactName: { type: 'string', maxLength: 30 },
        contactTitle: { type: 'string', maxLength: 30 },
        address: { type: 'string', maxLength: 60 },
        city: { type: 'string', maxLength: 30 },
        region: { type: 'string', maxLength: 15 },
        postalCode: { type: 'string', maxLength: 10 },
        country: { type: 'string', maxLength: 15 },
        phone: { type: 'string', maxLength: 24 },
        fax: { type: 'string', maxLength: 24 }
      }
    };
  }

  static get columnNameMappers() {
    return {
      parse(obj) {
        return {
          customerId: obj.CUSTOMERID,
          companyName: obj.COMPANYNAME,
          contactName: obj.CONTACTNAME,
          contactTitle: obj.CONTACTTITLE,
          address: obj.ADDRESS,
          city: obj.CITY,
          region: obj.REGION,
          postalCode: obj.POSTALCODE,
          country: obj.COUNTRY,
          phone: obj.PHONE,
          fax: obj.FAX
        };
      },
      format(obj) {
        return {
          CUSTOMERID: obj.customerId,
          COMPANYNAME: obj.companyName,
          CONTACTNAME: obj.contactName,
          CONTACTTITLE: obj.contactTitle,
          ADDRESS: obj.address,
          CITY: obj.city,
          REGION: obj.region,
          POSTALCODE: obj.postalCode,
          COUNTRY: obj.country,
          PHONE: obj.phone,
          FAX: obj.fax
        };
      }
    };
  }
}

export default Customer;
