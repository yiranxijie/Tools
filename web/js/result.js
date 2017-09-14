
function FormatDate(time, add){
    var year=time.substring(0,4);
    var month=parseInt(time.substring(4,6), 10);
    var day=parseInt(time.substring(6), 10);
	var d = new Date(year + "/" + month + "/" + day);
	d.setDate(d.getDate() + (0 - add));
	var s = d.getFullYear() + "��" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "��" + (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) + "��";
    return s;
}

function FormatSBH(sbh, str) {
	var s1 = str.split("_");
	for (var i = 0; i < s1.length; i++) {
		sbh = chgchar(sbh, s1[i]);
	}
	return sbh;
}

function chgchar(nsrsbh, ss) {
	var a = ss.charAt(2);
	var b = ss.charAt(0);  //�����滻�����Ժ�java�����෴��
	nsrsbh = nsrsbh.replaceAll(a, '#');
	nsrsbh = nsrsbh.replaceAll(b, '%');
	nsrsbh = nsrsbh.replaceAll('#', b);
	nsrsbh = nsrsbh.replaceAll('%', a);
	return nsrsbh;
}

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) { 
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) { 
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith); 
	} else { 
		return this.replace(reallyDo, replaceWith); 
	} 
} 

function getje(je, ss) {
	if (typeof(je) != "undefined" && je != "") {
		return accAdd(je, ss);
	} else {
		return je;
	}
	//return je;
}
//�ӷ������������õ���ȷ�ļӷ���� 
//˵����javascript�ļӷ������������������������ӵ�ʱ���Ƚ����ԡ�����������ؽ�Ϊ��ȷ�ļӷ������ 
//���ã�accAdd(arg1,arg2) 
//����ֵ��arg1����arg2�ľ�ȷ��� 
function accAdd(arg1, arg2) { 
    var r1,r2,m;
	if (arg1.trim() == "") {
		return arg1;
	}
	if(parseInt(arg1, 10)==arg1){
        r1=0;
    }else{
        r1=arg1.toString().split(".")[1].length;
    }
    if(parseInt(arg2, 10)==arg2){
        r2=0;
    }else{
    	r2=arg2.toString().split(".")[1].length;
    }
    m = Math.pow(10, Math.max(r1, r2))  ;
	//alert(m);
	var r = (arg1 * m + arg2 * m) / m  ;
    return r.toFixed(2);
}

//�˷������������õ���ȷ�ĳ˷����
//˵����javascript�ĳ˷������������������������˵�ʱ���Ƚ����ԡ�����������ؽ�Ϊ��ȷ�ĳ˷������ 
//���ã�accMul(arg1,arg2) 
//����ֵ��arg1����arg2�ľ�ȷ���
function accMul(arg1,arg2)
{ 
    var m=0,s1=arg1.toString(),s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){} 
    try{m+=s2.split(".")[1].length}catch(e){} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
   function NoToChinese_old(n,fplx)  
      {
        var flag=0;
        var s = '';  
        var fraction = ['��', '��'];
        var digit = ['��', 'Ҽ', '��', '��', '��', '��', '½', '��', '��', '��'];
        var unit = [ ['԰', '��', '��'], ['', 'ʰ', '��', 'Ǫ']  ];
        var head = n < 0? 'Ƿ': '';
        if(n.split(".")[1]=="00"&&(fplx=="02"||fplx=="03")){
          flag=1;
        }
        if(flag==1){
          var spot=n.split(".")[1];
          s=digit[spot.charAt(0)]+"��"+digit[spot.charAt(1)]+"��";
        }
        
        n = Math.abs(n);          

        if(flag!=1){
          for (var i = 0; i < fraction.length; i++) 
          {
              s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/��./, '');
          }
          s = s || '��';
        } 

        n = Math.floor(n);
    
        for (var i = 0; i < unit[0].length && n > 0; i++) 
        {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) 
            {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(��.)*��$/, '').replace(/^$/, '��')  + unit[0][i] + s;
        }
        if(flag==1){
          return head + s.replace(/(��.)*��԰/, '԰');
        }
        return head + s.replace(/(��.)*��԰/, '԰').replace(/(��.)+/g, '��').replace(/^��$/, '��԰��');
  }
function NoToChinese(currencyDigits, fplx) { 
// Constants: 
    var MAXIMUM_NUMBER = 99999999999.99; 
    // Predefine the radix characters and currency symbols for output: 
    var CN_ZERO = "��"; 
    var CN_ONE = "Ҽ"; 
    var CN_TWO = "��"; 
    var CN_THREE = "��"; 
    var CN_FOUR = "��"; 
    var CN_FIVE = "��"; 
    var CN_SIX = "½"; 
    var CN_SEVEN = "��"; 
    var CN_EIGHT = "��"; 
    var CN_NINE = "��"; 
    var CN_TEN = "ʰ"; 
    var CN_HUNDRED = "��"; 
    var CN_THOUSAND = "Ǫ"; 
    var CN_TEN_THOUSAND = "��"; 
    var CN_HUNDRED_MILLION = "��"; 
    var CN_SYMBOL = ""; 
    var CN_DOLLAR = "Բ"; 
    var CN_TEN_CENT = "��"; 
    var CN_CENT = "��"; 
    var CN_INTEGER = "��"; 
	if (fplx == "02" || fplx == "03") {
		CN_DOLLAR = "Ԫ"; 
	}
     
// Variables: 
    var integral;    // Represent integral part of digit number. 
    var decimal;    // Represent decimal part of digit number. 
    var outputCharacters;    // The output result. 
    var parts; 
    var digits, radices, bigRadices, decimals; 
    var zeroCount; 
    var i, p, d; 
    var quotient, modulus; 
     
// Validate input string: 
    currencyDigits = currencyDigits.toString(); 
    if (currencyDigits.trim() == "") { 
        //alert("������Сд��"); 
        return ""; 
    } 
    if (currencyDigits.match(/[^,.\d]/) != null) { 
		if (currencyDigits.substring(0,1) != '-') {
			alert("Сд������Ч�ַ���"); 
			return ""; 
		}
    } 
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) { 
		if (currencyDigits.substring(0,1) != '-') {
			alert("Сд���ĸ�ʽ����ȷ��"); 
			return ""; 
		}
    } 
	var fushuflag = "";
	if (currencyDigits.substring(0,1) == '-') {
		if (fplx == "01" || fplx == "04") {
			fushuflag = "��������";
		} else if (fplx == "02" || fplx == "03" || fplx == "11") {
			fushuflag = "������";
		} else if (fplx == "10") {
			fushuflag = "��";
		} else {
			fushuflag = "��������";
		}
		
		currencyDigits = currencyDigits.substring(1, currencyDigits.length);
	}
// Normalize the format of input digits: 
    currencyDigits = currencyDigits.replace(/,/g, "");    // Remove comma delimiters. 
    currencyDigits = currencyDigits.replace(/^0+/, "");    // Trim zeros at the beginning. 
    // Assert the number is not greater than the maximum number. 
    if (Number(currencyDigits) > MAXIMUM_NUMBER) { 
        alert("������ӦС��1000��Ԫ��"); 
        return ""; 
    } 
     
// Process the coversion from currency digits to characters: 
    // Separate integral and decimal parts before processing coversion: 
    parts = currencyDigits.split("."); 
    if (parts.length > 1) { 
        integral = parts[0]; 
        decimal = parts[1]; 
        // Cut down redundant decimal digits that are after the second. 
        decimal = decimal.substr(0, 2); 
    } 
    else { 
        integral = parts[0]; 
        decimal = ""; 
    } 
    // Prepare the characters corresponding to the digits: 
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE); 
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND); 
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION); 
    decimals = new Array(CN_TEN_CENT, CN_CENT); 
    // Start processing: 
    outputCharacters = ""; 
    // Process integral part if it is larger than 0: 
    if (Number(integral) > 0) { 
        zeroCount = 0; 
        for (i = 0; i < integral.length; i++) { 
            p = integral.length - i - 1; 
            d = integral.substr(i, 1); 
            quotient = p / 4; 
            modulus = p % 4; 
            if (d == "0") { 
                zeroCount++; 
            } 
            else { 
                if (zeroCount > 0) 
                { 
                    outputCharacters += digits[0]; 
                } 
                zeroCount = 0; 
                outputCharacters += digits[Number(d)] + radices[modulus]; 
            } 
            if (modulus == 0 && zeroCount < 4) { 
                outputCharacters += bigRadices[quotient]; 
                zeroCount = 0; 
            } 
        } 
        outputCharacters += CN_DOLLAR; 
    } 
    // Process decimal part if there is: 
    if (decimal != "") { 
        for (i = 0; i < decimal.length; i++) { 
            d = decimal.substr(i, 1); 
            if (d != "0") { 
                outputCharacters += digits[Number(d)] + decimals[i]; 
            } 
        } 
    } 
    // Confirm and return the final output string: 
    if (outputCharacters == "") { 
        outputCharacters = CN_ZERO + CN_DOLLAR; 
    } 
    if (decimal == "" || decimal == "00" || decimal == "0" ) { 
        outputCharacters += CN_INTEGER; 
    } 
    outputCharacters = fushuflag + CN_SYMBOL + outputCharacters; 
    return outputCharacters; 
} 
function FormatHwmc(mc, str) {
	var ss = mc.replaceAll(str, "");
	return ss;
}
  function GetHwxxHtml(hwxxs, hwstr, je){
	  //�Ȳ����Ҫ��ʾ��ϸ�Ļ�������Ҫ��ʾ��ϸ�ģ���ҳ����ʾһ�����ӣ����Ӳ���������ĳ�������ϣ�����������Ӻ��´�������ʾ��Щh1��ͷ����ϸ��Ϣ��
	  var hwii=hwxxs.split("�{");
	  if (hwii.length > 1) {
		  hwxxs = hwii[0];
	  }
    var hwinfo=hwxxs.split('��');
    var hw;
    var html = "";

    for(var i=0;i<hwinfo.length;i++){
       
        hw=hwinfo[i].split('��');
        html+='<tr>';
        for(var j=0;j<8;j++){
          if(j!=7){
			  if (j == 3 || j == 4 || j == 5 || j == 6) {
				    html+='<td class="align_right borderRight"><span class="content_td_blue">';
			  } else {
					html+='<td class="align_left borderRight"><span class="content_td_blue">';
			  }
          }else{
            html+='<td class="align_right"><span class="content_td_blue">';
          }          
           if(j==6){
              html+=FormatSl(hw[j]);       
           } else if (j == 4 || j == 5 || j == 7) {
			   //html+=GetJeToDot(getje(hw[j].trim(), je));
			   html+=GetJeToDot(hw[j].trim());
		   } else if (j == 3) {
			   html+=getzeroDot(hw[j]);
           } else if (j == 0) {
			   html+=FormatHwmc(hw[j], hwstr);
           } else {
              html+=hw[j];
           }
           
           html+='</span></td>';
        }
        html+='</tr>';
    }
	
	  if (hwii.length > 1) {
		  sechw = hwii[1];
		  html+='<tr>';
		  html+='<td class="align_center borderRight"><span class="content_td_blue"><button id="showmx" class="white_button" style="position:relative!important;z-index:100" onmousemove="this.className=\'green_button\';" onmouseout="this.className=\'white_button\';" onclick="showmx(\'' + hwstr + '\',\'' + je + '\');">�鿴������ϸ�嵥</button>';
		  html+='</span></td>';
		  for(var j=0;j<7;j++){
			  if (j == 6) {
				  html+='<td class="align_center"><span class="content_td_blue">&nbsp;</span></td>';     
			  } else {
				  html+='<td class="align_center borderRight"><span class="content_td_blue">&nbsp;</span></td>';       
			  }
		  }
		  html+='</tr>';
	  }
    return html;
  }

  function getzeroDot(je) {
	  if (je.substring(0, 2) == "-.") {
		  je = "-0." + je.substring(2);
	  } else if (je.substring(0, 1) == ".") {
		  je = "0." + je.substring(1);
	  }
	  return je;
  }

  function showmx(hwstr, je) {
	 var hwinfo = sechw.split('��');
     var hw;
     var html = "";
	 if (hwinfo[0] != "") {
		 for(var i=0;i<hwinfo.length;i++){       
			hw=hwinfo[i].split('��');
			html+='<tr><td class="borderBottomTopNo content_td_blue">' + (i + 1) + '</td>';
			for(var j=0;j<8;j++){
				if (j == 0) {
					html+='<td class="borderBottomTopNo align_left content_td_blue">';
				} else if (j == 3 || j == 4 || j == 5 || j == 6 || j == 7) {
					html+='<td class="borderBottomTopNo align_right content_td_blue">';
				} else {
				    html+='<td class="borderBottomTopNo align_left content_td_blue">';
			    }          
			   if(j==6){
				  html += FormatSl(hw[j]);       
			   } else if (j == 3) {
			      html+=getzeroDot(hw[j]);
			   }else if(j == 4 || j == 5 || j == 7){
				  //html += GetJeToDot(getje(hw[j], je));
				  html += GetJeToDot(hw[j], je);
				  if (j == 5) {
					  //xiaoji1 = accAdd(xiaoji1, getje(hw[j], je));
					  //xiaoji1 = accAdd(xiaoji1, hw[j]);
					  //zongji1 = xiaoji1;  //ĿǰС�ƺ��ܼ�һ��
				  }
				  if (j == 7) {
					  //xiaoji2 = accAdd(xiaoji2, getje(hw[j], je));
					  //xiaoji2 = accAdd(xiaoji2, hw[j]);
					  //zongji2 = xiaoji2;
				  }
			   } else if (j == 0) {
			      html += FormatHwmc(hw[j], hwstr);
			   } else {
				  html += hw[j];
			   }
			   
			   html+='</td>';
			}
			html+='</tr>';
		}
	}
	$("#tab_head_mx").after(html);
	sechw = '';
	if (fplx == "01") {
		$("#xiaoji1").text($('#je_zp').text());
		$("#xiaoji2").text($('#se_zp').text());
		$("#zongji1").text($('#je_zp').text());
		$("#zongji2").text($('#se_zp').text());
	} else if (fplx == "04") {
		$("#xiaoji1").text($('#je_pp').text());
		$("#xiaoji2").text($('#se_pp').text());
		$("#zongji1").text($('#je_pp').text());
		$("#zongji2").text($('#se_pp').text());
	}
	popWin("hwmxqd");
	return ;
  }

  function GetDzHwxxHtml(hwxxs, hwstr, je){
    var hwinfo=hwxxs.split('��');
    var hw;
    var html = "";

    for(var i=0;i<hwinfo.length;i++){
       
        hw=hwinfo[i].split('��');
        html+='<tr>';
        for(var j=0;j<8;j++){

          if(j!=7){
			  if (j == 3 || j == 4 || j == 5 || j == 6) {
				  html+='<td class="align_right borderRight"><span class="content_td_blue">';
			  } else {
				  html+='<td class="align_left borderRight"><span class="content_td_blue">';
			  }
          }else{
              html+='<td class="align_right"><span class="content_td_blue">';
          }  
          if(j==3){
             //html+=hw[6];  
			      html+=getzeroDot(hw[6]);   //����Ҫ�úò�һ�£����ӷ�Ʊ
          } else if (j == 4 || j == 5 || j == 7) {
			   //html+=GetJeToDot(getje(hw[j].trim(), je));
			   html+=GetJeToDot(hw[j].trim());
          } else if (j == 0) {
			   html+=FormatHwmc(hw[j], hwstr);
          } else if (j == 6) {
              html+=FormatSl(hw[3]);       
          }else{
              html+=hw[j];
          }
           
           html+='</span></td>';
        }
        html+='</tr>';
    }
    return html;
  }

  function FormatSl(data){
	data = data.trim();
    if(data.substring(0,1)=="."){
      data=parseFloat("0"+data)*100;
    }
	if (data.length > 0) {
		return data+"%";
	} else {
		return "";
	}
  }

  function GetJeToDot(je){
	  if (typeof(je) != "undefined" && je.trim() != ""){ 
		  if (je.trim() == '-') {
			  return je;
		  }
		je = je.trim() + "";
		if (je.substring(0, 1) == '.') {
			je = '0' + '.' + je.substring(1, je.length);
			return je;
		}
		var index=je.indexOf(".");
		if(index<0){
		  je+=".00";
		}else if(je.split(".")[1].length==1){
		  je+="0";
		}
		if (je.substring(0,2) == '-.') {
			je = '-0.' + je.substring(2, je.length);
		}
		return je;
	  } else {
	    return je;
	  }

  }

  function GethyzpHwxxHtml(hwxxs, value, hwstr, je){

    var hwinfo=hwxxs.split('��');
    var hw;
    var html = "";

    for(var i=value;i<hwinfo.length;i=i+2){
        hw=hwinfo[i].split('��');
        html+='<tr>';
        for(var j=0;j<2;j++){
			if (j == 1) {
				html+='<td class="align_right"><span class="content_td_blue">';
			} else {
				html+='<td class="align_center"><span class="content_td_blue">';
			}
		   if (j == 0) {
				html += FormatHwmc(hw[j], hwstr);
		   } else if (j == 1) {
				//html += GetJeToDot(getje(hw[j], je));
				html += GetJeToDot(hw[j], je);
		   }
           html+='</span></td>';
        }
        html+='<td >&nbsp;</td></tr>';
    }
    return html;
  }

  function GetjsfpHwxxHtml(hwxxs, hwstr, je){
    var hwinfo=hwxxs.split('��');
    var hw;
    var html = "";

    for(var i=0;i<hwinfo.length;i++){
       
        hw=hwinfo[i].split('��');
        html+='<tr>';
		var tmp = "";
        for(var j=0;j<4;j++){
			if (j == 1) {
				tmp = '<td class="align_right"><span class="content_td_blue">' + hw[j] + '</span></td>';
				continue;
			}
			if (j == 2 || j == 3) {
				html+='<td class="align_right"><span class="content_td_blue">';
			} else {
				html+='<td class="align_center"><span class="content_td_blue">';
			}
		   if (j == 0) {
			   html += FormatHwmc(hw[j], hwstr);
		   } else if (j == 1) {
			      html+=getzeroDot(hw[j]);
		   } else if (j == 2 || j == 3) {
			   if (j == 2) {
				   //html += GetJeToDot(getje(hw[j], je));
				   html += GetJeToDot(hw[j]);
				   html += tmp;
				   tmp = "";
			   } else {
				   //html += GetJeToDot(getje(hw[j], je));
				   html += GetJeToDot(hw[j]);
			   }
		   } else {
			   html+=hw[j];
		   }
           html+='</span></td>';
        }
        html+='</tr>';
    }
    return html;
  }