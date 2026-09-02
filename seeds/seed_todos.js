/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('TODO_LIST').del();
  
  // Inserts seed entries with LOCATION and TELNUM
  const todos = [
    { 
      TITLE: 'Fix the quantum interference device broken by Stuart Bloom', 
      STATUS: 'PENDING',
      LOCATION: 'The Comic Center of Pasadena',
      TELNUM: '555-0143'
    },
    { 
      TITLE: 'Escape the repressive AI on the idyllic version of Earth', 
      STATUS: 'PENDING',
      LOCATION: 'Simulation Matrix Sector 4',
      TELNUM: '555-0199'
    },
    { 
      TITLE: 'Enlist a powerful wizard to help Bert find a sorcery gift', 
      STATUS: 'PENDING',
      LOCATION: 'Caltech Geology Lab',
      TELNUM: '555-0172'
    },
    { 
      TITLE: 'Survive the post-apocalyptic Pasadena and avoid giant moths', 
      STATUS: 'PENDING',
      LOCATION: 'Ruins of Los Robles Avenue',
      TELNUM: '555-0121'
    },
    { 
      TITLE: 'Barter canned vegetables and cat food for rare comic books', 
      STATUS: 'PENDING',
      LOCATION: 'Stuart’s Back Room Storage',
      TELNUM: '555-0144'
    },
    { 
      TITLE: 'Overthrow military dictator Barry Kripke in alternate reality', 
      STATUS: 'PENDING',
      LOCATION: 'Plasma Physics Bastion',
      TELNUM: '555-0185'
    },
    { 
      TITLE: 'Locate Denise after she mysteriously disappears in the multiverse', 
      STATUS: 'PENDING',
      LOCATION: 'Quantum Rift Coordinate X-72',
      TELNUM: '555-0166'
    },
    { 
      TITLE: 'Convince doctors in the mental institution that the multiverse is real', 
      STATUS: 'PENDING',
      LOCATION: 'Pasadena Medical Facility Room 3B',
      TELNUM: '555-0150'
    },
    { 
      TITLE: 'Break out of the Matrix pods before reality resets again', 
      STATUS: 'PENDING',
      LOCATION: 'Power Plant Sub-Level 9',
      TELNUM: '555-0111'
    },
    { 
      TITLE: 'Undo the multiverse Armageddon accidentally unleashed by the gang', 
      STATUS: 'PENDING',
      LOCATION: 'Apartment 4A Living Room',
      TELNUM: '555-0100'
    },
    { 
      TITLE: 'Help Gary secure his new job working for UPS', 
      STATUS: 'PENDING',
      LOCATION: 'Pasadena Distribution Center',
      TELNUM: '555-0132'
    },
    { 
      TITLE: 'Find the original universe where Leonard and Sheldon live', 
      STATUS: 'PENDING',
      LOCATION: 'Alpha Timeline Coordinates',
      TELNUM: '555-0101'
    }
  ];

  for (const todo of todos) {
    await knex('TODO_LIST').insert(todo);
  }
}
