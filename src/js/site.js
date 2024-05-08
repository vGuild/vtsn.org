var homepage = {
  id: '#homepage',
  isMobile:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 992,
  scrollToTopBtn: {
    showClass: 'show',
    heightShow: 900,
    toggleAttr: 'data-toggle="scroll-to-top"',
  },
  scrollTo: {
    attr: 'data-toggle="scroll-to"',
    target: 'data-target',
    linkTarget: 'href',
  },
};

var handleScrollToTopButton = function () {
  'use strict';

  var elmTriggerList = [].slice.call(
    document.querySelectorAll('[' + homepage.scrollToTopBtn.toggleAttr + ']')
  );

  document.onscroll = function () {
    var doc = document.documentElement;
    var totalScroll =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    var elmList = elmTriggerList.map(function (elm) {
      if (totalScroll >= homepage.scrollToTopBtn.heightShow) {
        if (!elm.classList.contains(homepage.scrollToTopBtn.showClass)) {
          elm.classList.add(homepage.scrollToTopBtn.showClass);
        }
      } else {
        elm.classList.remove(homepage.scrollToTopBtn.showClass);
      }
    });

    var elm = document.querySelectorAll(homepage.id)[0];

    if (totalScroll > 0) {
      elm.classList.add(homepage.header.hasScrollClass);
    } else {
      elm.classList.remove(homepage.header.hasScrollClass);
    }
  };

  var elmList = elmTriggerList.map(function (elm) {
    elm.onclick = function (e) {
      e.preventDefault();

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
};

// Website controller
var webApp = (function () {
  'use strict';

  return {
    //main function
    init: function () {
      this.initComponent();
      //this.initSidebar();
      //this.initTopNav();
      //this.initAppLoad();
    },
    initAppLoad: function () {
      //document.querySelector('body').classList.add(homepage.init.class);
    },
    initSidebar: function () {
      //handleSidebarMenu();
      //handleSidebarScrollMemory();
    },
    initTopNav: function () {
      //handleUnlimitedTopNavRender();
      //handleTopNavSubMenu();
      //handleTopNavMobileToggle();
    },
    initComponent: function () {
      //handleScrollbar();
      handleScrollToTopButton();
      //handleScrollTo();
      //handleCardAction();
      //handelTooltipPopoverActivation();
      //handleToggleClass();
      //handleThemePanel();
      //handleCssVariable();
    },
    scrollTop: function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  };
})();

// Initialize the website controller
document.addEventListener('DOMContentLoaded', function () {
  webApp.init();
});
