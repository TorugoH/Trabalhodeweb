let botaoDiv=document.querySelector("#fat button");
let botaoMmc=document.querySelector("#mmc-mdc button");
let botoesLM=document.querySelectorAll(".lermais");

function mudarDetalhesLM(nDoBotao,novoTxt){
  let botaoLM=botoesLM[nDoBotao];
  botaoLM.detalhes=novoTxt;
  if(botaoLM.estado==-1){
    botaoLM.innerHTML="Mostrar"+botaoLM.detalhes+"...";
  }
}

// Fatoração e divisores

function fat(){
  // Forma fatorada
  let input=document.querySelector("#fat input");
  let saida=document.querySelector("#ff");
  let n=parseInt(input.value),nums=0;
  let strings=[],valoresDeN=[n],fatores=[];
  function acharExp(x){
    let exp=0;
    if(x>Math.sqrt(n)){
      exp=1;
      x=n;
      fatores.push(x);
      n=1;
      valoresDeN.push(n);
    }
    else{
      while(n%x===0){
        n/=x;
        fatores.push(x);
        valoresDeN.push(n);
        exp++;
      }
    }
    if(exp!=0){
      strings.push(x+"^"+exp);
      nums++;
    }
  }
  acharExp(2);
  for(let atual=3; n>1; atual+=2){
    acharExp(atual);
  }
  let saidaFinal="";
  for(let i=0; i<nums-1; i++){
    saidaFinal+=strings[i]+" * ";
  }
  saidaFinal+=strings[nums-1];
  saida.innerHTML=saidaFinal;

  // Divisores
  let qtdDeFatores=fatores.length;
  let divDosDivs=document.querySelector("#divs");
  let divs=[1,fatores[0]];
  let nDeDivs=2;
  let divsAnterior=1;
  let levas=[[fatores[0]]];
  for(let i=1; i<qtdDeFatores; i++){
    let divsDessaLeva=[];
    function acrescentarDiv(x){
      divsDessaLeva.push(x);
      divs.push(x);
    }
    if(fatores[i]==fatores[i-1]){
      for(let j=0; j<divsAnterior; j++){
        acrescentarDiv(divs[nDeDivs-divsAnterior+j]*fatores[i]);
      }
    }
    else{
      for(let j=0; j<nDeDivs; j++){
        acrescentarDiv(divs[j]*fatores[i]);
      }
      divsAnterior=nDeDivs;
    }
    levas.push(divsDessaLeva);
    nDeDivs=divs.length;
  }
  divs.sort(function(a,b){return a-b});
  divDosDivs.innerHTML="";
  for(let i=0; i<nDeDivs-1; i++){
    divDosDivs.innerHTML+=(divs[i]+", ");
  }
  divDosDivs.innerHTML+=divs[nDeDivs-1];
  mudarDetalhesLM(0," ("+nDeDivs+")");

  // Procedimento
  let tabela=document.querySelector("#p-divs tbody");
  let htmlTab="<tr><td></td><td></td><td>1</td></tr>";
  for(let i=0; i<qtdDeFatores; i++){
    htmlTab+="<tr><td>"+valoresDeN[i]+"</td><td>"+fatores[i]+"</td><td>";
    let tamLeva=levas[i].length;
    for(let j=0; j<tamLeva-1; j++){
      htmlTab+=(levas[i][j]+", ");
    }
    htmlTab+=levas[i][tamLeva-1];
    htmlTab+="</td></tr>";
  }
  htmlTab+="<tr><td>"+valoresDeN[qtdDeFatores]+"</td></tr>";
  tabela.innerHTML=htmlTab;
  mudarDetalhesLM(1," ("+qtdDeFatores+ (qtdDeFatores==1? " divisão)":" divisões)"));
}
botaoDiv.addEventListener("click",fat);


// MMC e MDC

function mmcmdc(){
  let input=document.querySelector("#mmc-mdc input");
  let nums=input.value.split(" ");
  let tam=nums.length;
  let saidaMmc=document.querySelector("#mmc");
  let saidaMdc=document.querySelector("#mdc");
  let saidaMmcFf=document.querySelector("#mmc-ff");
  let saidaMdcFf=document.querySelector("#mdc-ff");
  let tabela=document.querySelector("#p-mmc-mdc tbody");
  let fatores=[],fatoresComuns=[],resultadosDivs=[[]];
  let stringsMmc=[],stringsMdc=[];
  let mmc=1,mdc=1;
  for(let i=0; i<tam; i++){
    nums[i]=parseInt(nums[i]);
    if(nums[i]===0||isNaN(nums[i])){
      document.querySelector("#erro-mmc-mdc").classList.remove("oculto");
      aviso.classList.add("oculto");
      saidaMmc.innerHTML="";
      saidaMdc.innerHTML="";
      saidaMmcFf.innerHTML="";
      saidaMdcFf.innerHTML="";
      tabela.innerHTML="";
      mudarDetalhesLM(2,"");
      return;
    }
    resultadosDivs[0][i]=nums[i];
  }
  document.querySelector("#erro-mmc-mdc").classList.add("oculto");

  // Cálculo
  function temAlg1qNaoE1(){
    for(let i=0; i<tam; i++){
      if(nums[i]!=1&&nums[i]!=-1){
        return true;
      }
    }
    return false;
  }
  function dividirPor(x){
    let expMmc=0,expMdc=0;
    while(true){
      let conseguiu=0;
      for(let i=0; i<tam; i++){
        if(nums[i]%x===0){
          nums[i]/=x;
          conseguiu++;
        }
      }
      if(conseguiu>0){
        resultadosDivs.push(Array.from(nums));
        fatores.push(x);
        mmc*=x;
        expMmc++;
        if(conseguiu==tam){
          fatoresComuns.push(x);
          mdc*=x;
          expMdc++;
        }
      }
      else{
        break;
      }
    }
    if(expMmc>0){
      stringsMmc.push(x+"^"+expMmc);
      if(expMdc>0){
        stringsMdc.push(x+"^"+expMdc);
      }
    }
  }
  dividirPor(2);
  for(let atual=3; temAlg1qNaoE1(); atual+=2){
    dividirPor(atual);
  }

  // Exibe resultados
  saidaMmc.innerHTML=mmc;
  saidaMdc.innerHTML=mdc;
  if(mmc>1000000000000000){
    document.querySelector("#aviso-mmc").classList.remove("oculto");
  }
  else{
    document.querySelector("#aviso-mmc").classList.add("oculto");
  }
  let tamMmc=stringsMmc.length;
  let htmlMmc="";
  for(let i=0; i<tamMmc-1; i++){
    htmlMmc+=stringsMmc[i]+" * ";
  }
  htmlMmc+=stringsMmc[tamMmc-1];
  saidaMmcFf.innerHTML=htmlMmc;
  let tamMdc=stringsMdc.length;
  if(tamMdc==0){
    saidaMdcFf.innerHTML="Não se aplica para 1";
  }
  else{
    let htmlMdc="";
    for(let i=0; i<tamMdc-1; i++){
      htmlMdc+=stringsMdc[i]+" * ";
    }
    htmlMdc+=stringsMdc[tamMdc-1];
    saidaMdcFf.innerHTML=htmlMdc;
  }

  // Exibe procedimento
  let htmlTab="";
  let tamTab=fatores.length;
  let comClasse=0;
  for(let i=0; i<tamTab; i++){
    htmlTab+="<tr><td>";
    for(let j=0; j<tam-1; j++){
      htmlTab+=(resultadosDivs[i][j]+", ");
    }
    htmlTab+=resultadosDivs[i][tam-1]+"</td><td"
    if(fatores[i]==fatoresComuns[comClasse]){
      htmlTab+=" class=\"fator-comum\"";
      comClasse++;
    }
    htmlTab+=">"+fatores[i]+"</td></tr>";
  }
  htmlTab+="<tr><td>";
  for(let i=0; i<tam-1; i++){
    htmlTab+=(resultadosDivs[tamTab][i]+", ");
  }
  htmlTab+=resultadosDivs[tamTab][tam-1]+"</td></tr>";
  tabela.innerHTML=htmlTab;
  mudarDetalhesLM(2," ("+tamTab+ (tamTab==1? " divisão)":" divisões)"));
}
botaoMmc.addEventListener("click",mmcmdc);


// Encontrar equação

let botaoEq=document.querySelector("#acha-func button");
function eq(){
  let inputs=
    [document.querySelectorAll(".campo-de-inputs tr:nth-child(odd) input"),
    document.querySelectorAll(".campo-de-inputs tr:nth-child(even) input")];
  let saidaD=document.querySelector("#equacao-d");
  let saidaF=document.querySelector("#equacao-f");
  let dec=[[0,0],[0,0]],num=[[0,0],[0,0]],den=[[0,0],[0,0]];
  let ad,bd,anum,aden,bnum,bden;
  for(let i=0; i<2; i++){
    for(let j=0; j<2; j++){
      if(inputs[i][j].value.indexOf("/")==-1){
        dec[i][j]=parseFloat(inputs[i][j].value);
        num[i][j]=parseInt(inputs[i][j].value.replace('.', ''));
        den[i][j]=(dec[i][j]===0? 1: Math.round(num[i][j]/dec[i][j]));
      }
      else{
        let fracao=inputs[i][j].value.split("/");
        dec[i][j]=parseFloat(fracao[0])/parseFloat(fracao[1]);
        num[i][j]=parseInt(fracao[0]);
        den[i][j]=parseInt(fracao[1]);
      }
    }
  }
  if(dec[0][0]==dec[0][1]){
    document.querySelector("#erro-equacao").classList.remove("oculto");
    saidaD.innerHTML="";
    saidaF.innerHTML="";
    document.querySelector("#p-equacao").innerHTML="";
    mudarDetalhesLM(3,"");
    return;
  }
  document.querySelector("#erro-equacao").classList.add("oculto");

  // Decimal
  function arred(x,c){
    let pot=Math.pow(10,c);
    return Math.round(x*pot)/pot;
  }
  function formataB(b){
    if(b<0){
      return " - "+(-b);
    }
    if(b>0){
      return " + "+b;
    }
    return "";
  }
  ad=(dec[1][1]-dec[1][0])/(dec[0][1]-dec[0][0]);
  bd=dec[1][0]-ad*dec[0][0];
  ad=arred(ad,5);
  bd=arred(bd,5);
  if(ad==0){
    saidaD.innerHTML="f(x) = "+bd;
  }
  else{
    saidaD.innerHTML="f(x) = "+(ad!=1 ? ad : "")+"x"+formataB(bd);
  }

  // Fração
  let mmc,mdc,denRes,numRes;
  function mmcmdc(roedor){
    let v=Array.from(roedor);
    mmc=1,mdc=1;
    let tam=v.length;
    function temAlg1qNaoE1(){
      for(let j=0; j<tam; j++){
        if(v[j]!=1&&v[j]!=-1&&v[j]!=0){
          return true;
        }
      }
      return false;
    }
    function dividirPor(x){
      while(true){
        let conseguiu=0;
        for(let j=0; j<tam; j++){
          if(v[j]%x===0&&v[j]!==0){
            v[j]/=x;
            conseguiu++;
          }
        }
        if(conseguiu>0){
          mmc*=x;
          if(conseguiu==tam){
            mdc*=x;
          }
        }
        else{
          break;
        }
      }
    }
    dividirPor(2);
    for(let a=3; temAlg1qNaoE1(); a+=2){
      dividirPor(a);
    }
  }

  for(let i=0; i<2; i++){
    for(let j=0; j<2; j++){
      mmcmdc([num[i][j],den[i][j]]);
      num[i][j]/=mdc;
      den[i][j]/=mdc;
    }
  }

  function simp(){
    if(denRes<0){
      denRes*=-1;
      numRes*=-1;
    }
    if(numRes==0){
      denRes=1;
    }
    else{
      mmcmdc(Array.from([numRes,denRes]));
      numRes/=mdc;
      denRes/=mdc;
    }
  }
  function somaFracao(nums,dens,sinais){
    mmcmdc(dens);
    numRes=0;
    denRes=mmc;
    for(let k=0; k<nums.length; k++){
      numRes+=((mmc*nums[k])/dens[k])*sinais[k];
    }
    simp();
  }
  function multFracao(nums,dens,sinais){
    numRes=1,denRes=1;
    for(let k=0; k<nums.length; k++){
      if(sinais[k]==1){
        numRes*=nums[k];
        denRes*=dens[k];
      }
      else{
        numRes*=dens[k];
        denRes*=nums[k];
      }
    }
    simp();
  }
  function fracaoToString(num,den,classeExtra){
    if(classeExtra===undefined){
      classeExtra="";
    }
    else{
      classeExtra=" "+classeExtra;
    }
    return "<span class=\"fracao"+classeExtra+"\"><span>"+num+"</span><span>"+den+"</span></span>";
  }
  let linhasProc=["Função afim: y = ax + b",
  "a = "+fracaoToString("y<sub>2</sub> - y<sub>1</sub>","x<sub>2</sub> - x<sub>1</sub>")];
  linhasProc.push("a = "+fracaoToString(num[1][1],den[1][1],"parenteses-abre")+" - "+fracaoToString(num[1][0],den[1][0],"parenteses-fecha")
    +" ÷ "+fracaoToString(num[0][1],den[0][1],"parenteses-abre")+" - "+fracaoToString(num[0][0],den[0][0],"parenteses-fecha"));
  somaFracao(num[1],den[1],[-1,1]);
  anum=Array.from([numRes,denRes]);
  somaFracao(num[0],den[0],[-1,1]);
  aden=Array.from([numRes,denRes]);
  linhasProc.push("a = "+fracaoToString(anum[0],anum[1],"parenteses-abre parenteses-fecha")
    +" ÷ "+fracaoToString(aden[0],aden[1],"parenteses-abre parenteses-fecha"));
  multFracao(anum,aden,[1,-1]);
  anum=numRes;
  aden=denRes;
  linhasProc.push("a = "+fracaoToString(anum,aden));
  linhasProc.push("y<sub>1</sub> = "+fracaoToString(anum+"x<sub>1</sub>",aden)+" + b, ou y<sub>2</sub> = "+fracaoToString(anum+"x<sub>2</sub>",aden)+" + b");
  linhasProc.push("Usando x<sub>1</sub> e y<sub>1</sub>:");
  linhasProc.push(fracaoToString(num[1][0],den[1][0])+" = "+fracaoToString(anum,aden)+" × "+fracaoToString(num[0][0],den[0][0])+" + b");
  multFracao([anum,num[0][0]],[aden,den[0][0]],[1,1]);
  linhasProc.push(fracaoToString(num[1][0],den[1][0])+(numRes>0? " - ": " + ")+fracaoToString(Math.abs(numRes),denRes)+" = b");
  somaFracao([num[1][0],numRes],[den[1][0],denRes],[1,-1]);
  bnum=numRes;
  bden=denRes;
  linhasProc.push("b = "+fracaoToString(bnum,bden));

  let saidaFHtml="f(x) =";
  let jaimprimiu=false;
  function formataFracao(num,den){
    if(num<0){
      num*=-1;
      saidaFHtml+=" - ";
    }
    else{
      saidaFHtml+=(jaimprimiu? " + ": " ");
    }
    if(den==1){
      saidaFHtml+=(num+(jaimprimiu? "": "x"));
    }
    else{
      saidaFHtml+=fracaoToString(num+(jaimprimiu? "": "x"),den);
    }
    jaimprimiu=true;
  }
  formataFracao(anum,aden);
  formataFracao(bnum,bden);
  saidaF.innerHTML=saidaFHtml;

  // Procedimento
  linhasProc.push("y = "+fracaoToString(anum+"x",aden)+(bnum>=0? " + ": " - ")+fracaoToString(Math.abs(bnum),bden)+" , ou "+saidaFHtml);
  let pequacaoHtml="",linhas=linhasProc.length;
  for(let i=0; i<linhas; i++){
    pequacaoHtml+="<div>"+linhasProc[i]+"</div>";
  }
  document.querySelector("#p-equacao").innerHTML=pequacaoHtml;
  mudarDetalhesLM(3," ("+linhas+(linhas==1? " linha)": " linhas)"));
}
botaoEq.addEventListener("click",eq);


// Ler mais

function maisoumenos(e){
  let botaoLM=e.currentTarget;
  if(botaoLM.previousElementSibling.classList.toggle("oculto")){
      botaoLM.innerHTML="Mostrar"+botaoLM.detalhes+"...";
  }
  else{
    botaoLM.innerHTML="Esconder";
  }
  botaoLM.estado*=-1;
}
let qtd=botoesLM.length;
for(let i=0; i<qtd; i++){
  botoesLM[i].detalhes="";
  botoesLM[i].estado=-1;
  botoesLM[i].addEventListener("click",maisoumenos);
}

// oi hasan parabéns se você chegou até aqui
