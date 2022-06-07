window.addEventListener('DOMContentLoaded', function (e) {
    debugger;
    var form_register = document.querySelector('#form-register');
    form_register.addEventListener('submit', function (e) {
        //e.preventDefault();
        debugger;
        var canSubmit = true;
        var canSubmitCed = true;
        var canSubmitEma = true;
        var input_name = document.querySelector("#input_name");
        if (input_name.value == "") {
            document.querySelector("#name_container .input-error").innerHTML = "El nombre es obligatorio";
            canSubmit = false;
        } else {
            if (input_name.value.length < 3) {
                document.querySelector("#name_container .input-error").innerHTML = "El nombre debe tener al menos 3 digitos";
                canSubmit = false;
            } else {
                document.querySelector("#name_container .input-error").innerHTML = "";
            }
        }

        var input_lastname = document.querySelector("#input_lastname");
        if (input_lastname.value == "") {
            document.querySelector("#lastname_container .input-error").innerHTML = "El apellido es obligatorio";
            canSubmit = false;
        } else {
            if (input_lastname.value.length < 3) {
                document.querySelector("#lastname_container .input-error").innerHTML = "El apellido debe tener al menos 3 digitos";
                canSubmit = false;
            } else {
                document.querySelector("#lastname_container .input-error").innerHTML = "";
            }
        }

        var input_cedula = document.querySelector("#input_cedula");
        if (input_cedula.value == "") {
            document.querySelector("#cedula_container .input-error").innerHTML = "La cedula es obligatorio";
            canSubmit = false;
        } else {
            canSubmitCed = ValidarCedula(input_cedula.value);
        }

        var input_email = document.querySelector("#input_email");
        if (input_email.value == "") {
            document.querySelector("#email_container .input-error").innerHTML = "El correo electronico es obligatorio";
            canSubmit = false;
        } else {
            debugger;
            canSubmitEma = ValidarCorreo(input_email.value);
            /*var indexOne = input_email.value.indexOf("@");
            var indexTwo = input_email.value.indexOf(".");
            if ((indexOne < 0 || indexTwo < 0)) {
                document.querySelector("#email_container .input-error").innerHTML = "El correo electronico no tiene";
                canSubmit = false;
            }else{
                document.querySelector("#email_container .input-error").innerHTML = "";
            }*/
            
        }

        if (!canSubmit || !canSubmitCed || !canSubmitEma) {
            e.preventDefault();
        }
    });

    function ValidarCedula(cedula) {
        //Preguntamos si la cedula consta de 10 digitos
        debugger;
        var esCorrecta = false;
        if (cedula.length == 10) {

            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0, 2);

            //Pregunto si la region existe ecuador se divide en 24 regiones
            if (digito_region >= 1 && digito_region <= 24) {

                // Extraigo el ultimo digito
                var ultimo_digito = cedula.substring(9, 10);

                //Agrupo todos los pares y los sumo
                var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

                //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                var numero1 = cedula.substring(0, 1);
                var numero1 = (numero1 * 2);
                if (numero1 > 9) { var numero1 = (numero1 - 9); }

                var numero3 = cedula.substring(2, 3);
                var numero3 = (numero3 * 2);
                if (numero3 > 9) { var numero3 = (numero3 - 9); }

                var numero5 = cedula.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) { var numero5 = (numero5 - 9); }

                var numero7 = cedula.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) { var numero7 = (numero7 - 9); }

                var numero9 = cedula.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) { var numero9 = (numero9 - 9); }

                var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                //Suma total
                var suma_total = (pares + impares);

                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0, 1);

                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1) * 10;

                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;

                //Si el digito validador es = a 10 toma el valor de 0
                if (digito_validador == 10)
                    var digito_validador = 0;

                //Validamos que el digito validador sea igual al de la cedula
                if (digito_validador == ultimo_digito) {
                    document.querySelector("#cedula_container .input-error").innerHTML = ' ';
                    esCorrecta=true;
                }else{
                    document.querySelector("#cedula_container .input-error").innerHTML = 'la cedula:' + cedula + ' es incorrecta';
                    esCorrecta = false;
                }

            } else {
                // imprimimos en consola si la region no pertenece
                document.querySelector("#cedula_container .input-error").innerHTML = 'Esta cedula no pertenece a ninguna region';
                esCorrecta = false;
            }
        } else if (cedula.length < 10) {
            //imprimimos en consola si la cedula tiene menos de 10 digitos
            document.querySelector("#cedula_container .input-error").innerHTML = 'Esta cedula tiene menos de 10 Digitos';
            esCorrecta = false;

        } else if (cedula.length > 10) {
            //imprimimos en consola si la cedula tiene menos de 10 digitos
            document.querySelector("#cedula_container .input-error").innerHTML = 'Esta cedula tiene mas de 10 Digitos';
            esCorrecta = false;

        }

        return esCorrecta;
    }

    function ValidarCorreo(email){
        debugger;
        var existe = false;
        var arroba = email.indexOf("@");
        var punto =  email.lastIndexOf(".");
        var extension= email.split(".")[1];
        
        if (arroba < 1 || ( punto - arroba < 2 )||email===""){
            document.querySelector("#email_container .input-error").innerHTML = "El correo electronico no es valido";
            existe = false;
        }else{
          if(extension.length >3){
            document.querySelector("#email_container .input-error").innerHTML = "El correo electronico no es valido -  error extension";
            existe=false;
          }else{
            document.querySelector("#email_container .input-error").innerHTML = " ";
            existe=true;
          }
          
        }
        return existe;
   }




    /*var first_container = document.querySelector('#first-container');
    first_container.addEventListener('click',function(e){
        //console.log('click from first-container');
        first_container.innerHTML = '';
    });
    
    var link = document.querySelector('#id-link');
    link.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        alert('click from link element');
    });*/
});