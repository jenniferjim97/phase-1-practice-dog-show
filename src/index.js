document.addEventListener('DOMContentLoaded', () => {
  fetchAllDogs();
})


function fetchAllDogs(){
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogsData => dogsData.forEach(dog => dogTable(dog)))
}

function dogTable(dog){
const table = document.querySelector('#table-body')
const dogInfo = document.createElement('tr');
const dogName = document.createElement('td');
const dogBreed = document.createElement('td');
const dogSex = document.createElement('td');
const dogEditBtn = document.createElement('button');

dogName.textContent = `${dog.name}`
dogBreed.textContent = `${dog.breed}`
dogSex.textContent = `${dog.sex}`
dogEditBtn.innerText = 'Edit Dog'

dogName.id = 'nameTag';
dogBreed.id = 'breedTag';
dogSex.id = 'sexTag';
dogEditBtn.id = 'editBtnTag';


dogInfo.append(dogName, dogBreed, dogSex, dogEditBtn);
table.append(dogInfo);

dogEditBtn.addEventListener('click', () =>{
  updateDogInfo(dog)
})

}


function updateDogInfo(dog){
    const form = document.querySelector('#dog-form');
    const inputs = form.getElementsByTagName("input");
  
    inputs[0].value = dog.name
    inputs[1].value = dog.breed
    inputs[2].value = dog.sex
    const updateId = dog.id
  

  form.addEventListener("submit", (e) =>{
    e.preventDefault();

    fetch(`http://localhost:3000/dogs/${updateId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: inputs[0].value,
        breed: inputs[1].value,
        sex: inputs[2].value,
      })
  })
  .then(response => response.json())
  .then(data => console.log(data))


  removeOldInfo();
  fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(data => data.forEach(dogTable)
  )
  form.reset()
  })

}

function removeOldInfo() {
  const table = document.getElementById('table-body');
  while(table.firstChild) {
    table.removeChild(table.firstChild)
}}