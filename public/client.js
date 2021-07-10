console.log('Client-side code running');

const button = document.getElementById('myButton');
const blue = document.getElementById('blue');
const green = document.getElementById('green');
const chaser = document.getElementById('chaser');


button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log('Click was recorded');
            return;
        }
        throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
});

green.addEventListener('click', function(e) {
    console.log('button was clicked');
  
    fetch('/green', {method: 'POST'})
      .then(function(response) {
          if (response.ok) {
              console.log('Click was recorded');
              return;
          }
          throw new Error('Request failed.');
      })
      .catch(function(error) {
          console.log(error);
      });
  });

blue.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/blue', {method: 'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log('Click was recorded');
            return;
        }
        throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
});

chaser.addEventListener('click', function(e) {
    console.log('chaser started');

    fetch('/chaser', {method: 'POST'})
    .then(function(response) {
        if (response.ok) {
            console.log('Click was recorded');
            return;
        }
        throw new Error('Request failed.');
    })
    .catch(function(error) {
        console.log(error);
    });
})