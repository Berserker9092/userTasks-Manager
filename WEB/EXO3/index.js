document.querySelector(".btn").addEventListener('click', function(){
    //alert("bonjour")
    let nom = document.querySelector("#nom").value;
    let age = document.querySelector("#age").value;
    let pays = document.querySelector("#pays").value;
    let commentaire = document.querySelector("#commentaire").value;
    //alert(`${nom}_${age}_${pays}_${commentaire}`);
    sexe = document.querySelector('input[name="sexe"]:checked').value;
    //loisir = document.querySelectorAll('input[name="sport"]:checked').value;
    // On transforme la liste en tableau, on récupère les .value, et on les colle avec une virgule
    let loisir = Array.from(document.querySelectorAll('input[name="sport"]:checked'))
                  .map(el => el.value)
                  .join(", ");

    if(nom === "" || age === "" || pays === "" || commentaire === ""){
        alert("veuillez remplir tous les champs")
        return;
    }
     alert(`Nom : ${nom}\n Age : ${age}\n Sexe : ${sexe}\n loisir : ${loisir}\n pays : ${pays}\n commentaire : ${commentaire}` )
    let resultat = `
    <strong>Nom</strong> : ${nom}<br>
    <strong>Age</strong> : ${age}<br>
    <strong>Sexe</strong> : ${sexe}<br>
    <strong>Loisir</strong> : ${loisir}<br>
    <strong>Pays</strong> : ${pays}<br>
    <strong>Commentaire</strong> : ${commentaire}<br>
    `;
    document.querySelector(".resultat").innerHTML = resultat;
    
});
