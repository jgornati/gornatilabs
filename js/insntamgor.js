var feed = new Instafeed({
  clientId: 'dccba54cc47347a8866de64e1bd60fd1',
  target: 'instafeed',
  get: 'user',
  userId: 227005388,
  accessToken: '227005388.467ede5.c510de6187524c89abdcc2f0cd25359e',
  limit: 20,
  sortBy: 'none',
  after: function () {
    var images = $("#instafeed").find('a');
    $.each(images, function(index, image) {
      var delay = (index * 75) + 'ms';
      $(image).css('-webkit-animation-delay', delay);
      $(image).css('-moz-animation-delay', delay);
      $(image).css('-ms-animation-delay', delay);
      $(image).css('-o-animation-delay', delay);
      $(image).css('animation-delay', delay);
      $(image).addClass('animated flipInX');
    });
  },
  template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes">&hearts; {{likes}}</div></a>'
});
feed.run();
