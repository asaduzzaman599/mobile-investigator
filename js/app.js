// on clicked button load mobile data 
const loadMobilesData = async () => {
    //get input data
    const searchText = getInputData();

    //condition check input value is empty or not
    if (searchText) {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        try {
            const res = await fetch(url);
            const resData = await res.json();
            processSearchResult(resData.data);
        } catch (e) {

            alert('SomeThing is Wrong!!')
        }
    } else {
        //alert for empty input value
            alert('please insert brand name')

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

        //alert for empty input value
        alert('Sorry! Data not found')
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

//load and display phone detail info
const loadPhoneDetails = async (phoneId) =>{
    //load data with phone id
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    try {
        const res = await fetch(url);
        const resData = await res.json();
        console.log(resData.data);
        displayPhoneDetails(resData.data);
    } catch (e) {
        alert('SomeThing is Wrong!!')
    }
}

const displayPhoneDetails = (phoneInfo) =>{
    console.log('clicked')
    const phoneDetailContainer = document.getElementById('phone-detain-container');
    phoneDetailContainer.parentNode.classList.add('card')
    const {chipSet,displaySize,memory,sensors} = phoneInfo.mainFeatures;
    
    const {Bluetooth,GPS,NFC,Radio,USB,WLAN}= phoneInfo.others?phoneInfo.others:'';
    console.log('clicked');
    console.log(Bluetooth,GPS,NFC,Radio,USB,WLAN);
    console.log(Object.keys(phoneInfo))

    phoneDetailContainer.innerHTML=`
    <div class="col-md-4">
    <div class="text-center d-flex align-items-center mt-md-5 mb-2">
    
    <img src="${phoneInfo.image}" class="mx-auto  img-fluid rounded-start" alt="phone Info image">
    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${phoneInfo.name}</h5>
                      
                      <p class="card-text"><span class="fw-bold">Release Date :</span> <br>${phoneInfo.releaseDate?phoneInfo.releaseDate:'No release date found'}</p>
                      <p><span class="fw-bold">Brand : </span><br>${phoneInfo.brand}</p>
                      
                      
                      <p class="text-center fw-bold">Main Features</p>
                      <p class="card-text"><span class="fw-bold">chipSet :</span> <br>${chipSet}</p>
                      
                      <p class="card-text"><span class="fw-bold">Display Size :</span> <br>${displaySize}</p>
                      
                      <p class="card-text"><span class="fw-bold">Memory :</span> <br>${memory}</p>
                      
                      <p class="card-text"><span class="fw-bold">Sensors :</span> <br>${sensors.join(', ')}</p>
                      
                      <p class="text-center fw-bold">Others</p>

                      <p class="card-text"><span class="fw-bold">Bluetooth :</span> ${Bluetooth?Bluetooth:"No Data"}</p>
                      
                      <p class="card-text"><span class="fw-bold">GPS :</span> ${GPS?GPS:"No Data"}</p>
                      
                      <p class="card-text"><span class="fw-bold">NFC :</span> ${NFC?NFC:"No Data"}</p>
                      
                      <p class="card-text"><span class="fw-bold">Radio :</span> ${Radio?Radio:"No Data"}</p>
                      
                      <p class="card-text"><span class="fw-bold">USB :</span> ${USB?USB:"No Data"}</p>
                      
                      <p class="card-text"><span class="fw-bold">WLAN :</span> ${WLAN?WLAN:"No Data"}</p>
                      
                    </div>
                  </div>
    `
}

const clearContainer = () => {
    document.getElementById('search-result-container').textContent = '';
    document.getElementById('show-more-btn').classList.add('d-none');
    
    const phoneDetailContainer = document.getElementById('phone-detain-container');
    phoneDetailContainer.parentNode.classList.remove('card');
    phoneDetailContainer.textContent = '';

    // document.getElementById('show-more-btn').textContent ='';

};