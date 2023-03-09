const LoadData=async(SearchText,dataLimit) =>{
const url=`https://openapi.programming-hero.com/api/phones?search=${SearchText}`;
const res=await fetch(url);
const data=await res.json();
DisPlayData(data.data, dataLimit)
}
const DisPlayData=(phones,dataLimit)=>{
    const PhoneHunter=document.getElementById('phones-container');
    PhoneHunter.innerHTML="";
    // phone limited
    // showAll buton display section
    const ShowAll=document.getElementById('show-all');
    if(dataLimit && phones.length>9){
        phones=phones.slice(0,9)
        ShowAll.classList.remove('d-none')
    }else{
        ShowAll.classList.add('d-none')
    }
    
    // display no phone
    const NoFound=document.getElementById('no-found');
    if(phones.length==0){
        NoFound.classList.remove('d-none')   
    }
    else{
        NoFound.classList.add('d-none')
    }
    // disPlay all phone
    phones.forEach(phone => {
    const NewDiv=document.createElement('div');
    NewDiv.classList.add("col");
    NewDiv.innerHTML=`
    <div class="card p-4">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="LoadDataDetails('${phone.slug}')": class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PhoneDetailsModal">details</button>
        </div>
</div>
    `;
    PhoneHunter.appendChild(NewDiv)
});
SpinLoader(false)
}
// show all load data
document.getElementById('ShowAll-btn').addEventListener('click',function(){
prossesSection()
})

// search Prosses common section
const prossesSection=(dataLimit)=>{
    const SearchText=document.getElementById('Search-input').value;  
    LoadData(SearchText,dataLimit);
    SpinLoader(true)
}
// search section
document.getElementById('Search-button').addEventListener('click',function(){ 
    prossesSection(9)
})
// enter evant trigger
document.getElementById('Search-input').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {  
      prossesSection(9)
    }
  });
// spinner section
const Loader=document.getElementById('loader');
const SpinLoader=isLoading=>{
    if(isLoading){
    Loader.classList.remove('d-none')
    }
    else{
        Loader.classList.add('d-none')
    }
}

// detaile section
const LoadDataDetails=async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json(); 
    displayphonDetails(data.data)   
}

const displayphonDetails=phone=>{
    console.log(phone)
    const ModalTitle=document.getElementById('modal-title');
    ModalTitle.innerText=phone.name
    const ModalDetails=document.getElementById('modal-details');
    ModalDetails.innerHTML=`
    <h6>Realse Date:${phone.releaseDate ? phone.releaseDate: 'No releaseDate here'}</h6>
    <p>Memory:${phone.mainFeatures ? phone.mainFeatures.memory: 'no memory here'}</p>
    `;
   
}
LoadData('apple')
