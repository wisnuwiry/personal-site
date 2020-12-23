# Hugo Personal Site
[![state](https://img.shields.io/badge/state-stable-green.svg)]() [![release](https://img.shields.io/github/release/wisnuwiry/personal-site.svg)](https://github.com/wisnuwiry/personal-site/releases) [![license](https://img.shields.io/github/license/wisnuwiry/personal-site.svg)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/19d195ca-0cec-478e-9cfa-fa9527644a60/deploy-status)](https://app.netlify.com/sites/wisnuwiry/deploys)

This is web made by Hugo static site generator, [Live Preview](https://wisnuwiry.space), more reference to example use this theme please check [my blog repo](https://github.com/wisnuwiry/blog-v2)

<!---
## Instant Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wisnuwiry/personal-site)
--->

## Test Result:
![Test Result with Lighthouse](https://i.ibb.co/vvksSnW/test-result.png)


## Preview

|Light|Dark|
|-----|-----|
|![](https://i.ibb.co/BCzMSNX/Screenshot-1.png)![](https://i.ibb.co/f1RCWr4/Screenshot-1.png)|![](https://i.ibb.co/ZzHJ2Gd/light.png)![](https://i.ibb.co/tMkDs3N/Screenshot-1.png)|


## Setup in your workspace

Before starting, please be sure that you have [installed Hugo](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) and [created a new site](https://gohugo.io/getting-started/quick-start/#step-2-create-a-new-site). After that, you ready to install **MyBlog**.

Create new project hugo

```bash
hugo new site name_site
```
Go to folder themes

```bash
cd name_site/themes
```

In your Hugo site themes directory, run:

```bash
git clone https://github.com/wisnuwiry/personal-site
```

Or, if you don’t plan to make any significant changes, but want to track and update the theme, you can add it as a git submodule via the following command:

```bash
git submodule add https://github.com/wisnuwiry/personal-site
```

Next, open `config.toml` in the base of the Hugo site and ensure the theme option is set to `MyBlog`:

```
theme = "personal-site"
```

### Example Config

```
baseURL                       = "https://wisnuwiry.space/"
languageCode                  = "id"
title                         = "Wisnuwiry"
theme                         = "personal-site"
summaryLength                 = 10

[Author] # Used in authorbox
  name                        = "Wisnu G. Saputra"
  bio                         = "Flutter | Mobile Tech Enthusiast | Software Engineer at KodingWorks. Saya juga suka blogging dan mempelajari hal teknologi baru."
  avatar                      = "img/avatar.png"
  job                         = "Software Engineer"
  gender                      = "male"
  email                       = "wisnuwiry@gmail.com"


[Params]
  description                 = "Sebuah catatan dan blog pribadi saya. Saya juga akan membagi tentang pengalaman saya dan teknologi-teknolgi yang saya gunakan/pelajari atau yang sedang populer." # Site Description. Used in meta description
  images                      = ["img/avatar.png"]
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
  googleSearchConsole         = ""
  GoogleAnalytics             = ""
  fb_admins                   = 
  fb_app_id                   = 
  paginateLength              = 5
  adsenseId                   = 
  customSearchId              = "004021659876411083349:a2ysxpichpc"


[Params.Hero]
  title                       = "A Personal Site By WisnuWiry"
  desc                        = "Welcome to my Blog :)"

[Params.Entry]
  meta                        = ["date", "categories"] # Enable meta fields in given order
  toc                         = true # Enable Table of Contents
  tocOpen                     = false # Open Table of Contents block. Optional

[Params.Featured]
  previewOnly                 = false # Show only preview featured image

[Params.Comments]
  repository                  = "wisnuwiry/blog-v2"

# Navigation bar
[menu]

[[menu.main]]
identifier = "Post"
pre = "📝"
url = "/post" 
weight = 1 

[[menu.main]]
identifier = "Snippet"
pre = "⚒️"
url = "/snippet" 
weight = 2 

[[menu.main]]
identifier = "Project"
pre = "🚧"
url = "/project" 
weight = 3 

[[menu.main]]
identifier = "About"
pre = "😃"
url = "/about" 
weight = 4

[[menu.main]]
identifier = "Contact"
pre = "🤙"
url = "/contact" 
weight = 5

[Params.Breadcrumb]
  enable                      = true # Enable breadcrumb block globally
  homeText                    = "Home" # Home node text

[Params.Social]
  twitter                     = "wisnuwiry"
  telegram                    = "wisnuwiry"
# instagram                   = "wisnuwiry"
  linkedin                    = "wisnu-saputra"
  github                      = "wisnuwiry"
  gitlab                      = "wisnuwiry"
  medium                      = "wisnuwiry"

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
  backgroundColor             = "#8dc153"
  themeColor                  = "#1da1f2"
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
    endLevel                  = 6
    ordered                   = false
    startLevel                = 2
```

### Create new Post

```
hugo new content/post/name_post.md
```

**Example Param:**

```
---
title: "Atomic Design"
date: 2020-10-29T10:22:10+07:00
images: [
    https://miro.medium.com/max/1000/1*V5oi-JrH4RlEQuYdVrQXig.png,
    https://i.ibb.co/BTRn8m6/Untitled.png,
]
tags: ["atomic","design"]
---
```

### Create new Page

```bash
hugo new content/about.md
```

Example params:

```
---
title: About 😃
menu: main
toc: false
authorBox: false
breadcrumb: false
comments: false
share: false
page: true
---
```


## Showcase
1. [Wisnuwiry Blog](https://wisnuwiry.space)

## Release Notes
[Show more..](CHANGELOG.md)

## Maintainers
1. @wisnuwiry
    
    [![Wisnuwiry](https://github.com/wisnuwiry.png?size=38)](https://github.com/wisnuwiry)


## Contributing 

Have you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/Vimux/mainroad/issues) to let me know. Or make directly a [pull request](https://github.com/Vimux/mainroad/pulls).



## Thanks to

@bep
@gohugoio
