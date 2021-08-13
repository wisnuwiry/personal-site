---
title: "Atomic Design Concept Part 1"
date: 2020-10-29T10:22:10+07:00
images: [
    https://miro.medium.com/max/1000/1*V5oi-JrH4RlEQuYdVrQXig.png,
    https://i.ibb.co/BTRn8m6/Untitled.png,
    https://i.ibb.co/QP4YNBm/Untitled-1.png,
    https://i.ibb.co/yfRm0XV/Untitled-2.png,
    https://i.ibb.co/2WBnBXK/Untitled-3.png,
    https://i.ibb.co/9wXBxzx/Untitled-4.png,
    https://i.ibb.co/FnhQCKr/Untitled-5.png,
    https://i.ibb.co/MMpKkGp/Untitled-6.png,
]
tags: ["concept","atomic","design"]
---

**Apa sih itu Atomic Design?** 

**Atomic Design** pertama kali diperkenalkan oleh **Brad Frost**, dia adalah seorang desainer web, seniman, pembicara, konsultan, dan musisi. Dan anda bisa membaca bukunya itu secara free di  [atomicdesign.bradfrost.com](http://atomicdesign.bradfrost.com/).

**Atomic Design** berasal dari dua kata yaitu **Atom** dan **Design**.

**Atom** berarti suatu element terkecil dari suatu materi.

Yang kedua yaitu **Design** yang berarti sebuah architecture, atau juga bisa disebut dengan seni kreatif.

Dalam konteks kali ini **Atomic Design yaitu** suatu metedeologi/metode cara membuat sebuah komponent yang mampu *reuseble* dan *independent* yang dibagai berbagai modular-modular. 

### Ada beberapa kelebihan ketika kita membuat design secara Atomic

1. Design jadi lebih konsisten
2. Implmentasi Design Guidline jadi lebih mudah
3. Proses perbaikan komponen jadi lebih mudah, karena langsung spesifik di komponen tersebut.
4. Komponen mampu digunakan beberapa kali (reusable)
5. Clean Code

Konsep atomic design ini tidak hanya berlaku/bisa digunakan oleh UI/UX dan Front End Engineer saja, tapi bisa diimplementasikan oleh siapapun. Karena Atomic design ini hanya sebuah konsep/metodeologi saja. Misal seoarang Mobile Engineer, Android Engineer, Database Engineer, dll. 

Secara garis besar Atomic Design ini dibagi menjadi 5 bagian yaitu: atom, molecule, organism, template, dan page. Berikut illustrasi sederhana mengenai atomic design.

![https://miro.medium.com/max/1000/1*V5oi-JrH4RlEQuYdVrQXig.png](https://miro.medium.com/max/1000/1*V5oi-JrH4RlEQuYdVrQXig.png)

Image from: [https://blog.prototypr.io/](https://blog.prototypr.io/)

Sebuah komponent atomic design harus berdiri sendiri(indipenden) yang tidak memerlukan logic kompleks. Ketika komponen tersebut dipindah ke projek lain tidak akan bentrok. Mirip seperti beberapa framework front end populer, bootstrap, bulma, dll.

![Part of Atom in Atomic Design](https://i.ibb.co/BTRn8m6/Untitled.png)

Part image atomic design from [atomicdesign.bradfrost.com](http://atomicdesign.bradfrost.com/)

## Atom

Komponent bagian Atom ini, adalah komponen dimana komponent tersebut bagian yang sangat terkecil dan di komponen ini sudah tidak bisa dipecah lagi untuk jadi komponen yang independen. Di module state masih mengikuti state dari parent komponen.

Sebagai contoh jika kita membuat komponent seperti: `Input`, `Text`, `Button`, `Image`, `Icon`, dll  . Intinya di level atom ini komponent tersebut yang paling dasar dan common(sering digunakan) dan juga tidak memerlukan custom banyak dalam pembuatan komponent tersebut.

---

![Part of Molecule in Atomic Design](https://i.ibb.co/QP4YNBm/Untitled-1.png)

Part image atomic design from [atomicdesign.bradfrost.com](http://atomicdesign.bradfrost.com/)

## Molecule

Molecule adalah kumpulan dari berbagai komponen atom module, berarti di level komponent ini kita lebih advance lagi custom component dari Atom. Di module/komponen ini beberapa komponen atom disatukan dalam komponen ini dan komponent molecule ini memberikan beberapa fungsi kepada komponen dibawahnya yaitu atom. Ada beberapa contoh komponen yang termasuk dalam kategori molecule, misal: `SearchInput` , `LoginButton`, dll. 

Sebagai contoh pembahasan aku mau bahas tentang LoginButton Apple.

![Apple Login Button in Atomic Design](https://i.ibb.co/yfRm0XV/Untitled-2.png)

Image from: developer.apple.com

Berdasarkan dari gambar tersebut terdapat beberapa element/komponen Atom, yaitu `Button` sebagai komponen utamanya, ,dan terdapat juga `Icon` dan `Text` yang berasal dari komponen Atom juga. Dari komponen molecule LoginButton tersebut kita bisa kustom misal Icon mau jadi icon apa? terus bisa kustom teks `Sign in with Apple` mau jadi text apa? Terus juga bisa kita kustom ketika di klik/tap adak aksi apa?

---

![Organims Part of Atomic Design](https://i.ibb.co/2WBnBXK/Untitled-3.png)

Part image atomic design from [atomicdesign.bradfrost.com](http://atomicdesign.bradfrost.com/)

## Organism

**Oraganisme/Organisme** yaitu kumpulan dari beberapa komponent molecule, tapi tidak menutup kemungkinan campuran dari komponen atom dan molecule. Pada module ini komponent sudah mulai kompleks.  Komponen apa saja yang termasuk dalam kategori organisme yaitu seperti, `Header`, `Product Card`, `Footer` , `Bottom Navigation`, dll. Berikut contoh gambar bagian  dari organism module:

![Card Image Organism in Atomic Design](https://i.ibb.co/9wXBxzx/Untitled-4.png)

Image card from documentation bulma.io

---

![Template part of Atomic Design](https://i.ibb.co/FnhQCKr/Untitled-5.png)

Part image atomic design from [atomicdesign.bradfrost.com](http://atomicdesign.bradfrost.com/)

## Template

Termplate memiliki arti yaitu pola atau tatanan yang dibuat untuk mempermudahkan pembuatan selanjutnya, tanpa mengulang lagi. Dan template merupakan komponen utama yang membangun sebuah halaman. Dalam **Atomic Design** Template sebagai wadah sebuah konten halaman. Misal jika ingin membuat sebuah Blog/Artikel Online kita tidak perlu membuat interface/tampilan yang berulang-ulang, cukup buat satu saja template, tapi bisa digunakan di berbagai halaman.

---

![Page part of Atomic Design ](https://i.ibb.co/MMpKkGp/Untitled-6.png)

Part image atomic design from [atomicdesign.bradfrost.com](http://atomicdesign.bradfrost.com/)

## Page

Module yang terakhir yaitu Page/Halaman. Pada module ini kita mengisikan konten dari module template, dan semua logic yang bersifat sendiri-sendiri ditaruh di module ini. Jadi pada module ini kita bisa membuat code jadi lebih bersih tanpa harus ribet dengan masalah komponen lagi. Module ini juga hasil akhir dari pengerjaannya, kita bisa mereview dan meneliti apa yang kurang pada halaman ini.
