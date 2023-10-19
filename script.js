// import firebase from "firebase/app";
// import "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAFynF6RQiX8bGyZ4UeI-wIltTxR5JhrcU",
    authDomain: "base-de-datos-bca94.firebaseapp.com",
    projectId: "base-de-datos-bca94",
    storageBucket: "base-de-datos-bca94.appspot.com",
    messagingSenderId: "678984200569",
    appId: "1:678984200569:web:06cdef207f4dccfeebffa8",
    measurementId: "G-520THMYPPD"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById("formulario").addEventListener('submit', (event)=>{
    event.preventDefault()
    //VALIDACION DEL NOMBRE
    const nombreForm = document.getElementById("name");
    const errorNombre = document.getElementById("nameError");
    if(nombreForm.value.trim() ==="" ){
        errorNombre.textContent = "Por favor introducí tu nombre";
        errorNombre.classList.add('error-message');
    }else{
        errorNombre.textContent = "";
        errorNombre.classList.remove('error-message');
    };

    //VALIDACION DEL EMAIL
    const emailForm = document.getElementById("email");
    const errorEmail = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!emailPattern.test(emailForm.value)){
        errorEmail.textContent = "Por favor introducí un email correcto ";
        errorEmail.classList.add('error-message');
    }else{
        errorEmail.textContent = "";
        errorEmail.classList.remove('error-message');
    };

    //VALIDACION DE LA CONTRASEÑA
    const contrasena = document.getElementById("password");
    const errorContrasena = document.getElementById("passwordError")
    const contrasenaPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if(!contrasenaPattern.test(contrasena.value)){
        errorContrasena.textContent = "Por favor introducí una contraseña valida ";
        errorContrasena.classList.add('error-message');
        
    }else{
        errorContrasena.textContent = "";
        errorContrasena.classList.remove('error-message');
    }
    // SI TODOS LOS CAMPOS SON VALIDOS , ENVIAR FORMULARIO
    if(!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent){
        //BACKEND QUE RECIBA LA INFORMACION
        db.collection("users").add({
            nombre: nombreForm.value,
            email: emailForm.value,
            password: contrasena.value 
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
        alert('Formulario se ha enviado con exito');
        document.getElementById("formulario").reset(); 
    };
});