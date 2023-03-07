// Original JavaScript code by Duncan Crombie: dcrombie@chirp.com.au
// Please acknowledge use of this code by including this header.

// CONSTANTS
var thousand_separator = ".";  // use comma as 000's separator
var decpoint = ",";  // use period as decimal point
var percent = "%";
var currency = "$";  // use dollar sign for currency

function formatNumber(number, format, print) {  // use: formatNumber(number, "format")
  if (print) document.write("formatNumber(" + number + ", \"" + format + "\")<br>");

  if (number - 0 != number) return null;  // if number is NaN return null
  
  var useSeparator = format.indexOf(thousand_separator) != -1;  // use separators in number
  var usePercent = format.indexOf(percent) != -1;  // convert output to percentage
  var useCurrency = format.indexOf(currency) != -1;  // use currency format
  var isNegative = (number < 0);
  number = Math.abs (number);
  
  if (usePercent) number *= 100;
  
  format = strip(format, thousand_separator + percent + currency);  // remove key characters
  number = "" + number;  // convert number input to string

  // split input value into LHS and RHS using decpoint as divider
  var dec = number.indexOf(".") != -1;
  var nleftEnd = (dec) ? number.substring(0, number.indexOf(".")) : number;
  var nrightEnd = (dec) ? number.substring(number.indexOf(".") + 1) : "";

  // split format string into LHS and RHS using decpoint as divider
  dec = format.indexOf(decpoint) != -1;
  var sleftEnd = (dec) ? format.substring(0, format.indexOf(decpoint)) : format;
  var srightEnd = (dec) ? format.substring(format.indexOf(decpoint) + 1) : "";

   // adjust decimal places by cropping or adding zeros to LHS of number
  if (srightEnd.length < nrightEnd.length) {
    var nextChar = nrightEnd.charAt(srightEnd.length) - 0;
    nrightEnd = nrightEnd.substring(0, srightEnd.length);
    if (nextChar >= 5) nrightEnd = "" + ((nrightEnd - 0) + 1);  // round up

    // patch provided by Patti Marcoux 1999/08/06
    while (srightEnd.length > nrightEnd.length) {
      nrightEnd = "0" + nrightEnd;
    }

    if (srightEnd.length < nrightEnd.length) {
      nrightEnd = nrightEnd.substring(1);
      nleftEnd = (nleftEnd - 0) + 1;
    }
  } else {
    for (var i=nrightEnd.length; srightEnd.length > nrightEnd.length; i++) {
      if (srightEnd.charAt(i) == "0") nrightEnd += "0";  // append zero to RHS of number
      else break;
    }
  }

   // adjust leading zeros
  sleftEnd = strip(sleftEnd, "#");  // remove hashes from LHS of format
  while (sleftEnd.length > nleftEnd.length) {
    nleftEnd = "0" + nleftEnd;  // prepend zero to LHS of number
  }

  if (useSeparator) nleftEnd = separate(nleftEnd, thousand_separator);  // add separator
  var output = nleftEnd + ((nrightEnd != "") ? decpoint + nrightEnd : "");  // combine parts
  output = ((useCurrency) ? currency : "") + output + ((usePercent) ? percent : "");
  if (isNegative) {
    // patch suggested by Tom Denn 25/4/2001
    output = (useCurrency) ? "(" + output + ")" : "-" + output;
  }
  return output;
}

function strip(input, chars) {  // strip all characters in 'chars' from input
  var output = "";  // initialise output string
  for (var i=0; i < input.length; i++)
    if (chars.indexOf(input.charAt(i)) == -1)
      output += input.charAt(i);
  return output;
}

function separate(input, separator) {  // format input using 'separator' to mark 000's
  input = "" + input;
  var output = "";  // initialise output string
  for (var i=0; i < input.length; i++) {
    if (i != 0 && (input.length - i) % 3 == 0) output += separator;
    output += input.charAt(i);
  }
  return output;
}

function formatEditNumber(input) {
  var output = "";  // initialise output string
  var chars = "0123456789,";
  input = "" + input;
  for (var i=0; i < input.length; i++)
    if (chars.indexOf(input.charAt(i)) != -1)
      output += input.charAt(i);
  return output;
}

function formatDoubleNumber(input) {
  var output = "";  // initialise output string
  var chars = "0123456789,";
  input = "" + input;
  for (var i=0; i < input.length; i++)
    if (chars.indexOf(input.charAt(i)) != -1)
      output += input.charAt(i);
  output = output.replace(decpoint, ".");
  return output;
}

function formatEditNumberToNumber(input) {
  var output = formatDoubleNumber(input);
  return output;
}

function MM_findObj(n, d) { //v4.0
 		var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	   	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
 		if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
 		for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  		if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
 		var i,j=0,x,a=MM_swapImage.arguments; 
 		document.MM_sr=new Array; 
 		for(i=0;i<(a.length-2);i+=3)
   		if ((x=MM_findObj(a[i]))!=null) {
   			document.MM_sr[j++]=x; 
   			if(!x.oSrc) x.oSrc=x.src; 
   			x.src=a[i+2];
   		}
}

function testaIntervalo(data1, data2, intervalo, botao){

	if(data1.length > 0 && data2.length > 0){

		var iniDia = parseFloat(data1.split("/")[0]);
		var iniMes = parseFloat(data1.split("/")[1])-1;
		var iniAno = parseFloat(data1.split("/")[2]);

		var fimDia = parseFloat(data2.split("/")[0]);
		var fimMes = parseFloat(data2.split("/")[1])-1;
		var fimAno = parseFloat(data2.split("/")[2]);

		var dataIni = new Date(iniAno, iniMes, iniDia);
		var dataFim = new Date(fimAno, fimMes, fimDia);

		var tempo = (((((dataFim.valueOf() - dataIni.valueOf())/1000)/60)/60)/24);

		if(tempo > intervalo || tempo < 0){
			alert("O intervalo entre as datas n\u00E3o pode ultrapassar " + intervalo + " dias e n\u00E3o pode ser negativo");
			botao.disabled = true;
			return false;
		} else {
			botao.disabled = false;
		}
	
	} else if(data1.length == 0 || data2.length == 0){
		botao.disabled = true;	
	}
}

function testaIntervaloV2(data1, data2, intervalo) {

	if(data1.value.length > 0 && data2.value.length > 0){
		
		var iniDia = parseFloat(data1.value.split("/")[0]);
		var iniMes = parseFloat(data1.value.split("/")[1])-1;
		var iniAno = parseFloat(data1.value.split("/")[2]);

		var fimDia = parseFloat(data2.value.split("/")[0]);
		var fimMes = parseFloat(data2.value.split("/")[1])-1;
		var fimAno = parseFloat(data2.value.split("/")[2]);

		var dataIni = new Date(iniAno, iniMes, iniDia);
		var dataFim = new Date(fimAno, fimMes, fimDia);

		var tempo = (((((dataFim.valueOf() - dataIni.valueOf())/1000)/60)/60)/24);

		if(tempo > intervalo || tempo < 0) {
			alert("O intervalo entre as datas n\u00E3o pode ultrapassar " + intervalo + " dias e n\u00E3o pode ser negativo");
			data1.value = "";
			data2.value = "";
		}
	}
}

function testaIntervaloBtn(data1, data2, intervalo, botao, ativaBotao){
	if (typeof(ativaBotao) == "undefined") {
		ativaBotao = false;
	}

	if(data1.length > 0 && data2.length > 0){

		var iniDia = parseFloat(data1.split("/")[0]);
		var iniMes = parseFloat(data1.split("/")[1])-1;
		var iniAno = parseFloat(data1.split("/")[2]);

		var fimDia = parseFloat(data2.split("/")[0]);
		var fimMes = parseFloat(data2.split("/")[1])-1;
		var fimAno = parseFloat(data2.split("/")[2]);

		var dataIni = new Date(iniAno, iniMes, iniDia);
		var dataFim = new Date(fimAno, fimMes, fimDia);

		var tempo = (((((dataFim.valueOf() - dataIni.valueOf())/1000)/60)/60)/24);

		if(tempo > intervalo || tempo < 0){
			alert("O intervalo entre as datas n\u00E3o pode ultrapassar " + intervalo + " dias e n\u00E3o pode ser negativo");
			botao.disabled = true;
			return false;
		} else {
			botao.disabled = false;
		}		
	} else if(data1.length == 0 || data2.length == 0){	
		if (data1.length == 0 && data2.length == 0 && ativaBotao == true) {
			botao.disabled = false;
		} else {
			botao.disabled = true;
		}
	}
}

function habilitaBotao(caixa, botao){
	if(caixa.value.length == 10){
		botao.disabled = false;
	} else {
		botao.disabled = true;
	}
}

function escolheTipo(tipo){
	if(tipo == "ent"){
		document.getElementById('div_situacao').style.display = 'none';
		document.getElementById('div_parentesco').style.display = 'block';
	} else if(tipo == "dev"){
		document.getElementById('div_situacao').style.display = 'block';
		document.getElementById('div_parentesco').style.display = 'none';
	} else {
		document.getElementById('div_situacao').style.display = 'none';
		document.getElementById('div_parentesco').style.display = 'none';
	}
}

function validaPesquisa(){
	var erro = '';
	
	if(document.getElementById('data').value.length == 0){
		erro += '- Preencha a data de baixa.\n';
	}
	
	if(document.getElementById('tipo').value.length == 0){
		erro += '- Escolha um tipo de baixa.\n';
	}
	
	if(document.getElementById('tipo').value == 'ent'){
		var par = document.getElementsByName('parentesco');
		var ok = false;
		for(var i = 0; i < par.length; i++){
			if(par[i].checked == true){
				ok = true;
			}
		}
		if(ok == false){
			erro += '- Escolha ao menos um tipo de parentesco para a pesquisa.\n';
		}
	}
	
	if(document.getElementById('tipo').value == 'dev'){
		var sit = document.getElementsByName('situacao');
		var ok = false;
		for(var i = 0; i < sit.length; i++){
			if(sit[i].checked == true){
				ok = true;
			}
		}
		if(ok == false){
			erro += '- Escolha ao menos um motivo de devolu\u00E7\u00E3o para a pesquisa.\n';
		}
	}
	
	if(erro == ''){
		document.forms[0].submit();
	} else {
		alert('Solucione as seguintes pend\u00eancias antes de tentar visualizar o relat\u00F3rio novamente:\n\n' + erro);
	}
}

function validaArquivo(){
	var erro = '';

	var hawb = document.getElementsByName('hawb');
	var ok = false;
	for(var i = 0; i < hawb.length; i++){
		if(hawb[i].checked == true){
			ok = true;
		}
	}
	if(ok == false){
		erro += '- Escolha ao menos uma hawb para o arquivo.\n';
	}
	
	if(erro == ''){
		document.forms[0].submit();
	} else {
		alert('Solucione as seguintes pend\u00eancias antes de tentar gerar o arquivo novamente:\n\n' + erro);
	}
}

function validaArquivoTmk(){
	var erro = '';

	var hawb = document.getElementsByName('hawb');
	var ok = false;
	for(var i = 0; i < hawb.length; i++){
		if(hawb[i].checked == true){
			ok = true;
		}
	}
	if(ok == false){
		erro += '- Escolha ao menos uma hawb para o arquivo.\n';
	}
	
	if(erro == ''){
		document.forms[0].action = "relatorio_prevencao_fraudes_tmk.do";
		document.forms[0].submit();
	} else {
		alert('Solucione as seguintes pend\u00eancias antes de tentar gerar o arquivo novamente:\n\n' + erro);
	}
}

function filtroByRegEx(campo, pattern){
	
	var patt = new RegExp(pattern);
    var campo_temp;
    
    for (var i=0;i<campo.value.length;i++){
        campo_temp=campo.value.substring(i,i+1)
        if (!patt.test(campo_temp)){
            campo.value = campo.value.substring(0,i);
            break;
        }
    }
    
}


//funcao que bloqueia o "voltar" pelo browser

function noBackInBrowser(){
	
	var noback = { 
		 
		//globals 
		version: '0.0.1', 
		history_api : typeof history.pushState !== 'undefined', 
		 
		init:function(){ 
			window.location.hash = '#no-back'; 
			noback.configure(); 
		}, 
		 
		hasChanged:function(){ 
			if (window.location.hash == '#no-back' ){ 
				window.location.hash = '#BLOQUEIO';
				//mostra mensagem que não pode usar o btn volta do browser
				if($( "#msgAviso" ).css('display') =='none'){
					$( "#msgAviso" ).slideToggle("slow");
				}
			} 
		}, 
		 
		checkCompat: function(){ 
			if(window.addEventListener) { 
				window.addEventListener("hashchange", noback.hasChanged, false); 
			}else if (window.attachEvent) { 
				window.attachEvent("onhashchange", noback.hasChanged); 
			}else{ 
				window.onhashchange = noback.hasChanged; 
			} 
		}, 
		 
		configure: function(){ 
			if ( window.location.hash == '#no-back' ) { 
				if ( this.history_api ){ 
					history.pushState(null, '', '#BLOQUEIO'); 
				}else{  
					window.location.hash = '#BLOQUEIO';
					//mostra mensagem que não pode usar o btn volta do browser
					if($( "#msgAviso" ).css('display') =='none'){
						$( "#msgAviso" ).slideToggle("slow");
					}
				} 
			} 
			noback.checkCompat(); 
			noback.hasChanged(); 
		} 
		 
		}; 
		 
		// AMD support 
		if (typeof define === 'function' && define.amd) { 
			define( function() { return noback; } ); 
		}  
		// For CommonJS and CommonJS-like 
		else if (typeof module === 'object' && module.exports) { 
			module.exports = noback; 
		}  
		else { 
			window.noback = noback; 
		} 
		noback.init();
}
