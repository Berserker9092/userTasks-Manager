let btn = document.getElementById("theme");
btn.addEventListener('click', function(){
    if(document.body.classList.contains("clair")){
        document.body.classList.remove("clair")
        document.body.classList.add("sombre")
    }else{
        document.body.classList.remove("sombre")
        document.body.classList.add("clair")
    }
   //document.body.classList.toggle("sombre");
})