---
title: "Membuat Personal Site/Portofolio dengan Hugo"
date: 2020-03-21T17:33:17+07:00
tags: ["web","hugo", "personal-site"]
images: [
    "https://i.ibb.co/17xmx32/featured.png",
    "https://i.ibb.co/cx00qHq/hugo-blog-struktur.png",
    "https://i.ibb.co/jGsMdp8/hugo-project-example-site.png",
    "https://i.ibb.co/hRNy2LY/hugo-project-content.png",
    "https://i.ibb.co/0XTygCn/github-add-github-pages.png",
]
---

Jika teman-teman ingin membuat sebuah web pribadi ataupun portofolio disini akan dibahas **Bagaimana cara membuat sebuah web portofolio dengan Hugo**. 

Sebelumnya apakah sudah tahu tentang Blog Personal / Web Portofolio?

Jika belum mari kita bahas.  

Web Blog Personal biasanya diginukan sebagai catatan blog pribadi seseorang bisa juga blog tersebut dijadikan sebagai web portofolio mereka seperti pengalaman pribadi, hasil project, menceritakan keseharian, dan lain-lain selama ini yang dikerjakan.

Tapi kali ini kita akan membahas dan mencoba bagaimana membuat sebuah blog pribadi/personal dengan [Hugo](//gohugo.io "Hugo Static Site Generator") dan [Github Pages](//pages.github.com/ "Github Pages Hosting"). Tapi bagaimana jika OS saya berbeda dengan di tutorial ini? Tenang saja saya akan membuat tutorial ini dari berbagai OS desktop yang sering digunakan mulai dari Linux, Windows, dan Mac OS. Jadi Anda tidak perlu khawatir dengan dengan perbedaan OS untuk intall ini.

Sebelum kita memulai untuk membuat sebuah blog Anda harus mempersiapkan beberapa hal diantaranya berikut:

1.  Akun [Github](//github.com "Account Github")
2.  [Hugo](//gohugo.io "Hugo")
3.  Git
4.  Text Editor

Semua point-point tersebut wajib Anda penuhi, jika Anda belum punya akun github bisa [membuat akun github](https://github.com/join "Github SignUp Join") terlebih dahulu, isi semua field yang disuruh. Setelah itu Anda perlu install git di desktop Anda, berikut caranya install git:

1.  ### Install Git
    
    #### 1. Linux
       Buka Terminal > paste kode berikut:
        
       ```bash
       $ sudo apt install git
       ```
        
       Dalam tahap ini pastikan laptop terkoneksi sama internet karena proses install ini membutuhkan internet.
        
    #### 2. Windows
        
       Untuk proses install git di windows Anda cukup download saja software gitnya terlebih dahulu silahkan kunjungi website [download git](//git-scm.com/download/win "Link Download Git") resminya. Kemudian setelah di download install terlebih dahulu. Saya anggap Anda sudah selesai install. Langsung saja ke step berikutnya.
        
    #### 3. Mac Os
        
       Pada Mac Os Anda bisa install git lewat [HomeBrew](//brew.sh/ "Install HomeBrew"), dengan mengetikkan command berikut di terminal/bash.
        
       ```bash
       $ brew install git
       ```
    
    Jika proses install git sudah selesai Anda bisa cek apakah git berhasil di install dengan benar atau tidak, untuk cek Anda bisa buka Terminal atau git(bagi windows). Lalu ketikkan command berikut:
    
    ```bash
    $ git --version
    ```

    Lalu jika proses install berhasil akan muncul result berikut:
    
    ```bash
    git version 2.20.1
    ```

    pada version number tersebut tidak mesti sama semua, itu versi git Anda yang telah diinstall, bisa jadi Anda install versi lebih baru/lalu. Sampe proses ini kita sudah berhasil menginstall salah satu software yang wajib yaitu git. Dan proses selanjutnya kita juga perlu install [Hugo](//gohugo.io). 
    
2.  ### Install Hugo
    
    **Apa sih itu Hugo?** 
    
    Hugo yaitu salah satu tool static site/website generator yang sangat powerfull karena speed building nya. Dan Hugo ini cukup lah mudah digunakan. Dan beberapa faktor mengapa pilih Hugo ini sebagai tool static site generator. Inilah alasanya:
    
    *   Mudah
    *   Cepat
    *   Secure
    
    Dari beberapa alasan tersebut cukuplah meyakinkan untuk memilih Hugo ini sebagai static site generator. Untuk membuat web dari Hugo ini kita perlu juga memahami sintaks [markdown](//en.wikipedia.org/wiki/Markdown) karena di hugo ini konten post ini digenerate dari markdown ke html. Mari kita langsung install hugo ini. Berikut langkah-langkah untuk menginstall Hugo:
    
    1.  #### Linux
        
        Untuk install Hugo di linux ini sangat mudah ya cukup ketikkan command berikut ini di terminal:
        
        ```bash
        $ snap install hugo
        ```
        
        Tunggu sampai proses selesai install install ini membutuhkan koneksi internet ya.
    2.  #### Windows
        
        Untuk windows ini kita akan menginstall hugo dengan [choco](//chocolatey.org/ "Install Chocolatey") bisa di install terlebih dahulu juka belum di install. Jika sudah maka paste kan command berikut ini di CMD:
        
        ```bash
        $ choco install hugo -confirm
        ```

        Proses download dan install memerlukan waktu tunggu saja beberapa menit.
        
    3.  #### Mac Os
        
        ```bash
        $ brew install hugo
        ```
    
    Bila ingin mengejek apakah sudah tersintall atau belum bisa ketikkan command berikut ini di Terminal/CMD:
    
    ```bash
    $ hugo version
    ```

    Lalu jika berhasil akan output berikut ini:
    
    ```bash
    Hugo Static Site Generator v0.62.1/extended linux/amd64 BuildDate: unknown
    ```

    Setelah selesai proses install hugo nya mari kita siapkan text editornya, karena text editor ini sangat penting dalam pembuatan web kali ini. Untuk text editor Anda bisa menggunakan beberapa text editor saya contohkan ini beberapa text editor yang bisa Anda gunakan [SublimeText](//www.sublimetext.com/ "Download SublimeText"), [VS Code](//code.visualstudio.com/ "Download Visual Studio Code"), [Atom](//atom.io "Download Atom"), dll. Tapi pada kali ini saya akan menggunakan text editor VS Code. Jika salah satu tersebut belum Anda install saya sarankan install terlebih dahulu. Langsung saja kita ke step berikutnya yaitu membuat project baru dengan Hugo.
    
    * * *
    
3.  ### Buat Project Baru dengan Hugo
    
    Untuk membuat project baru ini cukup ketikkan command berikut:
    
    ```bash
    $ hugo new site nama_project
    ```

    Untuk `nama_project` itu bisa terserah Anda karena itu sebagai nama project Hugo Anda.
    
    Tapi untuk contoh saya menamai project saya dengan nama blog berikut contohnya:
    
    ```bash
    $ hugo new site blog
    ```

    Setelah selesai proses pembuatan project baru, buka folder project tersebut ke text editor Anda. Pada kali ini saya menggunakan text editor VS Code. Dan ini hasil project dan strukturnya setelah di buka text editor seperti ini.
    
    ![Hugo Project Structure File](https://i.ibb.co/cx00qHq/hugo-blog-struktur.png)
    
    Setelah sampai proses ini kita juga perlu install tema untuk mempercantik web kita ini. Di Hugo ini sudah disediakan banyak tema bisa dilihat di [sini](//themes.gohugo.io "Theme Hugo Download").  Jadi kita lebih enak tidak perlu susah payah membuat dari nol. Tapi pada kali ini saya menggunkan tema [Northendlab](//themes.gohugo.io/northendlab-hugo/), Anda boleh kok pilih sesuai keinginan proses install nya pun sama.
    
    Untuk install tema biasanya sudah disediakan dokumentasinya di tiap tema di hugo. Mari langsung install temanya:
    
    Pertama kita clone/download temanya dulu. Ketikkan command berikut pada terminal atau Terminal pada VS Code.
    
    **Note:** Bila menggunakan terminal/CMD tidak lewat text editor sesuaikan dulu PATH folder projectnya.
    
    Berikut untuk download temanya:
    
    ```bash
    $ cd themes  
    $ git clone git@github.com:themefisher/northendlab-hugo.git
    ```

    untuk proses download ini berbeda-beda ya sesuaikan dengan temanya.
    
    Copy example content dan dan config. Untuk ini anda perlu copy beberapa file dari contoh temanya, dan yang Anda harus copy yang file & folder dari folder themes/northenlab-hugo/exampleSite:
    
    copy folder content, data, dan file config.toml. Seperti pada gambar berikut ini:
    
    ![Hugo Example Site Content](https://i.ibb.co/jGsMdp8/hugo-project-example-site.png)
    
    Hugo Strukture Content Example
    
    Kemudian pindahkan dan paste folder dan file tersebut ke root project. Maka hasilnya seperti ini:
    
    ![Example Theme Structure](https://i.ibb.co/hRNy2LY/hugo-project-content.png)
    
    Contoh Hasil Setelah copy example site dari tema
    
    Dan untuk mencoba / run project hugo kita ini cukup ketikkan command berikut ini:
    
    ```bash
    $ hugo server
    ```

    Kemudian lihat di browser dengan URL http://localhost:8080/ atau URL lain yang seperti di terminal. Berikut contoh hasilnya:
    
    ![Hugo Example Site]("https://i.ibb.co/17xmx32/featured.png")
    
    Sampai saat ini kita sudah berhasil build site. Nah tapi content hasilnya itu kan tidak sesuai ekspektasi kan? bila ingin merubah Anda edit saja pada file **config.toml** pada root project. Atau bila ingin mempelajari selengkapnya tentang hugo bisa kunjungi ke [dokumentasi hugo](https://gohugo.io/documentation/ "Hugo Documentation"). 
    
    Selanjutnya kita akan mempublish Web kita ke [Github Pages](//pages.github.io). Nah langkah ini lah kita perlu untuk menggunakan akun github.
    
4. ### Deploy ke Github Pages
    
   Pertama-tama kita perlu login dulu ke [github](//github.com). Setelah login kita buat repository dulu
    
   `Klik tombol plus>New Repository`
    
   Dan buat repository dengan template seperti ini:
    
   `username_github.github.io`
    
   Untuk `username_github` tersebut sesuaikan dengan username Anda sendiri.
    
   ![Github Pages Create Repository](https://i.ibb.co/0XTygCn/github-add-github-pages.png)
    
   karena username saya wisnuwiry maka saya membuat `repository` dengan nama `wisnuwiry.github.io`. Kemudian klik create repository. 
    
   Setelah proses pembuatan repo selesai kita buat dulu file untuk deploy ke github kita. Buat file dengan nama deploy.sh di root project Anda. Dan paste kan script ini di file tersebut.
    
   ```bash
    #!/bin/sh

	# If a command fails then the deploy stops
	set -e

	printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

	# Build the project.
	hugo # if using a theme, replace with `hugo -t <YOURTHEME>`

	# Go To Public folder
	cd public

	# Add changes to git.
	git add .

	# Commit changes.
	msg="rebuilding site $(date)"
	if [ -n "$*" ]; then
		msg="$*"
	fi
	git commit -m "$msg"

	# Push source and build repos.
	git push origin master
   ```

   Kemudian inisialisasikan project anda ke git dengan ketikkan command berikut:
    
   ```bash
    $ git init  
    $ git submodule add -b master https://github.com/wisnuwiry/wisnuwiry.github.io.git public 
   ```

   Pada proses tersebut command add submodule ganti dengan format berikut ini:
    
   ```bash
    $ git submodule add -b master https://github.com/<USERNAME>/<USERNAME>.github.io.git public
   ```

   Kemudian ketikan command lagi untuk mendeploy web kita ke internet:
    
   ```bash
    $ chmod +x deploy.sh  
    ./deploy.sh
   ```
    
Hasil bisa Anda lihat di web [https://wisnuwiry.github.io](https://wisnuwiry.github.io).

Selamat mencoba.