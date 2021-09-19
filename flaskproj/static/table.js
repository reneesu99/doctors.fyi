// var input, filter, table, entry, a, i, txtValue;

  // function myFunction() {
  //   // console.log("TEST");
  //   input = document.getElementById('myInput');
  //   filter = input.value.toUpperCase();
  //   table = document.getElementById("fridge");
  //   entry = document.getElementsByTagName('tr');
  
  //   // Loop through all list items, and hide those who don't match the search query
  //   for (i = 0; i < entry.length; i++) {
  //     if (i != 0){
  //       a = entry[i];
  //       // console.log(a) 
  //       txtValue = a.textContent || a.innerText;
  //       if (txtValue.toUpperCase().indexOf(filter) == -1) {
  //          entry[i].style.display = "";
  //        } else {
  //         entry[i].style.display = "none";
  //       }
  //     }
    
  //   }
  // }

  // function store_item() {
    
  // }

async function uploadFile() {
    let formData = new FormData();           
    formData.append("file", fileupload.files[0]);
    await fetch('/upload.php', {
      method: "POST", 
      body: formData
    });    
    alert('The file has been uploaded successfully.');
}