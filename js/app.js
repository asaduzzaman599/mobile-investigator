// on clicked button load mobile data 
const loadMobilesData = async () =>{
    //get input data
    const searchText = getInputData();

    if(searchText){
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

        }catch(e){

        }
        console.log(inputValue)

    }else{
        console.log("empty")

    }
}

const getInputData= () =>{
    const inputField = document.getElementById("search-input");
    const inputValue = inputField.value;
    
    //clearinput field
    inputField.value = '';

    return inputValue;
}