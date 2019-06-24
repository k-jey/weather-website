console.log('Javascript File Loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('/weather?address=boston').then((response) => {
//     response.json().then((weatherData) => {
//         //console.log(weatherData.forecast)
//         if (weatherData.error){
//             console.log(weatherData.error)
//         } else{
//             console.log(weatherData)
//         }
//     })
// })

const weaterForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weaterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgOne.textContent = 'Loading Msg....'
    msgTwo.textContent = ''


    const location = search.value

    fetch('/weather?address=' +location).then((response) => {
        response.json().then((weatherData) => {
            if (weatherData.error){
                msgOne.textContent = weatherData.error
            } else{
                msgOne.textContent = weatherData.location
                msgTwo.textContent = weatherData.forecast
            }
        })
    })
})