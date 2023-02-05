//VARIABLES
let title= document.getElementById("title");
let API= `https://rickandmortyapi.com/api`
let characterBtn= document.getElementById("char");
let charName= document.getElementById("charName");
let charImage= document.getElementById("charImage");
let container= document.getElementById("container");
let btnNext= document.getElementById("btnNext");
let btnPrev= document.getElementById("btnPrev");
let searchText= document.getElementById("searchText");
let searchBtn= document.getElementById("searchButton");
let nextPage;
let prevPage;
let containerList;


//FETCH API
async function rickApi (urlAPI){
    let fetching= await fetch(urlAPI);
    let transform= await fetching.json();
    return transform
}

let gettinData=async (urlAPI, cat="/character/")=>{
  try{
    
    //SETTING URL
    let newUrl= `${urlAPI}${cat}`
    //FETCHIN DATA
    let getCategory= await rickApi(newUrl);
    //CHANGING HTML
    let charsHtml= `

    ${getCategory.results.map( data=> `
    
     <div class="card" id="idC">
     <figure>
       <img src="${data.image}" alt="character" id="charImage" class="img--large">
     </figure>
     <div class="card__text">
        <h2 id="charName" class="charTitle"> 
          ${data.name}
        </h2>
        <p class="color--green">
          Species: <span class="charType">${data.species}</span>
        </p>
        <p class="color--green">
          Type: ${data.type}
        </p>
        <p class="color--green">
          Origin: ${data.origin.name}
        </p>
      </div>
     </div>
      
    
    `).join("")}
    
    `
  prevPage= getCategory.info.prev;  
  nextPage= getCategory.info.next;  
  container.innerHTML=charsHtml;
  
  }catch(error){
    let errorHtml= `
    
    <div class="error--container">
      <h2 class="error--title">Error</h2>
      <p class="error--type">  ${error} </p>
      <figure class="error--img">
        <img src="https://thumbs.gfycat.com/NeighboringCaringBonobo-size_restricted.gif" alt="error" class="img--large">
      </figure>  
    </div>

    `
    container.innerHTML=errorHtml;
  }
}



//CALLING THE FUNCTIONS
gettinData(API)

//SEARCH FUNCTION
function search(){
  let text= searchText.value;
  if(text === ""){
    return "vacio"
  }else{
    gettinData(API, `/character/?name=${text}`);
  }

}

searchBtn.addEventListener("click",search)

//PAGINATION FUNCTION
function goNext(){
  if(nextPage === null){
    return null
  }else{ 
  gettinData(nextPage,"")
  }
}

btnNext.addEventListener("click",goNext)

function goPrev(){
  if(prevPage === null){
    return null
  }else{ 
  gettinData(prevPage,"")
  }
}

btnPrev.addEventListener("click",goPrev)
