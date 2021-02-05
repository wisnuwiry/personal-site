// Dyanamic theme
var btn = document.getElementById('toggle-theme');
var currentTheme = localStorage.getItem("w-theme");

if (currentTheme == "light") {
    document.body.classList.add("light-theme");
}else{
    document.body.classList.add("dark-theme");
}

changeIconTheme(currentTheme);

btn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    let theme = "dark";
    if (document.body.classList.contains("light-theme")) {
        theme = "dark";
        document.body.className = "";
        document.body.classList.add("dark-theme");
    } else {
        theme = "light";
        document.body.className = "";
        document.body.classList.add("light-theme");
    }
    changeIconTheme(theme);
    localStorage.setItem("w-theme", theme);
});

function changeIconTheme(theme) {
    var icon = document.getElementById('icon-theme');
    const utterances = document.querySelector('.utterances-frame');

    if (theme == "light") {
        const message = {
            type: 'set-theme',
            theme: 'github-light'
        };
        if(utterances != null){
            utterances.contentWindow.postMessage(message, 'https://utteranc.es');
        }
        icon.removeAttribute("d");
        icon.setAttribute("d", "M12.34,2.02C6.59,1.82,2,6.42,2,12c0,5.52,4.48,10,10,10c3.71,0,6.93-2.02,8.66-5.02C13.15,16.73,8.57,8.55,12.34,2.02z");
    } else {
        const message = {
            type: 'set-theme',
            theme: 'photon-dark'
        };
        if(utterances != null){
            utterances.contentWindow.postMessage(message, 'https://utteranc.es');
        }
        icon.removeAttribute("d");
        icon.setAttribute("d", "M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z");
    }
}

var content = document.getElementById('article');

window.addEventListener('scroll', ()=>{
    if(content != null){
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = content.scrollHeight;
        var scrolled = (winScroll / height) * 100;
        if(scrolled <= 100){
            document.getElementById("indicator").style.width = scrolled + "%";
        }else{
            document.getElementById("indicator").style.width = "100%";
        }
    }
});

(function (menuConfig) {
    var defaultConfig = {
        mobileMenuMode: 'overlay',
        animationSpeed: 300,
        submenuWidth: 300,
        doubleClickTime: 500,
        mobileMenuExpandableSubmenus: false,
        wrapperSelector: '.navbar',
        buttonSelector: '.navbar__toggle',
        menuSelector: '.navbar__menu',
        submenuSelector: '.navbar__submenu',
        mobileMenuSidebarLogoSelector: null,
        relatedContainerForOverlayMenuSelector: null,
        separatorItemClass: 'is-separator',
        parentItemClass: 'has-submenu',
        submenuLeftPositionClass: 'is-left-submenu',
        submenuRightPositionClass: 'is-right-submenu',
        mobileMenuOverlayClass: 'navbar_mobile_overlay',
        mobileMenuSubmenuWrapperClass: 'navbar__submenu_wrapper',
        mobileMenuSidebarClass: 'navbar_mobile_sidebar',
        mobileMenuSidebarOverlayClass: 'navbar_mobile_sidebar__overlay',
        hiddenElementClass: 'is-hidden',
        openedMenuClass: 'is-active',
        noScrollClass: 'no-scroll',
        relatedContainerForOverlayMenuClass: 'is-visible'
    };
    var config = {};
    Object.keys(defaultConfig).forEach(function (key) {
        config[key] = defaultConfig[key];
    });
    if (typeof menuConfig === 'object') {
        Object.keys(menuConfig).forEach(function (key) {
            config[key] = menuConfig[key];
        });
    }

    function init() {
        if (!document.querySelectorAll(config.wrapperSelector).length) {
            return;
        }
        initSubmenuPositions();
        if (config.mobileMenuMode === 'overlay') {
            initMobileMenuOverlay();
        } else if (config.mobileMenuMode === 'sidebar') {
            initMobileMenuSidebar();
        }
    };

    function initSubmenuPositions() {
        var submenuParents = document.querySelectorAll(config.wrapperSelector + ' .' + config.parentItemClass);
        for (var i = 0; i < submenuParents.length; i++) {
            submenuParents[i].addEventListener('mouseenter', function () {
                var submenu = this.querySelector(config.submenuSelector);
                var itemPosition = this.getBoundingClientRect().left;
                var widthMultiplier = 2;
                if (this.parentNode === document.querySelector(config.menuSelector)) {
                    widthMultiplier = 1;
                }
                if (config.submenuWidth !== 'auto') {
                    var submenuPotentialPosition = itemPosition + (config.submenuWidth * widthMultiplier);
                    if (window.innerWidth < submenuPotentialPosition) {
                        submenu.classList.add(config.submenuRightPositionClass);
                    } else {
                        submenu.classList.add(config.submenuLeftPositionClass);
                    }
                } else {
                    var submenuPotentialPosition = 0;
                    var submenuPosition = 0;
                    if (widthMultiplier === 1) {
                        submenuPotentialPosition = itemPosition + submenu.clientWidth;
                    } else {
                        submenuPotentialPosition = itemPosition + this.clientWidth + submenu.clientWidth;
                    }
                    if (window.innerWidth < submenuPotentialPosition) {
                        submenu.classList.add(config.submenuRightPositionClass);
                        submenuPosition = -1 * submenu.clientWidth;
                        if (widthMultiplier === 1) {
                            submenuPosition = 0;
                        }
                        submenu.style.left = submenuPosition + 'px';
                        submenu.style.right = this.clientWidth + 'px';
                    } else {
                        submenu.classList.add(config.submenuLeftPositionClass);
                        submenuPosition = this.clientWidth;
                        if (widthMultiplier === 1) {
                            submenuPosition = 0;
                        }
                        submenu.style.left = submenuPosition + 'px';
                    }
                }
                submenu.setAttribute('aria-hidden', false);
            });
            submenuParents[i].addEventListener('mouseleave', function () {
                var submenu = this.querySelector(config.submenuSelector);
                submenu.removeAttribute('style');
                submenu.setAttribute('aria-hidden', true);
            });
        }
    }

    function initMobileMenuOverlay() {
        var menuWrapper = document.createElement('div');
        menuWrapper.classList.add(config.mobileMenuOverlayClass);
        menuWrapper.classList.add(config.hiddenElementClass);
        var menuContentHTML = document.querySelector(config.menuSelector).outerHTML;
        menuWrapper.innerHTML = menuContentHTML;
        document.body.appendChild(menuWrapper);
        if (config.mobileMenuExpandableSubmenus) {
            wrapSubmenusIntoContainer(menuWrapper);
            initToggleSubmenu(menuWrapper);
        }
        var button = document.querySelector(config.buttonSelector);
        button.addEventListener('click', function () {
            var relatedContainer = document.querySelector(config.relatedContainerForOverlayMenuSelector);
            menuWrapper.classList.toggle(config.hiddenElementClass);
            button.classList.toggle(config.openedMenuClass);
            button.setAttribute('aria-expanded', button.classList.contains(config.openedMenuClass));
            if (button.classList.contains(config.openedMenuClass)) {
                document.documentElement.classList.add(config.noScrollClass);
                if (relatedContainer) {
                    relatedContainer.classList.add(config.relatedContainerForOverlayMenuClass);
                }
            } else {
                document.documentElement.classList.remove(config.noScrollClass);
                if (relatedContainer) {
                    relatedContainer.classList.remove(config.relatedContainerForOverlayMenuClass);
                }
            }
        });
    }

    function initMobileMenuSidebar() {
        var menuWrapper = document.createElement('div');
        menuWrapper.classList.add(config.mobileMenuSidebarClass);
        menuWrapper.classList.add(config.hiddenElementClass);
        var menuContentHTML = '';
        if (config.mobileMenuSidebarLogoSelector !== null) {
            menuContentHTML = document.querySelector(config.mobileMenuSidebarLogoSelector).outerHTML;
        }
        menuContentHTML += document.querySelector(config.menuSelector).outerHTML;
        menuWrapper.innerHTML = menuContentHTML;
        var menuOverlay = document.createElement('div');
        menuOverlay.classList.add(config.mobileMenuSidebarOverlayClass);
        menuOverlay.classList.add(config.hiddenElementClass);
        document.body.appendChild(menuOverlay);
        document.body.appendChild(menuWrapper);
        if (config.mobileMenuExpandableSubmenus) {
            wrapSubmenusIntoContainer(menuWrapper);
            initToggleSubmenu(menuWrapper);
        }
        menuWrapper.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        menuOverlay.addEventListener('click', function () {
            menuWrapper.classList.add(config.hiddenElementClass);
            menuOverlay.classList.add(config.hiddenElementClass);
            button.classList.remove(config.openedMenuClass);
            button.setAttribute('aria-expanded', false);
            document.documentElement.classList.remove(config.noScrollClass);
        });
        var button = document.querySelector(config.buttonSelector);
        button.addEventListener('click', function () {
            menuWrapper.classList.toggle(config.hiddenElementClass);
            menuOverlay.classList.toggle(config.hiddenElementClass);
            button.classList.toggle(config.openedMenuClass);
            button.setAttribute('aria-expanded', button.classList.contains(config.openedMenuClass));
            document.documentElement.classList.add(config.noScrollClass);
        });
    }

    function wrapSubmenusIntoContainer(menuWrapper) {
        var submenus = menuWrapper.querySelectorAll(config.submenuSelector);
        for (var i = 0; i < submenus.length; i++) {
            var submenuWrapper = document.createElement('div');
            submenuWrapper.classList.add(config.mobileMenuSubmenuWrapperClass);
            submenus[i].parentNode.insertBefore(submenuWrapper, submenus[i]);
            submenuWrapper.appendChild(submenus[i]);
        }
    }

    function initToggleSubmenu(menuWrapper) {
        var parents = menuWrapper.querySelectorAll('.' + config.parentItemClass);
        for (var i = 0; i < parents.length; i++) {
            parents[i].addEventListener('click', function (e) {
                e.stopPropagation();
                var submenu = this.querySelector('.' + config.mobileMenuSubmenuWrapperClass);
                var content = submenu.firstElementChild;
                if (submenu.classList.contains(config.openedMenuClass)) {
                    var height = content.clientHeight;
                    submenu.style.height = height + 'px';
                    setTimeout(function () {
                        submenu.style.height = '0px';
                    }, 0);
                    setTimeout(function () {
                        submenu.removeAttribute('style');
                        submenu.classList.remove(config.openedMenuClass);
                    }, config.animationSpeed);
                } else {
                    var height = content.clientHeight;
                    submenu.classList.add(config.openedMenuClass);
                    submenu.style.height = '0px';
                    setTimeout(function () {
                        submenu.style.height = height + 'px';
                    }, 0);
                    setTimeout(function () {
                        submenu.removeAttribute('style');
                    }, config.animationSpeed);
                }
            });
            var childNodes = parents[i].children;
            for (var j = 0; j < childNodes.length; j++) {
                if (childNodes[j].tagName === 'A') {
                    childNodes[j].addEventListener('click', function (e) {
                        var lastClick = parseInt(this.getAttribute('data-last-click'), 10);
                        var currentTime = +new Date();
                        if (isNaN(lastClick)) {
                            e.preventDefault();
                            this.setAttribute('data-last-click', currentTime);
                        } else if (lastClick + config.doubleClickTime <= currentTime) {
                            e.preventDefault();
                            this.setAttribute('data-last-click', currentTime);
                        } else if (lastClick + config.doubleClickTime > currentTime) {
                            e.stopPropagation();
                        }
                    });
                }
            }
        }
    }
    init();
})(window.themeMenuConfig);


function enableStickyToc() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            if (entry.intersectionRatio > 0) {
                if (delay == true) {
                    let element = document.querySelectorAll(".tableOfContentContainer li.active");
                    if(element != null){
                        element.forEach((e)=>{
                            e.classList.remove("active");
                        });
                    }
                    delay = false;
                }
                let element = document.querySelector(`.tableOfContentContainer li a[href="#${id}"]`);
                if (element) {
                    element.parentElement.classList.add("active");   
                }
            } else {
                if (document.querySelectorAll(".tableOfContentContainer li.active").length == 1) {
                    delay = true;
                } else {
                    let element = document.querySelector(`.tableOfContentContainer li a[href="#${id}"]`);
                    if (element) {
                        element.parentElement.classList.remove("active");
                    }
                }
            }
        });
    });
    var delay = false;
    document.querySelectorAll(".content h2[id]").forEach((section) => {
        observer.observe(section);
    });
    document.querySelectorAll(".content h3[id]").forEach((section) => {
        observer.observe(section);
    });
}

// Instant Page
let t,e;const n=new Set,o=document.createElement("link"),i=o.relList&&o.relList.supports&&o.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,s="instantAllowQueryString"in document.body.dataset,a="instantAllowExternalLinks"in document.body.dataset,r="instantWhitelist"in document.body.dataset,c="instantMousedownShortcut"in document.body.dataset,d=1111;let l=65,u=!1,f=!1,m=!1;if("instantIntensity"in document.body.dataset){const t=document.body.dataset.instantIntensity;if("mousedown"==t.substr(0,"mousedown".length))u=!0,"mousedown-only"==t&&(f=!0);else if("viewport"==t.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType&&navigator.connection.effectiveType.includes("2g"))||("viewport"==t?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(m=!0):"viewport-all"==t&&(m=!0));else{const e=parseInt(t);isNaN(e)||(l=e)}}if(i){const n={capture:!0,passive:!0};if(f||document.addEventListener("touchstart",function(t){e=performance.now();const n=t.target.closest("a");if(!h(n))return;v(n.href)},n),u?c||document.addEventListener("mousedown",function(t){const e=t.target.closest("a");if(!h(e))return;v(e.href)},n):document.addEventListener("mouseover",function(n){if(performance.now()-e<d)return;const o=n.target.closest("a");if(!h(o))return;o.addEventListener("mouseout",p,{passive:!0}),t=setTimeout(()=>{v(o.href),t=void 0},l)},n),c&&document.addEventListener("mousedown",function(t){if(performance.now()-e<d)return;const n=t.target.closest("a");if(t.which>1||t.metaKey||t.ctrlKey)return;if(!n)return;n.addEventListener("click",function(t){1337!=t.detail&&t.preventDefault()},{capture:!0,passive:!1,once:!0});const o=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1,detail:1337});n.dispatchEvent(o)},n),m){let t;(t=window.requestIdleCallback?t=>{requestIdleCallback(t,{timeout:1500})}:t=>{t()})(()=>{const t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){const n=e.target;t.unobserve(n),v(n.href)}})});document.querySelectorAll("a").forEach(e=>{h(e)&&t.observe(e)})})}}function p(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||t&&(clearTimeout(t),t=void 0)}function h(t){if(t&&t.href&&(!r||"instant"in t.dataset)&&(a||t.origin==location.origin||"instant"in t.dataset)&&["http:","https:"].includes(t.protocol)&&("http:"!=t.protocol||"https:"!=location.protocol)&&(s||!t.search||"instant"in t.dataset)&&!(t.hash&&t.pathname+t.search==location.pathname+location.search||"noInstant"in t.dataset))return!0}function v(t){if(n.has(t))return;const e=document.createElement("link");e.rel="prefetch",e.href=t,document.head.appendChild(e),n.add(t)}