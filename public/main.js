
document.querySelector('form').addEventListener('submit', nasa)
// document.getElementsByClassName('fa-space-shuttle')[0].addEventListener('click', rocket_to_final_frontier)


function nasa(e){

  let image = "";

  e.preventDefault()
  let date = document.querySelector('input').value
  fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=ZvdzSG4gDQNj1iFJkCkhZXiyOc6qZ1fshtdW7IUF`)
    .then(res => res.json())
  // parse response as JSON (can be res.text() for plain response)
    .then(response => {
        console.log(response)
        if(response.media_type == 'image'){
          image = response.hdurl.toString();
          console.log(image);
          document.getElementById("target").value = image
          document.querySelector('img').src = response.hdurl
        }else{
          document.querySelector('iframe').src = response.url
        }
          document.getElementById('explanation').innerText = response.explanation;
          document.getElementById('date').innerText = response.date;


    })
    .catch(err => {
        console.log(`error ${err}`)
        // alert("sorry, there are no results for your search")
    });
    return image;


}



      // console.log(src())\


// function rocketToSpace(){
//   fetch('content',{
//     method: 'post',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'date': date,
//       'explanation': explanation,
//       'hdurl':hdurl
//   })
// })
 //
 // put back in ejs to render shit from db
 //
  
