/*
    @Author Emanuel Teixeira
    @Date: 30/01/2014

    Edited by Shakil Choudhury to allow nested accordions.
*/
(function($) {
  $.fn.accordion = function(duration) {
    if (duration == null) duration = 200;
    this.find("[data-type='accordion-section']").each(function() {
      $(this).attr("draggable", "true");
      var content = $(this).find("[data-type='accordion-section-body']");
      var title = $(this).find("[data-type='accordion-section-title']");
      title.addClass("header-default");
      content.addClass("content-default");
      title.append("<i class='fa icon-circle-right right'></i>");
      title.click(function() {
        if (content.css("display") == "none") {
          $(this)
            .parent()
            .parent()
            .find("[data-type='accordion-section-title']")
            .each(function() {
              $(this).removeClass("header-active");
              $(this)
                .find("i")
                .removeClass("icon-circle-down");
              $(this)
                .find("i")
                .addClass("icon-circle-right");
            });
          $(this).addClass("header-active");
          $(this)
            .parent()
            .parent()
            .find("[data-type='accordion-section-body']")
            .each(function() {
              $(this).hide(duration);
            });
          content.show(duration);
          title.find("i").addClass("icon-circle-down");
          title.find("i").removeClass("icon-circle-right");
        } else {
          content.hide(duration);
          title.removeClass("header-active");
          title.find("i").removeClass("icon-circle-down");
          title.find("i").addClass("icon-circle-right");
        }
      });

      title.keypress(function(e) {
        if (!(e.which === 32 || e.which === 13)) return;
        e.preventDefault();
        if (content.css("display") == "none") {
          $(this)
            .parent()
            .parent()
            .find("[data-type='accordion-section-title']")
            .each(function() {
              $(this).removeClass("header-active");
              $(this)
                .find("i")
                .removeClass("icon-circle-down");
              $(this)
                .find("i")
                .addClass("icon-circle-right");
            });
          $(this).addClass("header-active");
          $(this)
            .parent()
            .parent()
            .find("[data-type='accordion-section-body']")
            .each(function() {
              $(this).hide(duration);
            });
          content.show(duration);
          title.find("i").addClass("icon-circle-down");
          title.find("i").removeClass("icon-circle-right");
        } else {
          content.hide(duration);
          title.removeClass("header-active");
          title.find("i").removeClass("icon-circle-down");
          title.find("i").addClass("icon-circle-right");
        }
      });
    });

    /*Make search*/
    $("[data-type='accordion-search']").keyup(function() {
      var expression = false;
      var value = $(this).val();
      var finder = "";
      if (value.indexOf('"') > -1 && value.lastIndexOf('"') > 0) {
        finder = value.substring(
          eval(value.indexOf('"')) + 1,
          value.lastIndexOf('"')
        );
        expression = true;
      }
      $("[data-type='accordion-section']").each(function() {
        var title = $(this)
          .find("[data-type='accordion-section-title']")
          .text();
        if (expression) {
          if (
            $(this)
              .text()
              .toLowerCase()
              .search(finder.toLowerCase()) == -1
          ) {
            $(this).hide();
          } else {
            $(this).show();
          }
        } else {
          if (title.toLowerCase().indexOf(value.toLowerCase()) < 0) {
            $(this).hide();
          } else {
            $(this).show();
          }
        }
      });
    });

    /**/
    $("[data-type='accordion-ordering']").each(function() {
      var ordering = $(this).attr("ordering");
      if (ordering == "") ordering = "asc";
      if (ordering == "asc") {
        $(this).append("<i class='fa fa-2x fa-sort-alpha-asc'></i>");
      } else {
        $(this).append("<i class='fa fa-2x fa-sort-alpha-desc'></i>");
      }
      $(this).click(function() {
        var sections = $("[data-type='accordion-section']");
        for (i = 0; i < sections.length; i++) {
          for (x = 0; x < sections.length; x++) {
            var str1 = sections
              .eq(x)
              .find("[data-type='accordion-section-title']")
              .text();
            var str2 = sections
              .eq(x + 1)
              .find("[data-type='accordion-section-title']")
              .text();
            if (ordering == "desc") {
              if (str2 > str1) {
                sections.eq(x).before(sections.eq(x + 1));
              }
            } else {
              if (str2 < str1) {
                sections.eq(x).before(sections.eq(x + 1));
              }
            }
            sections = $("[data-type='accordion-section']");
          }
        }
      });
    });
    $("[data-type='accordion-filter']").change(function() {
      var selected = $(this)
        .select()
        .val();
      $("[data-type='accordion-section']").each(function() {
        $(this).show();
        if (selected != "default") {
          if ($(this).attr("data-filter") != selected) {
            if ($(this).css("display") == "block") $(this).hide();
          }
        }
      });
    });
    return this;
  };
})(jQuery);
