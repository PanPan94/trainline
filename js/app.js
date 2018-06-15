let activeElement
function popular() {
    fetch('http://www-uat.tictactrip.eu/api/cities/popular/10')
    .then(res => res.json())
    .then((out) => {
        out.forEach(el => {
            let li = document.createElement('li')
            let a = document.createElement('a')
            li.appendChild(a)
            li.classList.add('location-list')
            a.innerText = el.local_name.split(',')[0]
            if(document.querySelectorAll('#results-list li').length < 5) {
                document.querySelector('#results-list').appendChild(li)
            }
        })
    }).catch(err => console.error(err));
}

document.querySelectorAll('.form_input').forEach(e => {
    e.addEventListener('focus', () => {
        activeElement = e
    })
    let request = new XMLHttpRequest()
    console.log(e.value == '')

    
    if(e.value == '') {
        popular()
    }
    
    e.addEventListener('keypress', changeEvt => {
            request.open('GET', 'http://www-uat.tictactrip.eu/api/cities/autocomplete/?q=' +  e.value , true)
            request.onload = () => {
                if(e.value !== '') {
                    if(request.status >= 200 && request.status < 400) {
                        let data = JSON.parse(request.responseText)
                        let options = data.reduce(function(acc, option) {
                            document.querySelector('#results-list').innerHTML = ''
                            data.forEach(el => {
                                let li = document.createElement('li')
                                let a = document.createElement('a')
                                li.appendChild(a)
                                li.classList.add('location-list')
                                a.innerText = el.local_name.split(',')[0]
                                document.querySelector('#results-list').appendChild(li)
                            })
                            
                        }, '')
                    }else {
                        alert('Access Denied')
                    }
                } else {
                    popular()                    
                }
            }
            
        
            // request.onerror = function() {
            //     alert('WHY')
            // }
            request.send()
    })
})
setTimeout(() => {
    document.querySelectorAll('.location-list').forEach((e) => {
        e.addEventListener('click', el => {
            activeElement.value = e.querySelector('a').innerText 
        })
    })
}, 1500)

document.querySelector('#search').addEventListener('click', () => {
    window.location.href = 'https://www.trainline.eu/search/' + document.querySelector('#form_input_from').value.toLowerCase() + '/' + document.querySelector('#form_input_to').value.toLowerCase() + '/'
    
})