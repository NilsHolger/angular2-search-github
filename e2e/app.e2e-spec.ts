import { Angular2SearchGithubPage } from './app.po';

describe('angular2-search-github App', function() {
  let page: Angular2SearchGithubPage;

  beforeEach(() => {
    page = new Angular2SearchGithubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
