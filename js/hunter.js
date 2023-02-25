
// variable
const parentContainer = document.getElementById('parent-container')
const searchField = document.getElementById('search-field')
const btnSearch = document.getElementById('btn-search')

// Phone loader function
const loadPhones = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displayPhone(data.data)
}

// display Loaded phones
const displayPhone = phones => {
    parentContainer.innerHTML = ''
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

btnSearch.addEventListener('click', function () {
    const searchText = searchField.value
    loadPhones(searchText)
    console.log(searchText)
})
loadPhones('iphone')