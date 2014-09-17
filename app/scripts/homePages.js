var Navigation = function() {

  var cardinalPoint = function(name, arrow, update) {
    this.name = name;
    this.arrow = arrow;
    this.update = update;
    this.next = null;
    this.prev = null;
  };

  this.east = new cardinalPoint('east', 'glyphicon-chevron-right', function(position) { position.x += 1; });
  this.north = new cardinalPoint('north', 'glyphicon-chevron-up', function(position) { position.y += 1; });
  this.west = new cardinalPoint('west', 'glyphicon-chevron-left', function(position) { position.x -= 1; });
  this.south = new cardinalPoint('south', 'glyphicon-chevron-down', function(position) { position.y -= 1; });

  this.north.next = this.west;
  this.north.prev = this.east;
  this.west.next = this.south;
  this.west.prev = this.north;
  this.south.next = this.east;
  this.south.prev = this.west;
  this.east.next = this.north;
  this.east.prev = this.south;

  return {
    east: this.east,
    north: this.north,
    west: this.west,
    south: this.south
  };
};

var HomeCtrl = function($scope, Navigation) {
  var home = this;

  home.rovers = [
    {
      name: 'Sojourner',
      x: 1,
      y: 2,
      direction: Navigation.north,
      mission: {
        start: {
          x: 1,
          y: 2,
          direction: Navigation.north
        },
        steps: [
          'L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'
        ],
        deployed: false
      }
    },
    {
      name: 'Curiosity',
      x: 3,
      y: 3,
      direction: Navigation.east,
      mission: {
        start: {
          x: 3,
          y: 3,
          direction: Navigation.east
        },
        steps: [
          'M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M'
        ],
        deployed: false
      }
    }
  ];

  home.activeCell = function(rover, x, y) {
    return x === rover.x && y === rover.y;
  };

  home.deploy = function(rover) {
    if (!rover.mission.deployed) {
      angular.forEach(rover.mission.steps, function(step) {
        home.control(rover, step);
      });
      rover.mission.deployed = true;
    }
  };

  home.control = function(rover, command) {
    if(command === 'L') {
      rover.direction = rover.direction.next;
    } else if(command === 'R') {
      rover.direction = rover.direction.prev;
    } else if(command === 'M') {
      rover.direction.update(rover);
    }
  };

  return home;
};
HomeCtrl.$inject = ['$scope', 'Navigation'];

angular.module('app.homePages', [])
.service('Navigation', Navigation)
.controller('HomeCtrl', HomeCtrl);
