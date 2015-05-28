$(function() {
  var loadButton = document.getElementById('btnMas');
  var feed = new Instafeed({
    clientId: 'dccba54cc47347a8866de64e1bd60fd1',
    target: 'instafeed',
    get: 'user',
    userId: 227005388,
    accessToken: '227005388.467ede5.c510de6187524c89abdcc2f0cd25359e',
    limit: 10,
    sortBy: 'none',
    template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes">&hearts; {{likes}}</div></a>',
    after: function() {
      if (!this.hasNext()) {
        loadButton.setAttribute('disabled', 'disabled');
      }
    }
  });

  $('#btnMas').on('click', function() {
    feed.next();
  });

  feed.run();
});
