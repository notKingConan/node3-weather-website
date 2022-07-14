const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const location = searchEl.value;

    messageOne.textContent = 'loading...';
    messageTwo.textContent = null;
   
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => {
        res.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = null;
                messageTwo.textContent = data.summary;
            }
        })
    });

    searchEl.value = '';

})