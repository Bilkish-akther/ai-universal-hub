
let post = [];
let isSeeMore = true;
document.getElementById('tools-container').innerHTML = `
<div class="d-flex justify-content-center w-300" id='spinner'>
  <div class="spinner-border"style="width: 5rem; height: 5rem;" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>

`;
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    setTimeout(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            post = data.data;
            document.getElementById("spinner").remove();
            displayTools(post.tools.slice(0, 6));
           
        });
    }, 1000);

}


const displayTools = tools => {
    const toolsContainer = document.getElementById('tools-container');
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');

        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
          <div class="card" id="card-main">
          <img src="${tool.image}" class="card-img-top" alt="...">
          <div class="card-body">
          
          <h3>Features </h3>


          <div>
    
        <ol>

       ${tool.features['1'] ?` <li>${tool.features['1']} </li>`:''}
       ${tool.features['2'] ?` <li>${tool.features['2']} </li>`:''}
       ${tool.features['3'] ?` <li>${tool.features['3']} </li>`:''}

        
        </ol>
        </div>
         
           
  
  
            <div class="card-footer bg-body d-flex justify-content-between">
            <div>
            <p class="m-0 p-0 fw-bold">${tool.name ? tool.name : "Not available"}</p>
            <p class="m-0 p-0">${tool.published_in}</p>
            </div>
            <div">
    
            <i class="fa-solid fa-arrow-right btn btn-primary "  onclick="showToolsDetail('${tool.id}')" data-bs-toggle="modal" 
            data-bs-target="#exampleModal"></i>
            </div>
             </div>
              <div>
              <div>
           <div>
          </div>
        </div>
          `;
        toolsContainer.appendChild(toolDiv);

    });
}

// start modal section and single section start
const showToolsDetail = id => {

    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayToolDetails(data.data));

        
}


const displayToolDetails = tool => {
    
    console.log(tool.pricing);
    const toolPrice = document.getElementById('modal-body');

    toolPrice.innerHTML = `
  
   
  
    <div class="card mb-3">
  
          <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="modal-first-div card-body">
    <div>
    <h5 class="card-title">${tool.description}</h5>
  </div>

  ${tool.pricing? `
  <div class="d-flex gap-2 justify-content-around my-2">
  <div class="border p-3 text-center rounded btn btn-light text-success shadow-lg ">
  <span>${tool.pricing ? tool.pricing[0].price : "No Data Found"}</span> <br> <span>${tool.pricing[0].plan}</span> </div>
  <div class="border p-3 text-center rounded btn btn-light text-danger shadow-lg text-danger">
  <span>${tool.pricing ? tool.pricing[1].price : "No Data Found"}</span> <br> <span>${tool.pricing[1].plan}</span></div>
  <div class="border p-3 text-center rounded btn btn-light text-primary shadow-lg"> 
  <span>${tool.pricing ? tool.pricing[2].price : "No Data Found"}</span> <br> <span>${tool.pricing[2].plan}</span></div>
  </div> `:
  `<div class="d-flex gap-2 justify-content-around my-2">
  <div class="border p-3 text-center rounded btn btn-light text-success shadow-lg ">
  <span>Free of Cost</span> </div>
  <div class="border p-3 text-center rounded btn btn-light text-danger shadow-lg text-danger">
  <span>Free of Cost</span></div>
  <div class="border p-3 text-center rounded btn btn-light text-primary shadow-lg"> 
  <span>Free of Cost</div>
  </div>`
}
  
  
  <div class="d-flex justify-content-between my-2">
  <div>
  <h5>Features</h5>
  <ul>
    <li>${tool.features['1'] ? tool.features['1'].feature_name : 'Not Found'}</li>
    <li>${tool.features['2'] ? tool.features['2'].feature_name : 'Not Found'}</li>
    <li>${tool.features['3'] ? tool.features['3'].feature_name : 'Not Found'}</li>
  </ul>
  </div>
  <div>
  
  
  <h5>Integrations</h5>
  ${tool.integrations? `
  <ul>
  ${tool.integrations[0] ?`<li> ${tool.integrations[0]}</li>`:""}
  ${tool.integrations[1] ?`<li> ${tool.integrations[1]}</li>`:""}
  ${tool.integrations[2] ?`<li> ${tool.integrations[2]}</li>`:""}
  </ul>
  `:'<p  class="no-data">No Data Found</p>'}
  </div>
  </div>
  </div>
  </div>
  </div>
  
  
  <div class="col-sm-6">
  <div class="card">
  <div class="card-body">
  
  
  <div>
  ${tool.accuracy.score? `<span class="  btn btn-danger  position-absolute top-0 end-0 ">${tool.accuracy.score*100}<span>%</span>  Accuracy </span> `:''}
  
  <img src=${tool.image_link[0]} class="card-img-top"  alt="...">
 </div>
  <div class="card-body text-center">
    <h5 class="card-title">${tool.input_output_examples?.[0]?.input ?? "Can you give any example."}</h5>
    <p class="card-text">${tool.input_output_examples?.[0]?.output ?? "No! Not Yet! Take a break!!!"}</p>
  </div>
  </div>
  
  </div>
  </div>
  </div>
  
  </div>
    `

}

// start modal section and single section end

// sort by button start

document.getElementById("sort_by_btn").addEventListener('click', function () {
    console.log("click");
    document.getElementById("tools-container").remove();
  
    const div = document.createElement('div')
    document.getElementById("section-main").appendChild(div);


    div.setAttribute("id", "tools-container");
    div.setAttribute("class", "row row-cols-1 row-cols-md-3 g-4");
    if (!isSeeMore) {
        post.tools.sort(function (a, b) {
            let dateA = new Date(a.published_in).getTime();
            let dateB = new Date(b.published_in).getTime();
            console.log(dateA);
            return dateA > dateB ? -1 : 1;
        });
        displayTools(post.tools);
    }
    else {
        var newArray = post.tools.slice(0, 6);
        newArray.sort(function (a, b) {
            let dateA = new Date(a.published_in).getTime();
            let dateB = new Date(b.published_in).getTime();
            console.log(dateA);
            return dateA > dateB ? -1 : 1;
        });
        displayTools(newArray);
    }

});
//  sort by button end


// see more button start
document.getElementById("see_more_btn").addEventListener('click', function () {
    if (isSeeMore) {
        isSeeMore = false;
        displayTools(post.tools.slice(6, 12));
        document.getElementById("see_more_btn").remove();
    }
});

// see more button end


loadData();












