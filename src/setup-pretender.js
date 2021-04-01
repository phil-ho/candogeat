import Pretender from 'pretender';
import faker from 'faker';

const foodNames = ['Acorn Squash', 'Brocolli', 'Carrot', 'Banana'];

const createItem = (id) => {
  return {
    id,
    image: faker.image.food(80, 80, true),
    name: faker.random.arrayElement(foodNames),
    rating: faker.random.number({
      min: -1,
      max: 1,
    }),
  };
}

// const things = [
//   {
//     id: 1,
//     name: 'Acorn Squash',
//     toxic: false,
//   },
//   {
//     id: 2,
//     name: 'Strawberry',
//     toxic: false,
//   },
//   {
//     id: 3,
//     name: 'Banana',
//     toxic: false,
//   },
//   {
//     id: 4,
//     name: 'Plantain',
//     toxic: false,
//   },
//   {
//     id: 5,
//     name: 'Banana Squash',
//     toxic: false,
//   },
//   {
//     id: 6,
//     name: 'Aloe',
//     toxic: true,
//   },
//   {
//     id: 7,
//     name: 'Buckeye',
//     toxic: true,
//   },
//   {
//     id: 8,
//     name: 'Buckwheat',
//     toxic: true,
//   },
//   {
//     id: 9,
//     name: 'Buddhist Pine',
//     toxic: true,
//   },
//   {
//     id: 10,
//     name: 'Barbados Aloe',
//     toxic: true,
//   },
// ];

const things = [];

for (let i = 0; i < 100; i++) {
  things.push(createItem(i));
}

export default () => {
  const server = new Pretender(function() {
    this.get('/api/search', request => {
      const queryString = request.queryParams.search;
      let results = [];

      if (queryString && queryString.length > 0) {
        results = things.filter((thing) => thing.name.toLowerCase().includes(queryString));
      }

      return [200, {"Content-Type": "application/json"}, JSON.stringify(results)];
    });

    this.post('/api/items/:itemId/vote', (request) => {
      const { itemId } = request.params;
      const { vote } = JSON.parse(request.requestBody);
      console.log(request, itemId, vote);

      return [200, {"Content-Type": "application/json"}, JSON.stringify({})];
    })
  });


};
