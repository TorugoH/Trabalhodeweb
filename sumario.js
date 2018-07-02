let titulos=document.querySelectorAll("main h1[id],h2[id]");
let conth1=0,conth2=0;
let navdiv=document.querySelector("nav>div");
let nav=document.querySelector("nav");
for(let i=0; i<titulos.length; i++){
  let navHtml="<div ";
  if(titulos[i].tagName=="H1"){
    conth1++;
    conth2=0;
    navHtml+="class=\"nv-um\">"+conth1;
  }
  else{
    conth2++;
    navHtml+="class=\"nv-dois\">"+conth1+"."+conth2;
  }
  navHtml+=". <a href=\"#"+titulos[i].id+"\">"+titulos[i].innerHTML+"</a></div>";
  navdiv.innerHTML+=navHtml;
}
nav.style.width=nav.clientWidth+"px";
function esconder(e){
  if(navdiv.classList.toggle("oculto")){
    e.currentTarget.innerHTML="Mostrar";
  }
  else{
    e.currentTarget.innerHTML="Esconder";
  }
}
document.querySelector("#lermais-nav").addEventListener("click",esconder);

let navas=document.querySelectorAll("nav a");
let cab=document.querySelector("header");
function saiforanan(x){
  let float=parseFloat(x);
  return isNaN(float)? 0 : float;
}
function saidafrentecabecalho(){
  setTimeout(function(){
    window.scrollBy(0,-cab.offsetHeight-saiforanan(cab.style.top));
  },1);
}
for(let i=0; i<navas.length; i++){
  navas[i].addEventListener("mouseup",saidafrentecabecalho);
}

let videoaulas=document.querySelectorAll("#iframes li>span");
function mostrarIFrame(e){
  let atual=e.currentTarget;
  if(atual.nextElementSibling.classList.toggle("oculto")){
    atual.firstElementChild.innerHTML="Mostrar...";
  }
  else{
    atual.firstElementChild.innerHTML="Esconder";
  }
}
for(let i=0; i<videoaulas.length; i++){
  videoaulas[i].addEventListener("click",mostrarIFrame);
}
