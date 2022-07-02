(function (menuConfig) {
    var config = {
        wrapperSelector: '.navbar',
        buttonSelector: '.navbar__toggle',
        menuSelector: '.navbar__menu',
        mobileMenuOverlayClass: 'navbar_mobile_overlay',
        hiddenElementClass: 'is-hidden',
        openedMenuClass: 'is-active',
        noScrollClass: 'no-scroll',
        themeCacheKey: 'w-theme',
        lightThemeClass: 'light-theme',
        darkThemeClass: 'dark-theme',
    };

    const tocList = document.querySelector('.toc__list');
    function init() {
        initMobileMenuOverlay();
        initThemeConfig();
        initOnHandleTocOpenAndCollapse();
    };

    function initMobileMenuOverlay() {
        var menuWrapper = document.createElement('div');
        menuWrapper.classList.add(config.mobileMenuOverlayClass);
        menuWrapper.classList.add(config.hiddenElementClass);
        var menuContentHTML = document.querySelector(config.menuSelector).outerHTML;
        menuWrapper.innerHTML = menuContentHTML;
        document.body.appendChild(menuWrapper);
        var button = document.querySelector(config.buttonSelector);
        if(button != null){
            button.addEventListener('click', function () {
                menuWrapper.classList.toggle(config.hiddenElementClass);
                button.classList.toggle(config.openedMenuClass);
                button.setAttribute('aria-expanded', button.classList.contains(config.openedMenuClass));
                if (button.classList.contains(config.openedMenuClass)) {
                    document.documentElement.classList.add(config.noScrollClass);
                } else {
                    document.documentElement.classList.remove(config.noScrollClass);
                }
            });
        }
    }

    // Dyanamic theme
    var changeThemeBtn = document.querySelectorAll('#toggle-theme');

    function initThemeConfig() {
        var currentThemeConfig = localStorage.getItem(config.themeCacheKey);
        if (currentThemeConfig) {
            onChangeIconTheme(currentThemeConfig);
        } else {
            onChangeIconTheme("light");
        }

        if (currentThemeConfig == "light") {
            document.body.classList.add(config.lightThemeClass);
        } else {
            document.body.classList.add(config.darkThemeClass);
        }

        if(changeThemeBtn != null){
            changeThemeBtn.forEach(item => {
                if(item!=null){
                item.addEventListener("click", function () {
                    document.body.classList.toggle(config.darkThemeClass);
        
                    let theme = "dark";
                    if (document.body.classList.contains(config.lightThemeClass)) {
                        theme = "dark";
                        document.body.className = "";
                        document.body.classList.add(config.darkThemeClass);
                    } else {
                        theme = "light";
                        document.body.className = "";
                        document.body.classList.add(config.lightThemeClass);
                    }
                    onChangeIconTheme(theme);
                    localStorage.setItem(config.themeCacheKey, theme);
                });
                }
            });
        }
    }

    function initOnHandleTocOpenAndCollapse() {
        const toggle = document.getElementById('toc__toggle');
        if(toggle != null){
            toggle.addEventListener('click', function () {
                const isExpand = tocList.classList.contains('expand');
                    if (isExpand) {
                        tocList.classList.remove('expand');
                        tocList.classList.add('collapse');
                    } else {
                        tocList.classList.add('expand');
                        tocList.classList.remove('collapse');
                    }
            });
        }
    }

    function onChangeIconTheme(theme) {
        var icon = document.querySelectorAll('#icon-theme');
        const utterances = document.querySelector('.utterances-frame');

        if (theme == "light") {
            const message = {
                type: 'set-theme',
                theme: 'github-light'
            };
            if (utterances != null) {
                utterances.contentWindow.postMessage(message, 'https://utteranc.es');
            }
            icon.forEach(item => {
                item.removeAttribute("d");
                item.setAttribute("d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z");
            });
        } else {
            const message = {
                type: 'set-theme',
                theme: 'photon-dark'
            };
            if (utterances != null) {
                utterances.contentWindow.postMessage(message, 'https://utteranc.es');
            }
            icon.forEach(item => {
                item.removeAttribute("d");
                item.setAttribute("d", "M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z");
            });
            
        }
    }

    // Init all functions
    init();
})(window.themeMenuConfig);

var visibleElement = function (el, correction) {
    var rect = el.getBoundingClientRect()
    var top = rect.top
    var height = rect.height + (correction || 0)
    var el = el.parentNode

    // Check if bottom of the element is off the page
    if (rect.bottom < 0) return false
    // Check its within the document viewport
    if (top > document.documentElement.clientHeight) return false
    do {
        rect = el.getBoundingClientRect()
        if (top <= rect.bottom === false) return false
        // Check if the element is out of view due to a container scrolling
        if ((top + height) <= rect.top) return false
        el = el.parentNode
    } while (el != document.body)
    return true
};