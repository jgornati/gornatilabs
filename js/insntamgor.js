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
    resolution: 'standard_resolution',
    template: '<div class="folio-item isotope-item web packaging"><a href="{{link}}" target="_blank" class="prettyPhoto"><div class="folio-thumb"><img src="{{image}}" class="img-responsive" alt="" /></div></a><div class="folio-overlay"><h4><a href="#" class="fa fa-comment-o"> {{comments}}</a></h4></div><i class="fa fa-heart-o" style="font-size: 14px;"> {{likes}}</i></div>',
    after: function() {
      if (!this.hasNext()) {
        loadButton.setAttribute('disabled', 'disabled');
      }
    }
  });

  $('#btnMas').on('click', function(){
    feed.next();
  });

  feed.run();
});
