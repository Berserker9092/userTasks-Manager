document.querySelector("button").addEventListener("click", function(e){
    e.preventDefault();
    let email = document.getElementById("mail").value
    let password = document.getElementById("pass").value
    //alert(`email : ${email}, password : ${password}`)
    if(email.trim() !== "" && password.trim() !== ""){
        let li = document.createElement("li")
        li.textContent = `Email : ${email} | password : ${password}`
    
    let btn = document.createElement("button")
    btn.textContent = "Supprimer"
    btn.type="button";
    btn.addEventListener("click", function(){
        li.remove();
    })
     li.appendChild(btn);
     document.getElementById("liste").appendChild(li)
        document.getElementById("mail").value = ""
        document.getElementById("pass").value = ""
}})
