---
title: Personal Site Blog dan Portofolio
date: 2020-03-21T17:33:17+07:00
authorBox: false
tags: ["web", "hugo", "personal site", "blog"]
images: [
  https://i.ibb.co/DbJ5J52/featured.png,
  https://i.ibb.co/TM7pc2B/analisis-web-wisnuwiry.png
]
---

### Overview

**Wisnuwiry site** ini adalah sebuah **open source blogging  dan porotoflio platform** yang dibuat dengan Hugo (Static site generator).

![Personal site Wisnuwiry](https://i.ibb.co/DbJ5J52/featured.png)

Berikut hasil analisis lighthouse performa dari hasil karya saya.
![Hasil Analisis My Site Wisnuwiry](https://i.ibb.co/TM7pc2B/analisis-web-wisnuwiry.png)

Untuk costumize pada file `config.toml` disitu bisa custom sesuka hati kalian.

### Feature:

- Fast Loading
- Available PWA
- Full Responsive
- Lazy load image
- Bisa Deploy langsung ke netlify
- etc

### Detail or Download 
Anda bisa melihat hasil project saya dan jika ingin kontribusi, ataupun ingin membuat web seperti saya ini bisa check di github saya:

<center><a href="//github.com/wisnuwiry/blog-v2" class="btn">Show Detail</a></center>

Mungkin teman-teman ingin mencoba hasil karya ku ini, tapi tidak tahu gimana cara setup nya, dan dokumentasinya bagaimana?

Sekarang saya akan menjelaskan sedikit bagaimana cara menggunakanya.


### Basic Setup:

Pastikan teman-teman sudah menginstall hugo terlebih dahulu ya, bila ingin referensinya bisa lihat di [Membuat Blog dengan Hugo](/post/membuat-blog-dengan-hugo/) bagaimana cara install hugo dan menggunakanya.

Pertama-tama untuk setup clone dulu repository saya:

```bash
git clone https://github.com/wisnuwiry/blog-v2.git
cd blog-v2
hugo server
```

Dan ini bisa Anda langsung deploy ke netlify, dengan cara `Fork`  dulu repository saya, kemudian import di netlify.

Wow, sudah jadi website secara lokal sudah bisa Anda jalankan, salamat....

### Basic Configuration
Semua configurasi pada website ini pada file `confic.toml` berikut contoh confignya:

```toml
baseURL                       = "https://example.com/" # your domain site
languageCode                  = "id" 
title                         = "Your name site"
summaryLength                 = 5

[Author] # Used in authorbox
  name                        = "Your name"
  bio                         = "Your Bio personal"
  avatar                      = "img/avatar.webp" # your Avatar 

[Params]
  description                 = "Default descriptiion your sute." # Site Description. Used in meta description
  images                      = ["img/avatar.webp"]
  copyright                   = "Wisnuwiry" # Copyright holder, otherwise will use .Site.Title
  opengraph                   = true # Enable OpenGraph if true
  twitter_cards               = true # Enable Twitter Cards if true
  mainSections                = ["post"] # Set main page sections
  projectSections             = ["project"] # Set main page sections
  dateFormat                  = "January 02, 2006" # Change the format of dates
  # customCSS                 = ["css/custom.css"] # Include custom CSS files
  customJS                    = []
  mainMenuAlignment           = "right" # Align main menu (desktop version) to the right side
  authorbox                   = true # Show authorbox at bottom of single pages if true
  comments                    = true # Enable comments for all site pages
  related                     = true # Enable Related content for single pages
  relatedMax                  = 5
  mathjax                     = false # Enable MathJax for all site pages
  hideNoPostsWarning          = false # Don't show no posts empty state warning in main page, if true
  fontUnit                    = "em"
  largestFontSize             = 2.5
  smallestFontSize            = 1
  googleSearchConsole         = "" # Google search console code
  GoogleAnalytics             = "" # Google analisi code
  fb_admins                   = "" # Your facebook admin
  fb_app_id                   = "" # Your facebook app id


[Params.Hero]
  title                       = "A Personal Site By WisnuWiry"
  desc                        = "Welcome to my Blog :)"

[Params.Entry]
  meta                        = ["date", "categories"] # Enable meta fields in given order
  toc                         = true # Enable Table of Contents
  tocOpen                     = false # Open Table of Contents block. Optional

[Params.Featured]
  previewOnly                 = false # Show only preview featured image

[Params.Breadcrumb]
  enable                      = true # Enable breadcrumb block globally
  homeText                    = "Home" # Home node text

[Params.Social]
  twitter                     = "" #username your social media ex: wisnuwiry
  telegram                    = ""
  instagram                   = ""
  linkedin                    = ""
  github                      = ""
  medium                      = ""

[Params.Share] # Entry Share block
  facebook                    = true
  twitter                     = true
  reddit                      = true
  telegram                    = true
  linkedin                    = true
  pinterest                   = true

# Web App Manifest settings
# https://www.w3.org/TR/appmanifest/
# https://developers.google.com/web/fundamentals/web-app-manifest/
[Params.Manifest]
  name                        = "Wisnuwiry"
  shortName                   = "Wisnuwiry"
  display                     = "standalone"
  startUrl                    = "/?utm_source=homescreen"
  backgroundColor             = "#FFFFFF"
  themeColor                  = "#0d2538"
  description                 = "Personal Site By Wisnuwiry"
  orientation                 = "portrait"
  scope                       = "/"

[outputFormats]
  [outputFormats.MANIFEST]
    mediaType                 = "application/json"
    baseName                  = "manifest"
    isPlainText               = true
    notAlternative            = true

[outputs]
  home                        = ["HTML", "RSS", "MANIFEST"]

enableRobotsTXT               = true

# Pagination
Paginate                      = 3
 

# Code
[markup]
  # defaultMarkdownHandler    = "blackfriday"
  [markup.goldmark]
    [markup.goldmark.extensions]
      definitionList          = true
      footnote                = true
      linkify                 = true
      strikethrough           = true
      table                   = true
      taskList                = true
      typographer             = true
    [markup.goldmark.parser]
      attribute               = true
      autoHeadingID           = true
      autoHeadingIDType       = "github"
    [markup.goldmark.renderer]
      hardWraps               = false
      unsafe                  = true
      xhtml                   = false
  [markup.blackFriday]
    angledQuotes              = false
    footnoteAnchorPrefix      = ""
    footnoteReturnLinkContents= ""
    fractions                 = true
    hrefTargetBlank           = false
    latexDashes               = true
    nofollowLinks             = false
    noreferrerLinks           = false
    plainIDAnchors            = true
    skipHTML                  = false
    smartDashes               = true
    smartypants               = true
    smartypantsQuotesNBSP     = false
    taskLists                 = true
  [markup.highlight]
    codeFences                = true
    guessSyntax               = false
    hl_Lines                  = ""
    lineNoStart               = 1
    lineNos                   = false
    lineNumbersInTable        = false
    noClasses                 = false
    style                     = "dracula"
    tabWidth                  = 4
  [markup.tableOfContents]
    endLevel = 3
    ordered = false
    startLevel = 2
```

Jadi teman-teman tidak perlu edit file langsung cuma custom config ini saja.

### Membuat sebuah artikel baru

Untuk semua content pada website ini tersedia pada folder `content/`.

Anda harus mengetikkan command ini pada terminal ataupun cmd.

```bash
hugo new post/nama-artikel-yang-ingin-dibuat/index.md
```

Berikut contoh simple parameter untuk config tiap file:

```toml
---
title: "Your title Article"
date: 2020-03-21T17:33:17+07:00
draft: false
tags: ["web", "hugo"]
---
```

dan ini untuk sebuah page/halaman:

```toml
---
title: "Your title page"
menu: main
toc: false
authorBox: false
breadcrumb: false
comments: false
share: false
contact: true
page: true
---
```

Sekian penjelasan dari saya, bila kurang jelas bisa comment dibawah, atau bisa langsung hubungi saya. Selamat mencoba.