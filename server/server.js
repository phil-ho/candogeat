const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));


const things = [
  {
    id: 1,
    name: 'Acorn Squash',
    toxic: false,
  },
  {
    id: 2,
    name: 'Strawberry',
    toxic: false,
  },
  {
    id: 3,
    name: 'Banana',
    toxic: false,
  },
  {
    id: 4,
    name: 'Plantain',
    toxic: false,
  },
  {
    id: 5,
    name: 'Banana Squash',
    toxic: false,
  },
  {
    id: 6,
    name: 'Aloe',
    toxic: true,
  },
  {
    id: 7,
    name: 'Buckeye',
    toxic: true,
  },
  {
    id: 8,
    name: 'Buckwheat',
    toxic: true,
  },
  {
    id: 9,
    name: 'Buddhist Pine',
    toxic: true,
  },
  {
    id: 10,
    name: 'Barbados Aloe',
    toxic: true,
  },
];



app.get('/api/search', (req, res) => {
  const {
    search,
  } = req.query;

  results = {
    page: 0,
    search,
    results: [
      {
        name: 'Zucchini Squash',
        toxic: false,
      }
    ]
  };

  res.status(200).send(results);
});

app.get('/api/suggestions', (req, res) => {
  const {
    q,
  } = req.query;
  console.log('requesting suggestions for ', q);
  const matches = things.filter((thing) => thing.name.toLowerCase().includes(q)).slice(0, 5);
  console.log('sending back', matches);
  res.send(matches);
});

app.listen(port, () => {
  console.log('app listening on port', port);
});
