let header=document.querySelector(".menu-logo");
let bordaClicavel=document.querySelector("hr");
let estado=1;
function muda(){
  let altura=header.offsetHeight-16-bordaClicavel.offsetHeight;
  let desloc,tempo=100,i=0;
  if(estado==1){
    bordaClicavel.title="Expandir cabeçalho";
    desloc=0;
  }
  else{
    bordaClicavel.title="Retrair cabeçalho";
    desloc=-altura;
  }
  let parar=setInterval(
  function(){
    if(i<tempo){
      desloc+=estado*altura*(1/tempo);
      header.style.top=desloc+"px";
      i++;
    }
    else{
      clearInterval(parar);
    }
  }, 1);
  estado*=-1;
}
bordaClicavel.addEventListener("mousedown",muda);
