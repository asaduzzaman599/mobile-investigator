// on clicked button load mobile data 
const loadMobilesData = async () => {
    //get input data
    const searchText = getInputData();

    if (searchText) {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        try {
            const res = await fetch(url);
            const resData = await res.json();
            processSearchResult(resData.data);
        } catch (e) {

        }
    } else {
        console.log("empty")

    }
}

const getInputData = () => {
    const inputField = document.getElementById("search-input");
    const inputValue = inputField.value;

    //clearinput field
    inputField.value = '';

    return inputValue;
}

const processSearchResult = (data) => {
    const phones = data;
    clearContainer();
    if (phones.length) {

        //pass only 20 result
        displaySearchResult(phones.slice(0, 20));

        const showMoreBtn = document.getElementById('show-more-btn');
        showMoreBtn.classList.remove('d-none');

        showMoreBtn.addEventListener('click', () => {
            showMoreBtn.classList.add('d-none');
            displaySearchResult(phones.slice(20, phones.length));
        });




    } else {

        console.log('else', phones)
    }

}

const displaySearchResult = (phones) => {

    const searchResultContainer = document.getElementById('search-result-container');

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="card text-center" h-100">
                <div class="card-body w-100">
                <img src="${phone.image}"  class="card-img-top w-50 py-3 mx-auto" alt="phone Image">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                </div>
                </div>
                <div>
                <button class="btn btn-color mb-3 w-25">Detail</button>
                </div>
              </div>
        `;

        searchResultContainer.appendChild(div);
    });
}

const clearContainer = () => {
    document.getElementById('search-result-container').textContent = '';
    // document.getElementById('show-more-btn').textContent ='';

};