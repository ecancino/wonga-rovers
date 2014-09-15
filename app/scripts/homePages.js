angular.module('app.homePages', [])

  .controller('HomeCtrl', ['$scope', function($scope) {

    $scope.east = {
      name: 'east',
      arrow: 'glyphicon-chevron-right',
      update: function(position) {
        position.x += 1;
      },
      next: null,
      prev: null
    };

    $scope.north = {
      name: 'north',
      arrow: 'glyphicon-chevron-up',
      update: function(position) {
        position.y += 1;
      },
      next: null,
      prev: null
    };

    $scope.west = {
      name: 'west',
      arrow: 'glyphicon-chevron-left',
      update: function(position) {
        position.x -= 1;
      },
      next: null,
      prev: null
    };

    $scope.south = {
      name: 'south',
      arrow: 'glyphicon-chevron-down',
      update: function(position) {
        position.y -= 1;
      },
      next: null,
      prev: null
    };

    $scope.north.next = $scope.west;
    $scope.north.prev = $scope.east;
    $scope.west.next = $scope.south;
    $scope.west.prev = $scope.north;
    $scope.south.next = $scope.east;
    $scope.south.prev = $scope.west;
    $scope.east.next = $scope.north;
    $scope.east.prev = $scope.south;


    $scope.rovers = [
      {
        name: 'Sojourner',
        x: 1,
        y: 2,
        direction: $scope.north,
        mission: {
          start: {
            x: 1,
            y: 2,
            direction: $scope.north
          },
          steps: [
            'L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'
          ]
        },
        deployed: false
      },
      {
        name: 'Curiosity',
        x: 3,
        y: 3,
        direction: $scope.east,
        mission: {
          start: {
            x: 3,
            y: 3,
            direction: $scope.east
          },
          steps: [
            'M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M'
          ]
        },
        deployed: false
      }
    ];

    $scope.activeCell = function(rover, x, y) {
      return x === rover.x && y === rover.y;
    };

    $scope.deploy = function(rover) {
      if (!rover.mission.deployed) {
        angular.forEach(rover.mission.steps, function(step) {
          $scope.control(rover, step);
        });
        rover.mission.deployed = true;
      }
    };

    $scope.control = function(rover, command) {
      if(command === 'L') {
        rover.direction = rover.direction.next;
      } else if(command === 'R') {
        rover.direction = rover.direction.prev;
      } else if(command === 'M') {
        rover.direction.update(rover);
      }
    };

  }]);
