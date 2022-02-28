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

const processSearchResult = (phones) => {
    console.log(phones);
    clearContainer();
    if (phones.length) {

        //pass only 20 result
        displaySearchResult(phones.slice(0, 20));


       if(phones.length>20){
        const showMoreBtn = document.getElementById('show-more-btn');
        showMoreBtn.classList.remove('d-none');
        showMoreBtn.addEventListener('click', () => {
            showMoreBtn.classList.add('d-none');
            console.log(phones)
            displaySearchResult(phones.slice(20, phones.length));
        });
       }




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
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-color mb-3 w-25">Details</button>
                </div>
              </div>
        `;

        searchResultContainer.appendChild(div);
    });
}

const loadPhoneDetails = async (phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    try {
        const res = await fetch(url);
        const resData = await res.json();
        console.log(resData.data);
        displayPhoneDetails(resData.data);
    } catch (e) {

    }
}

const displayPhoneDetails = (phoneInfo) =>{
    const phoneDetailContainer = document.getElementById('phone-detain-container');
    phoneDetailContainer.parentNode.classList.add('card')
    const {chipSet,displaySize,memory,sensors} = phoneInfo.mainFeatures;
    console.log(chipSet,displaySize,memory,sensors)
    phoneDetailContainer.innerHTML=`
    <div class="col-md-4">
    <div class="text-center d-flex align-items-center m-md-5">
    
    <img src="${phoneInfo.image}" class="mx-auto  img-fluid rounded-start" alt="phone Info image">
    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${phoneInfo.name}</h5>
                      
                      <p class="card-text"><span class="fw-bold">Release Date :</span> <br>${phoneInfo.releaseDate?phoneInfo.releaseDate:'No release date found'}</p>
                      <p><span class="fw-bold">Brand : </span><br>${phoneInfo.brand}</p>
                      
                      
                      <p class="card-text"><span class="fw-bold">chipSet :</span> <br>${chipSet}</p>
                      
                      <p class="card-text"><span class="fw-bold">Display Size :</span> <br>${displaySize}</p>
                      
                      <p class="card-text"><span class="fw-bold">Memory :</span> <br>${memory}</p>
                      
                      <p class="card-text"><span class="fw-bold">Sensors :</span> <br>${sensors.join(', ')}</p>
                      <p class="card-text"></p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
    `
}

const clearContainer = () => {
    document.getElementById('search-result-container').textContent = '';
    document.getElementById('show-more-btn').classList.add('d-none');
    // document.getElementById('show-more-btn').textContent ='';

};