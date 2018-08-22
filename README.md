# Packing packages in trucks

This is a code test I was assigned. The test consists of putting packages
in trucks, using the minimum number of trucks, and assigning a price to the
manifest. This was done in express and exposes 1 public endpoint which takes
in a list of packages and returns a manifest with packages assigned to trucks.

[The original Node.js recruitment assignment](https://s3.eu-central-1.amazonaws.com/scott-dev-test-files/SwingDev+Node.js+Recruitment+Assignment.pdf)

[The original price list](https://s3.eu-central-1.amazonaws.com/scott-dev-test-files/SwingDev+Node.js+Recruitment+Task+Price+Table.pdf)

## To run the server
I'll assume you have Node 10 installed, that's what I used to write this.

Just run npm install and it'll start the server.
````
npm install
````

Then start the server
````
npm start
````

Then make a request to the server
````
curl -H "Content-type: application/json" -d '[
  { "id": "ID-1", "weight": 345 },
  { "id": "OTHER-ID-2", "weight": 500 },
  { "id": "CLIENT-ID-3", "weight": 300 }
]' 'http://localhost:8080/api'
````

The result should look something like this
````
{
  "price": 10.95,
  "trucks": [
    {
      "truckID": "90a676a4-77d7-4b9a-bcd1-3ae2863720ad",
      "load": [
        {
          "id": "OTHER-ID-2",
          "weight": 500
        },
        {
          "id": "ID-1",
          "weight": 345
        }
      ]
    },
    {
      "truckID": "790cbfe5-1da1-4845-8852-dcb544b7343c",
      "load": [
        {
          "id": "CLIENT-ID-3",
          "weight": 300
        }
      ]
    }
  ]
}
````

## To run the tests
Again you need Node 10 installed for this.

Run the npm dev install
````
npm install --dev
````

Then just run the tests
````
npm test
````
