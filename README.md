# Wonga Rovers

## Installation

1. `npm install -g grunt-cli`
2. `npm install`
3. `grunt install`

## Development

1. `grunt dev`
2. Go to: `http://localhost:8888`

## Testing

### Run all tests with
`grunt test` 

### Unit Testing

#### Single run tests
`grunt test:unit` 

#### Auto watching tests
`grunt autotest:unit`

### End to End Testing (Protractor)

#### Single run tests
`grunt test:e2e` 

#### Auto watching tests
`grunt autotest:e2e`

### Coverage Testing

`grunt coverage`

## TODO

* Move grid to a directive
* Move grid to a factory that uses a matrix
* ~~Add continous move forward~~
* ~~Add grid boundaries to movement~~
* ~~Move navigation (north, east, west, south) to a factory~~
* ~~Fix the mission to be called at any time~~
* ~~Use Controller As syntax~~
