describe('Home Pages', function() {

  beforeEach(module('app.homePages'));

  var HomeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should start at 1, 2, N', inject(function($controller, $rootScope) {
    rover1 = scope.rovers[0];

    expect(rover1.x).toBe(1);
    expect(rover1.y).toBe(2);
    expect(rover1.direction.name).toBe('north');
  }));

  it('should start at 3, 3, E', inject(function($controller, $rootScope) {
    rover2 = scope.rovers[1];

    expect(rover2.x).toBe(3);
    expect(rover2.y).toBe(3);
    expect(rover2.direction.name).toBe('east');
  }));

  it('should deploy to 1, 3, N', inject(function($controller, $rootScope) {
    rover1 = scope.rovers[0];

    expect(rover1.x).toBe(1);
    expect(rover1.y).toBe(2);
    expect(rover1.direction.name).toBe('north');

    scope.deploy(rover1);

    expect(rover1.x).toBe(1);
    expect(rover1.y).toBe(3);
    expect(rover1.direction.name).toBe('north');

  }));

  it('should deploy to 1, 3, N', inject(function($controller, $rootScope) {
    rover2 = scope.rovers[1];

    expect(rover2.x).toBe(3);
    expect(rover2.y).toBe(3);
    expect(rover2.direction.name).toBe('east');

    scope.deploy(rover2);

    expect(rover2.x).toBe(5);
    expect(rover2.y).toBe(1);
    expect(rover2.direction.name).toBe('east');

  }));
});
