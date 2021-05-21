function direc(img) {
  return `./images/` + img + `.png`;
}
changeColorGlobal();
//burger
$(`.head__burger`).on(`click`, function () {
  if ($(this).attr(`active`) == `false`) return;
  $(this).attr(`active`, false);
  setTimeout(() => {
    $(this).attr(`active`, true);
  }, 500);
  if ($(this).hasClass(`cross`)) {
    down.call($(this));
  } else {
    $(this).addClass(`cross`);
    $(`.head__info`).slideDown(500).css({ display: "flex" });
  }
});
$(window).on(`resize`, function () {
  if ($(this).width() > 860) down.call($(`.head__burger`));
});
function down() {
  $(this).removeClass(`cross`);
  $(`.head__info`).slideUp(500);
}
//burger
$(`[slider]`).each(function () {
  new Slider($(this));
});
$(`.blog__video-cont`).on(`mouseenter`, function () {
  $(`.blog__centry`)
    .show(500)
    .css({ bottom: 0, display: `flex` })
    .animate({ bottom: `20px` }, 500);
});
$(`.blog__video-cont`).on(`mouseleave`, function () {
  $(`.blog__centry`).hide(500).animate({ bottom: `0px` }, 500);
});
new Time(`video`);
new Time(`audio`);
$(window).on(`keydown`, function (key) {
  if (key.which == 32 || key.which == 37 || key.which == 39)
    key.preventDefault();
});
//append
var elemMass = [];
for (let i = 1; i < 16; i++) {
  elemMass.push(
    $(`<div class="portfolio__el">
<img src="./images/nature${i}.jpg" alt="main">
<div class="portfolio__fon center abs" main>
  <div class="portfolio__elem beet2">
    <div class="portfolio__blocks beet">
      <div class="center" postMain>
        <img src="./images/eye.png" alt="">
      </div>
      <div class="center" postMain>
        <img src="./images/zep.png" alt="">
      </div>
    </div>
    <p>Lorem ipsum </p>
  </div>
</div>
</div>`)
  );
}
for (let i = 1; i < 7; i++) {
  $(`.servic__grido`).append(`
  <div class="servic__blocko">
          <img src="./images/forest${i}.jpg" alt="main">
          <div class="servic__fon2 center abs" main>
            <div class="servic__container beet2">
              <div class="servic__block beet">
                <div class="cube" rarely>
                  <img src="./images/eye.png" alt="" >
                </div>
                <div class="cube" postMain>
                  <img src="./images/zep.png" alt="" >
                </div>
              </div>
              <p class="servic__lorem">Lorem ipsum </p>
            </div>
          </div>
        </div>
  `);
}
for (let i = 0; i < 9; i++) {
  var text = "";
  if (i >= 5) text = "hide-text";
  $(`.home__grid-text`).append(`
  <div class="${text}">
  <p>Headline</p>
  <p>Duis dapibus aliquam mi, eget euismod sem scelerisque ut.
    Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in
    neque dictum blandit. Proin in iaculis neque. Pellentesque habitant
     morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque.
       Pellentesque habitant morbi tristique senectus et netus et malesuada
       fames ac turpis egestas. </p>
</div>
  `);
}
elemMass
  .sort(() => {
    return 0.5 - Math.random();
  })
  .forEach(function (elem) {
    $(`.portfolio__grid`).append(elem);
  });
$(`.portfolio__control`)
  .children()
  .on(`click`, function () {
    if (
      $(this).attr(`active`) == `true` ||
      $(`.portfolio__control`).attr(`time`) == `true`
    )
      return;
    $(`.portfolio__control`).attr(`time`, true);
    setTimeout(() => {
      $(`.portfolio__control`).removeAttr(`time`);
    }, 500);
    $(`.portfolio__grid`)
      .removeClass([`grid2`, `grid3`, `grid4`])
      .addClass($(this).attr(`type`));
    $(`.portfolio__grid`).children().addClass(`rotate`);
    setTimeout(() => {
      $(`.portfolio__grid`).children().removeClass(`rotate`);
    }, 450);
    $(this).siblings().attr(`active`, false);
    $(this).attr(`active`, true);
    $(this)
      .siblings()
      .removeAttr(`postMain`)
      .removeAttr(`style`)
      .attr(`main`, ``);
    $(this).removeAttr(`main`).attr(`postMain`, ``);
    changeColorGlobal(true);
  });
$(`.portfolio__click`)
  .children()
  .on(`click`, function () {
    if ($(this).attr(`type`) == `designs`) {
      $(`.portfolio__design-flex`).show(400).css({ display: "flex" });
      $(`.portfolio__previews`).hide(400);
    } else {
      $(`.portfolio__design-flex`).hide(400);
      $(`.portfolio__previews`).show(400);
    }
    $(this).siblings().removeAttr(`postMain`).removeAttr(`style`);
    $(this).attr(`postMain`, ``);
    changeColorGlobal(true);
  });
$(`[alt="plus"]`)
  .attr(`active`, false)
  .on(`click`, function () {
    if ($(this).attr(`time`)) return;
    const stat = JSON.parse($(this).attr(`active`));
    $(this).attr(`time`, true);
    $(this).addClass(`rotate`);
    setTimeout(() => {
      $(this).removeAttr(`time`);
      $(this).removeClass(`rotate`);
    }, 300);
    if (stat) {
      $(this).attr(`src`, direc(`plus`));
      $(this).parent().parent().find(`.servic__text`).slideUp(300);
    } else {
      $(this).attr(`src`, direc(`minus`));
      $(this).parent().parent().find(`.servic__text`).slideDown(300);
    }
    $(this).attr(`active`, !stat);
  });
$(`.servic__tab`).on(`click`, function () {
  if ($(this).hasClass(`white`)) return;
  $(this).siblings().removeClass(`white`);
  $(this).addClass(`white`);
  const ind_ = $(this).attr(`index`),
    par_ = $(this).parent().parent();
  par_.find(`[text]`).children().hide();
  par_.find(`[text]`).find(`[index="${ind_}"]`).show();
  if (par_.find(`.servic__img`).length != 0) {
    $(`.servic__img`).children().hide().removeClass(`opac-anim`);
    $(`.servic__img`).find(`[index="${ind_}"]`).show().addClass(`opac-anim`);
  }
});
var changeColor = [
  [
    $(`[hover]`),
    function () {
      $(this).addClass(`tran`).attr(`rarely`, ``);
      changeColorGlobal(true);
    },
    function () {
      if ($(this).attr(`active`) == `true`) return;
      $(this).removeClass(`tran`).removeAttr(`rarely`).removeAttr(`style`);
    },
  ],
  [
    $(`.team__el`),
    function () {
      $(this)
        .find(`[main]`)
        .fadeIn(300)
        .css({ display: "flex" })
        .addClass(`rotate2`);
      setTimeout(() => {
        $(this).find(`[main]`).removeClass(`rotate2`);
      }, 300);
    },
    function () {
      $(this)
        .find(`[main]`)
        .fadeOut(300)
        .removeClass(`rotate2`)
        .addClass(`rotate2`);
      setTimeout(() => {
        $(this).find(`[main]`).removeClass(`rotate2`);
      }, 300);
    },
  ],
  [
    $(`.servic__blocko`),
    function () {
      const img = $(this).find(`[alt="main"]`);
      img
        .removeClass(`bigger`)
        .addClass(`smaller`)
        .css({ visibility: "hidden" });
      $(this).find(`.servic__fon2`).css({ visibility: "visible" });
    },
    function () {
      const img = $(this).find(`[alt="main"]`);
      img.addClass(`bigger`).css({ visibility: "visible" });
      setTimeout(() => {
        img.removeClass(`smaller`);
        $(this).find(`.servic__fon2`).css({ visibility: "hidden" });
      }, 300);
    },
  ],
  [
    $(`.servic__grid-el`),
    function () {
      $(this).find(`.button`).attr(`postMain`, ``).addClass(`tran`);
      $(this).attr(`main`, ``).addClass(`tran`);
      changeColorGlobal(true);
    },
    function () {
      $(this).find(`.button`).removeAttr(`postMain`, ``).removeAttr(`style`);
      $(this).removeAttr(`main`, ``).removeAttr(`style`);
    },
  ],
  [
    $(`.home__itemEl`),
    function () {
      const src_ = $(this).find(`img`).attr(`src`);
      $(this).find(`img`).attr(`src`, src_.replace(`Gray`, ``));
    },
    function () {
      const src_ = $(this).find(`img`).attr(`src`).split(``);
      src_.splice(src_.lastIndexOf(`.`), 0, `Gray`);
      $(this).find(`img`).attr(`src`, src_.join(``));
    },
  ],
].forEach(function (elem) {
  elem[0].on(`mouseenter`, elem[1]);
  elem[0].on(`mouseleave`, elem[2]);
});
$(`[hover]`)
  .each(function (index) {
    $(this).attr(`index`, index);
    $($(`.click-el`)[index]).attr(`index`, index);
  })
  .on(`click`, function () {
    if ($(this).attr(`active`) == `true` || $(this).attr(`time`)) return;
    $(this).attr(`active`, `true`).attr(`time`, true);
    setTimeout(() => {
      $(this).removeAttr(`time`);
    }, 2000);
    $(this)
      .siblings()
      .attr(`active`, false)
      .removeAttr(`style`)
      .removeAttr(`rarely`);
    $(`.click-el[active="true"]`)
      .removeClass(`plast-size-up`)
      .addClass(`plast-size-down`)
    setTimeout(() => {
      $(`.click-el[active="true"]`).hide().attr(`active`, `false`)
      $(`.click-el[index="${$(this).attr(`index`)}"]`).show()
        .attr(`active`, true)
        .removeClass(`plast-size-down`)
        .addClass(`plast-size-up`);
    }, 1000);
  });