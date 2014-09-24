var Navigation = function() {
  var cardinalPoint = function(name, arrow, update) {
    this.name = name;
    this.arrow = arrow;
    this.update = update;
    this.next = null;
    this.prev = null;
  };

  var movement = function(position, property, operation) {
    if (operation == '+') position[property] += 1;
    if (operation == '-') position[property] -= 1;
    if (position[property] > 5) {
      position[property] = 0;
    }
    if (position[property] < 0) {
      position[property] = 5;
    }
  };

  this.east = new cardinalPoint('east', 'glyphicon-chevron-right',  function(position) { movement(position, 'x', '+'); });
  this.north = new cardinalPoint('north', 'glyphicon-chevron-up',   function(position) { movement(position, 'y', '+'); });
  this.west = new cardinalPoint('west', 'glyphicon-chevron-left',   function(position) { movement(position, 'x', '-'); });
  this.south = new cardinalPoint('south', 'glyphicon-chevron-down', function(position) { movement(position, 'y', '-'); });

  this.north.next = this.west;
  this.north.prev = this.east;
  this.west.next = this.south;
  this.west.prev = this.north;
  this.south.next = this.east;
  this.south.prev = this.west;
  this.east.next = this.north;
  this.east.prev = this.south;

  this.get = function() {
    return {
      east: this.east,
      north: this.north,
      west: this.west,
      south: this.south
    }
  };
};

var whilePressed = function ($parse, $interval) {
  return {
    restrict: 'A',
    scope: {
      whilePressed: '&'
    },
    link: function (scope, elem, attrs) {
      var TICK_LENGTH = 150;
      var action = scope.whilePressed;
      var intervalPromise = null;

      var bindWhilePressed = function() {
        elem.on('mousedown', beginAction);
      };
      var beginAction = function(e) {
        e.preventDefault();
        tickAction();
        intervalPromise = $interval(tickAction, TICK_LENGTH);
        bindEndAction();
      };
      bindWhilePressed();
      var bindEndAction = function() {
        elem.on('mouseup', endAction);
        elem.on('mouseleave', endAction);
      };
      var unbindEndAction = function() {
        elem.off('mouseup', endAction);
        elem.off('mouseleave', endAction);
      };
      var endAction = function() {
        $interval.cancel(intervalPromise);
        unbindEndAction();
      };
      var tickAction = function() {
        action(scope);
      };
    }
  };
};
whilePressed.$inject = ['$parse', '$interval'];

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
    rover.x = rover.mission.start.x;
    rover.y = rover.mission.start.y;
    rover.direction = rover.mission.start.direction;
    angular.forEach(rover.mission.steps, function(step) {
      home.control(rover, step);
    });
    rover.mission.deployed = true;
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
.directive('whilePressed', whilePressed)
.controller('HomeCtrl', HomeCtrl);
