let botao=document.querySelectorAll(".negrito");
for(let i=0;i<botao.length;i++)
{
  botao[i].addEventListener("click",function(e){
    let paragrafo=e.currentTarget.parentNode.querySelectorAll("span");
    paragrafo[1].classList.toggle("aparece");

  });
}
