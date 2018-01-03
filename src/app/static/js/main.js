'use strict';

console.log('Welcome to the Alto Docs!'); // eslint-disable-line no-console


// toggle navlinks
$('[data-toggle="navlinks"]').click(function() {
  $('#navbar').toggleClass('show-navlinks');
});
