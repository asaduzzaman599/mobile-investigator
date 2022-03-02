//declear variable for store search result
let searchResult;

// on clicked button load mobile data 
const loadPhonesData = () => {
    //get input data
    const searchText = getInputData();

    //condition check input value is empty or not
    if (searchText) {
        //display spinner
        toggleSpinner('block');
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        //passing url and funciton
        loadData(url, processSearchResult);

    } else {
        //alert for empty input value
        alert('please insert phone name');

    }
}

//load and display phone detail info
const loadPhoneDetails = (phoneId) => {
    //load data with phone id
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    toggleSpinner('block');

    //passing url and funciton
    loadData(url, displayPhoneDetails);
}

//common function for load data
const loadData = async (url, operationWithResData) => {
    // try catch use for track is code execute and data fetch properly
    try {
        
        const res = await fetch(url);
        const resData = await res.json();
        //call back function to sent data desired fuction
        operationWithResData(resData.data);
    } catch (e) {

        //hide spinner
        toggleSpinner('none');
        clearContainer();
        alert('Something is Wrong! Please check your internet connection.');
    }
}

//collect input data from ui then return value
const getInputData = () => {
    const inputField = document.getElementById("search-input");
    const inputValue = inputField.value;

    //clear input field
    inputField.value = '';

    return inputValue;
}


const processSearchResult = (phones) => {
    //store the search result
    searchResult = phones;

    //reset 
    clearContainer();
    //hide spinner
    toggleSpinner('none');

    //condition check for empty data
    if (phones.length) {

        //pass only 20 result for display
        displaySearchResult(phones.slice(0, 20));

        //display 'show more' button only result for more then 20 
        if (phones.length > 20) {
            const showMoreBtn = document.getElementById('show-more-btn');
            showMoreBtn.classList.remove('d-none');

            //event handle for show more button
            showMoreBtn.addEventListener('click', () => {
                //pass the remainning data and hide the show more button
                showMoreBtn.classList.add('d-none');
                displaySearchResult(searchResult.slice(20, searchResult.length));
            });
        }
    } else {
        //alert for empty input value
        document.getElementById('alert-content').classList.remove('d-none');
    }
}

//display all phone results with card
const displaySearchResult = (phones) => {

    const searchResultContainer = document.getElementById('search-result-container');

    //traverse  one by one element and display in ui
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
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-color mb-3 w-25">Details</button>
                </div>
              </div>
        `;

        //card appending in ui
        searchResultContainer.appendChild(div);
    });
}

//display phone detail info
const displayPhoneDetails = (phoneInfo) => {
    //hide spinner
    toggleSpinner('none');

    const phoneDetailContainer = document.getElementById('phone-detain-container');
    //add card class to parent elemtn
    phoneDetailContainer.parentNode.classList.add('card');
    
    //distructuring mainfeatures object
    const {
        chipSet,
        displaySize,
        memory,
        sensors
    } = phoneInfo.mainFeatures;

    //distructuring mainfeatures object if data found  
    const {
        Bluetooth,
        GPS,
        NFC,
        Radio,
        USB,
        WLAN
    } = phoneInfo.others ? phoneInfo.others : '';

    //set data in ui card
    phoneDetailContainer.innerHTML = `
    <div class="col-md-4">
    <div class="text-center mt-md-5 mb-2">
    
    <img src="${phoneInfo.image}" class="img-fluid rounded-start" alt="phone Info image">
    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title text-md-start text-center mb-3">${phoneInfo.name}</h5>

                      <p class="card-text"><span class="fw-bold">Release Date :</span> <br>${phoneInfo.releaseDate?phoneInfo.releaseDate:'No release date found'}</p>
                      <p><span class="fw-bold">Brand : </span><br>${phoneInfo.brand}</p>

                      <p class="text-center fw-bold">Main Features</p>
                      <p class="card-text"><span class="fw-bold">Chip Set :</span> <br>${chipSet?chipSet:'No data found'}</p>
                      <p class="card-text"><span class="fw-bold">Display Size :</span> <br>${displaySize?displaySize:'No data found'}</p>
                      <p class="card-text"><span class="fw-bold">Memory :</span> <br>${memory?memory:'No data found'}</p>
                      <p class="card-text"><span class="fw-bold">Sensors :</span> <br>${sensors.join(', ')}</p>
                      
                      <p class="text-center fw-bold">Others</p>
                      <p class="card-text"><span class="fw-bold">Bluetooth :</span> ${Bluetooth?Bluetooth:"No data found"}</p>                      
                      <p class="card-text"><span class="fw-bold">GPS :</span> ${GPS?GPS:"No data found"}</p>                      
                      <p class="card-text"><span class="fw-bold">NFC :</span> ${NFC?NFC:"No data found"}</p>                      
                      <p class="card-text"><span class="fw-bold">Radio :</span> ${Radio?Radio:"No data found"}</p>                      
                      <p class="card-text"><span class="fw-bold">USB :</span> ${USB?USB:"No data found"}</p>                      
                      <p class="card-text"><span class="fw-bold">WLAN :</span> ${WLAN?WLAN:"No data found"}</p>
                      
                    </div>
                  </div>
    `;
}

//reset all
const clearContainer = () => {
    //clear search result container
    document.getElementById('search-result-container').textContent = '';
    //hide show more button
    document.getElementById('show-more-btn').classList.add('d-none');

    //clear detail info container and remove class from parent element
    const phoneDetailContainer = document.getElementById('phone-detain-container');
    phoneDetailContainer.parentNode.classList.remove('card');
    phoneDetailContainer.textContent = '';

    //hide alert
    document.getElementById('alert-content').classList.add('d-none');

};

//spinner toggle function
const toggleSpinner = (dispayStyle) => {
    document.getElementById('spinner').style.display = dispayStyle;
}