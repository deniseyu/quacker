beforeEach(function() {
      return browser.ignoreSynchronization = true;
    });

describe('Quacker home page', function(){
  it('should contain a header', function(){
    browser.get('http://localhost:8080');
    expect(element(by.binding('page-header')).getText()).toBe('Quacker');
  });
});