const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = '...loading'
    message2.textContent = ''
    const location = search.value

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent = data.location + ". This wind is " + data.wind + "mph"
                message2.textContent =  data.forecast
            }
            
        })
    })
    
})