var counter=0;
var prevCounter=0;
function appendRowToTable(rowData) {
    const table = document.getElementById("table");
    const tbody = table.querySelector('tbody');
    const newRow = tbody.insertRow();
    newRow.classList.add("text-center");
    for (const key in rowData) {
      const cell = newRow.insertCell();
      console.log(key);
      if(key==="Column 1" ){
        if(rowData[key]==='TRUE'){
          cell.classList.add("bg-success", "text-white");
          cell.textContent="Present"
        }else{
          cell.classList.add("bg-danger", "text-white");
          cell.textContent="Absent";
        }
        continue;
      }
      
      cell.textContent = rowData[key];
    }
}
//http://localhost:3000/sheets-data

function getSheetData() {
  const url = 'https://attendance-data-k6dbgo73q-aloks-projects-e40f494c.vercel.app/sheets-data';
  const request = new Request(url, {
    method: 'GET',
    headers: {
      'Origin': 'local' // Replace with your domain
    }
  });
    const response = fetch(request)
                        .then((response) => response.json())
                        .then((data)=>{
                            prevCounter=counter;
                            counter=data.length;
                            for(let row=0;row<=counter;row++){
                              appendRowToTable(data[row]);
                            }

                        });
  }

var intervalId=setInterval(getSheetData,5000);


const stopBtn = document.getElementById('stopButton');
const loadBtn = document.getElementById('loadButton');

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
});

loadBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId=setInterval(getSheetData,5000);
});
