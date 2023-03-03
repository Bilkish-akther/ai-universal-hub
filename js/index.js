const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  displayTools(data.data);
}


const displayTools = tools => {
  const toolsContainer = document.getElementById('tools-container');
  tools.tools.forEach(tool => {
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col');
    toolDiv.innerHTML = `
        <div class="card">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
        
        
        <h3>Features </h3>
        <div>
    
        <ul>

          <li>${tool.features['1']  ? tool.features['1'] : 'Data not found' }</li>
          <li>${tool.features['2'] ? tool.features['2'] : 'Data not found'   }</li>
          <li>${tool.features['3'] ? tool.features['3'] : 'Data not found'}</li>

        
        </ul>
        </div>
       
         


          <div class="card-footer bg-body d-flex justify-content-between">
          <div>
          <p class="m-0 p-0 fw-bold">${tool.name ? tool.name : "Not available"}</p>
          <p class="m-0 p-0">${tool.published_in}</p>
          </div>
          <div">
          <i class="fa-solid fa-arrow-right" onclick="showToolsDetail('${tool.id}')" data-bs-toggle="modal" 
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


const showToolsDetail = id => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayToolDetails(data.data));
}



const displayToolDetails = tool => {
  console.log(tool);
  const toolPrice = document.getElementById('modal-body');

  toolPrice.innerHTML = `

 

  <div class="card mb-3">

        <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body bg-light">
  <div>
  <h5 class="card-title">${tool.description}</h5>
</div>
  
<div class="d-flex gap-2 justify-content-around my-2">
<div class="border p-3 text-center rounded btn btn-success text-light shadow-lg ">
<span>${tool.pricing ? tool.pricing[0].price : "No Data Found"}</span> <br> <span>${tool.pricing[0].plan}</span> </div>
<div class="border p-3 text-center rounded btn btn-warning text-light shadow-lg text-danger">
<span>${(tool.pricing) ? tool.pricing[1].price : "No Data Found"}</span> <br> <span>${tool.pricing[1].plan}</span></div>
<div class="border p-3 text-center rounded btn btn-danger text-light shadow-lg"> 
<span>${tool.pricing ? tool.pricing[2].price : "No Data Found"}</span> <br> <span>${tool.pricing[2].plan}</span></div>
</div> 


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
<ul>
  <li>${tool.integrations[0] ? tool.integrations[0] : 'Not Found'}</li>
  <li>${tool.integrations[1] ? tool.integrations[1] : 'Not Found'}</li>
  <li>${tool.integrations[2] ? tool.integrations[2] : 'Not Found'}</li>
</ul>
</div>
</div>
</div>
</div>
</div>


<div class="col-sm-6">
<div class="card">
<div class="card-body">


<span class=" position-absolute top-0 end-0 text-bg-success w-15 h-10 ">${tool.accuracy.score }<span> % </span>Accuracy</span>
<img   src=${tool.image_link[0]} class="card-img-top w-full h-full"  alt="...">
</div>

<div class="card-body text-center">
  <h5 class="card-title ">${tool.input_output_examples?.[0]?.input ?? "No input/output examples available."}</h5>
  <p class="card-text">${tool.input_output_examples?.[0]?.output ?? "no Data available."}</p>
</div>
</div>

</div>
</div>
</div>

</div>
  `

}





loadData();









