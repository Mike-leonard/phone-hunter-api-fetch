
// variable
const parentContainer = document.getElementById('parent-container')
const searchField = document.getElementById('search-field')
const btnSearch = document.getElementById('btn-search')

// notify element
const notifyMessage = document.getElementById('notify-message')
const spinnerRun = document.getElementById('spinner-run')
const seeAll = document.getElementById('see-all')
const btnSeeAll = document.getElementById('btn-see-all')

// Phone loader function
const loadPhones = async (searchText, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displayPhone(data.data, dataLimit)
}

// display Loaded phones
const displayPhone = (phones, dataLimit) => {
    parentContainer.innerHTML = ''
    if(phones.length === 0) {
        notifyMessage.classList.remove('hidden')
    } else {
        notifyMessage.classList.add('hidden')
    }

    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9)
        seeAll.classList.remove('hidden')
    } else {
        seeAll.classList.add('hidden')
    }
    phones.forEach(element => {
        const {brand, phone_name, image, slug } = element
        const phnDiv = document.createElement('div')
        phnDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'border-4', 'border-blue-200')
        phnDiv.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p>${phone_name}</p>
                <div class="card-actions">
                    <label for="my-modal-6" class="btn btn-primary" onclick="modalPhnInfo('${slug}')">Show Details</label>
                </div>
            </div>
        `
        parentContainer.appendChild(phnDiv)
    })
    spinnerRun.classList.add('hidden')
}

// showing modal with phn info
const modalPhnInfo = async slug => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    const data = await res.json()
    const {name, releaseDate, mainFeatures} = data.data
    const phnName = document.getElementById('modal-phn-name')
    phnName.innerText = name
    const moreInfo = document.getElementById('more-info')
    moreInfo.innerHTML = `
        <p>${releaseDate ? releaseDate : 'No Release Date Found'}</p>
        <p>ChipSet: ${mainFeatures.chipSet}</p>
        <p>displaySize: ${mainFeatures.displaySize}</p>
        <p>${name} have ${mainFeatures.sensors.length} sensors</p>
    `
}

// search button handle
btnSearch.addEventListener('click', function () {
    passInputField(9)
})

// Enter button listener
searchField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') 
        passInputField(9)

})

// pass search field text
const passInputField = (dataLimit) => {
    const searchText = searchField.value
    spinnerRun.classList.remove('hidden')
    loadPhones(searchText, dataLimit)
}

// btn see all listener
btnSeeAll.addEventListener('click', function() {
    passInputField()
})
loadPhones('iphone')