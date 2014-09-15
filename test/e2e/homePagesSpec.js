describe('Home Pages', function() {

  var ptor = protractor.getInstance();

  it('should start at 1, 2, N', function() {
    ptor.get('/#');
    expect(ptor.findElement(protractor.By.id('c1-2')).getText()).toBe('Sojourner');
  });

  it('should start at 3, 3, E', function() {
    ptor.get('/#');
    expect(ptor.findElement(protractor.By.id('c3-3')).getText()).toBe('Curiosity');
  });

  it('should deploy to 1, 3, N', function() {
    ptor.get('/#');
    element(by.id('Sojourner')).click();
    expect(ptor.findElement(protractor.By.id('c1-3')).getText()).toBe('Sojourner');
  });

  it('should deploy to 5, 1, E', function() {
    ptor.get('/#');
    element(by.id('Curiosity')).click();
    expect(ptor.findElement(protractor.By.id('c5-1')).getText()).toBe('Curiosity');
  });

});
