class Time {
  constructor(elem) {
    this.elem = document.querySelector(elem);
    this.par = $(this.elem).parent();
    this.elem.addEventListener(`timeupdate`, () => this.pass());
    const scro = this.par.find(`[scroll]`);
    this.elem.addEventListener(`loadedmetadata`, () => {
      this.par
        .find(`[sum-time]`)
        .text(`00 : ` + Math.floor(this.elem.duration));
      this.par.find(`[curr-time]`).text(`00 : 00`);
    });
    scro.on(`click`, (click) => {
      this.elem.currentTime = Math.floor(
        ((click.clientX - scro.offset().left) / scro.width()) *
          this.elem.duration
      );
      this.pass();
    });
    this.par.find(`[control]`).on(`click`, () => this.process());
    if (elem == `video`) {
      $(`.blog__video`).on(`click`, () => this.process());
      $(window).on(`keyup`, (key) => {
        var current_ = this.elem.currentTime;
        if (key.which == 32) this.process();
        else if (key.which == 37) current_ -= 5;
        else if (key.which == 39) current_ += 5;
        if (current_ < 0) current_ = 0;
        else if (current_ > this.elem.duration) current_ = this.elem.duration;
        this.elem.currentTime = current_;
      });
      $(`#resize`).on(`click`, () => {
        const active_ = JSON.parse($(`#resize`).attr(`active`));
        if (active_) {
          $(`.blog__trailer`).removeClass(`full-screen`);
          $(`.black-fon`).hide();
          $(`#resize`).attr(`src`, direc(`size`));
          this.pass();
        } else {
          $(`.blog__trailer`).addClass(`full-screen`);
          $(`.black-fon`).show();
          $(`#resize`).attr(`src`, direc(`sizeClose`));
          this.pass();
        }
        $(`#resize`).attr(`active`, !active_);
      });
    } else {
      this.elem.volume = 0.5;
      $(`#audioLoud`).on(`click`, function () {
        const active_ = JSON.parse($(this).attr(`active`));
        active_
          ? $(`.blog__regulate`).addClass(`close`).removeClass(`open`)
          : $(`.blog__regulate`)
              .addClass(`open`)
              .removeClass(`close`)
              .css({ display: "flex" });
        setTimeout(() => {
          active_ ? $(`.blog__regulate`).hide() : $(`.blog__regulate`).show();
        }, 300);
        $(this).attr(`active`, !active_);
      });
      $(`.blog__lino`).on(`change`, () => {
        this.elem.volume = +$(`.blog__lino`).val() / 100;
        $(`.blog__inf2 p`).text($(`.blog__lino`).val() + ` %`);
      });
    }
  }
  pass() {
    var time_ = Math.floor(this.elem.currentTime);
    if (time_ < 10) time_ = `0` + time_;
    this.par.find(`[curr-time]`).text(`00 : ` + time_);
    this.par.find(`[progress]`).css({
      width: `${(this.elem.currentTime / this.elem.duration) * 100}%`,
    });
    var left_ =
      (this.elem.currentTime / this.elem.duration) *
        this.par.find(`[scroll]`).width() -
      25;
    left_ = left_ < 0 ? 0 : left_;
    this.par.find(`[ball]`).css({ left: left_ });
  }
  process() {
    this.pass();
    const butt_ = this.par.find(`[control]`);
    var stop_ = JSON.parse(butt_.attr(`stopped`));
    butt_.animate({ opacity: 0 }, 200);
    setTimeout(() => {
      butt_.animate({ opacity: 1 }, 200);
      if (stop_) {
        butt_.attr(`src`, direc(`pause`));
        this.elem.play();
      } else {
        butt_.attr(`src`, direc(`play`));
        this.elem.pause();
      }
    }, 200);
    butt_.attr(`stopped`, !stop_);
  }
}
var colors = {
  green: {
    main: `#70c570`,
    postMain: ` #e36b2c`,
    rarely: `#6cb16c`,
  },
  darkGreen: {
    main: `#76c7c0`,
    postMain: `#e8645a`,
    rarely: `#62a29e`,
  },
  purple: {
    main: `#a65980`,
    postMain: `#26b9e1`,
    rarely: `#9d557a`,
  },
}
class Slider {
  constructor(el) {
    this.slider = el;
    this.mass = el.find(`[element]`);
    el.find(`[way]`).on(`click`, (e) => {
      if ($(e.target).attr(`alt`)) this.click($(e.target).parent(), true);
      else this.click($(e.target), true);
    });
    if (el.attr(`set-lines`)) {
      for (let i=0;i<this.mass.length;i++) {
        el.find(`[show]`).append($(`<div class="sliderLine" index="${i}"></div>`))
      }
      el.find(`[show]`)
        .children()
        .on(`click`, (e) => this.click($(e.target).attr(`index`), false));
    }
    el.find(`[container]`).empty();
    el.find(`[container]`).append($(this.mass[1]).attr(`index`, 1));
    el.find(`[index="${this.count}"]`).attr(`postMain`,``);
  }
  count = 1;
  timer = true;
  click(elem, fromButt) {
    if (!this.timer || elem == this.count) return;
    this.timer = false;
    setTimeout(() => {
      this.timer = true;
    }, 500);
    var animate = {},
      set = {};
    if (fromButt) {
      if (elem.attr(`way`) == `left`) {
        this.count--;
        if (this.count < 0) this.count = this.mass.length-1;
        fast_(false);
      } else {
        this.count++;
        if (this.count > this.mass.length-1) this.count = 0;
        fast_(true);
      }
    } else {
      fast_(elem > this.count);
      this.count = +elem;
    }
    this.slider.find(`[element]`).animate(animate, 250);
    setTimeout(() => {
      const con_ = this.slider.find(`[container]`);
      con_.empty();
      con_.append(
        $(this.mass[this.count])
          .attr(`index`, this.count)
          .css(set)
          .animate({ left: 0 }, 250)
      );
    }, 250);
    this.slider
      .find(`[show]`)
      .children()
      .removeAttr(`style`)
      .removeAttr(`postMain`);
    this.slider.find(`[index]`).removeAttr(`postMain`)
    this.slider
      .find(`[index="${this.count}"]`)
      .removeClass(`tran`)
      .attr(`postMain`,``)
      .addClass(`tran`);
    function fast_(go) {
      if (go) {
        animate.left = `-100%`;
        set.left = `100%`;
      } else {
        animate.left = `100%`;
        set.left = `-100%`;
      }
    }
    if (this.slider.attr(`color-all`)) {
    var ind_ = this.slider.find(`[index]`).attr(`index`),
      color_;
    if (ind_ == 0) color_ = `green`;
    else if (ind_ == 1) color_ = `darkGreen`;
    else color_ = `purple`;
    this.slider.attr(`color-all`, color_);
    }
    changeColorGlobal();
  }
}
function changeColorGlobal(stop=false) {
  setTimeout(()=>{
    const mainColor=$(`.home__slider`).attr(`color-all`);
    var mass=[`postMain`,`main`,`rarely`].forEach(function (elem) {
      $(`[`+elem+`]`).each(function () {
        if ($(this).attr(`type`)==`text`) {
          $(this).css({color:colors[mainColor][elem]})
        } else {
          $(this).css({background:colors[mainColor][elem]})
        }
      })
    })
    if (stop) return;
    $(`[imgColor]`).each(function (elem) {
      var num=$(this).attr(`src`).split(``)[13] , faze="";
      num= (+num) ? num : ``;
      if (mainColor==`darkGreen`) faze=`-faze2`
      else if (mainColor==`purple`) faze=`-faze3`
      $(this).attr(`src`,`./images/duga`+num+faze+`.png`)
    })
    $(`body`).addClass(mainColor);
  },100);
}
