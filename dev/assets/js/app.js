$(function() {

const promoText = {
 2001:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2001 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2002:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2002 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2003:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2003 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2004:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2004 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2005:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2005 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2006:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2006 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2007:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2007 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
 2008:{text:"<h3>Расширение возможностей</h3> <span>24 августа 2008 г</span> <p>ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.</p>"},
}

let count = 8,
    len = track.getTotalLength(),
    seg = len / (count + 1),
    pos = seg,
    targets = [seg],
    currentTarget = targets[0];

svg.innerHTML += Array(count).fill(0).map((e, i) => {
      let len = seg * (i + 1), p = track.getPointAtLength(len);
      return "<g transform=translate("+[p.x, p.y]+") class"+(i?'':'=active')+">" +
             "  <circle data-len="+len+" r=11 data-year="+(2001+i)+"></circle>" +
             "  <rect rx=5 ry=5 x=-20 y=16 width=40 height=19></rect>" +
             "  <text y=30 id='"+(2001+i)+"'>"+(2001+i)+"</text>"+
             "</g>";
    }).join('');

render();

function render() {
  let dp = currentTarget - pos;

  if (Math.abs(dp) < 1 && targets.length) {
  	currentTarget = targets.shift();
    dp = currentTarget - pos;
  }

  pos += Math.abs(dp) < 1 ? 0 : Math.sign(dp);

  let p1 = track.getPointAtLength(pos),
      p2 = track.getPointAtLength(pos + 1),
      a = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  ship.setAttribute("transform", "translate("+p1.x+","+p1.y+")rotate("+a+")");
  requestAnimationFrame(render);
}

let circles = document.querySelectorAll('circle');
circles.forEach(c => c.onclick = e => {
  circles.forEach(c1 => c1.parentNode.classList.toggle('active', c === c1));
  targets.push(+c.dataset.len);
  let root = c.parentElement;
  let text =  root.lastChild;
  let div = document.getElementById('text');
      div.innerHTML = promoText[text.textContent].text;
       var x=document.getElementById('select')
       x.options[x.selectedIndex].text= text.textContent;
       $(x).niceSelect('update');

});


//Select
$(document).ready(function() {
  $('select').niceSelect();
});
  $('#select').on("change", function () {
            $('circle[data-year="' + this.value + '"]').trigger('click');
        });


})

$(window).on("load",function(){
  $(".list").mCustomScrollbar({
  	 theme:"minimal-dark",
        scrollButtons:{
          enable:false
        }
  });
});
