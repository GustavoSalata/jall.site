//Consistencia dos campos
function fncConsiste(){
	console.log('entrei na function fncConsiste')
	var senha, novaSenha, confirmaSenha, sessionSenha;
	var retorno = false;
	novaSenha = document.getElementById('novasenha');
	confirmaSenha = document.getElementById('confirmasenha');
	sessionSenha = document.getElementById('sessionSenha');
	
	//campos para criacao de senhas fortes
	var x;
	var iNumeros = 0;
	var iLetras = 0;
	var tNumeros = 1;
	var tLetras = 1; 
	var renum = /[0-9]/;
	var retxt = /[a-z]/;	   
	   
	//campos nao preenchidos
	var msg1 = 'Campo "';
	var msg2 = '" deve estar preenchido.\n';
	var msg = '';
	
	if (novaSenha.value.length == 0)
		msg += msg1 + 'Nova Senha' + msg2;
	if (confirmaSenha.value.length == 0)
		msg += msg1 + 'Confirmar Nova Senha' + msg2;
	if (confirmaSenha.value != novaSenha.value)
		msg += 'Senhas divergentes';
	if(novaSenha.value.match("123|234|345|456|567|678|789|890|901|012|987|876|765|654|543|432|321|210|109|098")
		|| novaSenha.value.match("111|222|333|444|555|666|777|888|999")
		|| !novaSenha.value.match(/[A-Z]/) || novaSenha.value.length < 8)
		msg += 'A senha deve ter mínimo de 8 caracteres, incluindo: letras maiúsculas/minúsculas, números sem ser sequenciais ou repetidos';
	
	   for(i=0;i<novaSenha.value.length; i++)
	   {
	     x = novaSenha.value.substring(i,i+1);
	     if(renum.test(x)) iNumeros++;
	     if(retxt.test(x)) iLetras++;
	   }

	   if (iNumeros < tNumeros) 
	   {
		   msg += 'Informe no m�nimo ' + tNumeros + ' n�meros em sua senha !';
	   // return false;
	   }

	   if (iLetras < tLetras) 
	   {
		   msg += 'Informe no m�nimo ' + tNumeros + ' letras em sua senha !';
	    // return false;
	   }  
		
	if (msg.length == 0)
		retorno = true;
	else
		alert(msg);
	
	return retorno;
}
//Consistencia dos campos
function fncConsisteEsquecido(){
	console.log('entrei na function fncConsisteEsquecido')
	var email;
	var retorno = false;
	
	email = document.getElementById('loginesquiciSenha');
	
	//campos nao preenchidos
	var msg1 = 'Campo "';
	var msg2 = '" deve estar preenchido.\n';
	var msg = '';
	
	if (email.value.length == 0)
		msg += msg1 + 'Email' + msg2;
	
	if (msg.length == 0)
		retorno = true;
	else
		alert(msg);
	return retorno;
}


function SenhaForte(formobject)
{
   var x;
   var iNumeros = 0;
   var iLetras = 0;
   var tNumeros = 4;
   var tLetras = 6;
   var renum = /[0-9]/;
   var retxt = /[a-z]/;

   
   for(i=0;i<formobject.value.length; i++)
   {
     x = formobject.value.substring(i,i+1);
     if(renum.test(x)) iNumeros++;
     if(retxt.test(x)) iLetras++;
   }

   if (iNumeros < tNumeros) 
   {
    alert("Informe no m�nimo " + tNumeros + " n�meros em sua senha !");
    return false;
   }

   if (iLetras < tLetras) 
   {
     alert("Informe no m�nimo " + tLetras + " letras em sua senha !");
     return false;
   }  

   return true;
}

