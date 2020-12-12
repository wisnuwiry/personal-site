---
title: "Tutorial Localization dan Translation di Flutter"
date: 2020-10-03T12:51:04+07:00
tags: ["flutter","localization"]
images: [
  https://i.ibb.co/JRGYDDf/localization-id.png,
  https://i.ibb.co/KK1SQwY/localization-en.png
]
---

Ingin membuat sebuah aplikasi yang mudah dipahami oleh semua orang? Ini ada salah satu tujuan semua developer(pengembang) diseluruh dunia ini untuk membuat sebuah aplikasi yang mudah dalam penggunaannya maupun yang disenangi user(pengguna).

Kadang kala kita tuh sebagai seorang engineer itu nggak terlalu mengerti tentang apa yang di inginkan oleh user/customer/pengguna aplikasi kita, kita hanya mementingkan "**Yang penting aplikasi jadi & jalan normal**".  Untuk membuat user nyaman dengan aplikasi kita itu butuh banyak sekali hal-hal yang dipertimbangkan  untuk membuat sebuah fitur yang nyaman dan disenangi oleh pengguna.  

Salah satu faktor yang bisa membuat user nyaman yaitu sebuah fitur **multibahasa / localization** di sebuah aplikasi kita. Jadi aplikasi teman-teman nanti itu bisa digunakan oleh beberapa bahasa sesuai dengan bahasa yang di setting oleh user, dan aplikasinya bisa juga digunakan oleh orang-orang di berbagai negara keren bukan? 

Maka dari itu pada kesempatan kali ini saya akan mencoba bereksperimen gimana sih cara membuat berbagai bahasa (**Localization**).

Pada kesempatan kali ini aku mau mencoba fitur multi-bahasa dengan teknology cross-platform yaitu **Flutter**. Bagi teman-teman yang belum mengenal tentang Flutter boleh baca web nya [https://flutter.dev/](https://flutter.dev/). 

 

> [Alasan-alasan Kenapa Harus Pakai Flutter](https://wisnuwiry.space/post/alasan-kenapa-pakai-flutter/)

Sebelum memulai apa sih yang perlu kita persiapkan?

Ada beberapa yang harus teman-teman persiapkan untuk mengikuti tutorial kali ini yaitu:

1. Flutter 1.22 (or Newer)
2. Text Editor VS Code / Android Studio
3. Extensions Flutter & Dart

> [Rekomendasi Extension Theme Font Visual Studio Code](https://wisnuwiry.space/post/rekomendasi-extension-theme-font-vscode/)

Untuk membuat fitur lolalization ini perlu Flutter 1.22 atau yang lebih terbaru, jika teman-teman ingin upgrade ke versi terbaru gunakan command ini untuk upgrade:

```bash
flutter upgrade
```

Atau hanya sekedar mengecek versi flutter kita yang sudah keinstall dengan command berikut:

```bash
flutter --version
```

## Membuat Project Baru

Yuk kita mulai dengan membuat project baru flutter kita, kita beri nama **flutter_intl** , untuk nama terserah teman-teman saja tapi sebagai contoh aku buat nama project dengan nama tersebut. Untuk membuat project baru kita perlu menggunakan command berikut ini:

```bash
flutter create flutter_intl
```

`flutter_intl` itu sebagai nama projectnya, dan nama itu boleh kasih nama yang teman-teman inginkan.

Setelah membuat project selesai buka project tersebut ke dalam Text Editor / IDE teman-teman ya!.

## Menambahkan Dependecy

Buka file `pubscpec.yaml` dan update jadi seperti ini:

```yaml
name: flutter_intl # nama project
description: A new Flutter project.

version: 1.0.0+1

environment:
  sdk: ">=2.7.0 <3.0.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations: # tambahkan ini
    sdk: flutter   # tambahkan ini

  intl: ^0.16.1 # tambahkan ini

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
  generate: true # tambahkan ini
```

Setelah update seperti yang diatas jalankan `flutter pub get` ini bagi yang tidak otomatis download pub, tapi biasanya sih otomatis lansung di downloadkan oleh extension flutternya.

## Membuat Konfigurasi Localization

Untuk membuat konfigurasinya kita perlu membuat file configurasi dengan nama `l10n.yaml` dan letakkan file ini pada root project teman-taman masing-masing. Kemudian isi file tersebut dengan kode berikut:

```yaml
arb-dir: lib/l10n # Lokasi folder data source text translate kita
template-arb-file: messages_en.arb # template file source localization
output-localization-file: translations.dart # nama file hasil generator
output-class: Translations # nama class hasil generator
```

Jika teman-teman tadi mengisikan `arb-dir`  dengan path `lib/l10n` seperti contoh maka teman-teman perlu buat folder di lib >> l10n. Atau sesuai dengan config arb-dir teman-teman masing-masing.

```bash
mkdir lib/l10n
```

Setelah itu jangan lupa buat terlebih dahulu file `messages_en.arb` dan `message_id.arb` di dalam folder yang kita buat tadi `lib/l10n`. Berikut contoh struktur foldernya:

```md
flutter_intl/
└───lib/
    └───l10n/
            message_id.arb
            message_en.arb
```

Dalam kasus ini aku ingin membuat bahasa hanya support untuk Indonesia & Inggris saja, makanya saya membuat file `messages_en.arb` dan `messages_id.arb`. Nama di `messagess` ini bisa apa saja yang Anda inginkan, tetapi bagian terakhir dari nama file harus mengacu pada message location code di dalamnya.

Seperti yang Anda lihat, file ini adalah file ARB, file Application Resource Bundle. Ini adalah format dari localization yang dirancang oleh Google. Teman-teman dapat membaca lebih detailnya [di sini](https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification) .

Sekarang untuk menentukan pesan/message yang di localization, kita perlu membuat/menambahkan pesan yang ingin kita lozalization ke `messages_en.arb` file yang kita buat sebelumnya. Saya tidak akan membahas semua fitur yang didukung oleh format file ARB, tetapi ini adalah format yang cukup serbaguna dan sederhana jadi pastikan untuk membaca [ApplicationResourceBundleSpecification](https://github.com/google/app-resource-bundle/wiki/ApplicationResourceBundleSpecification).

**messages_en.arb**

```json
{
    "@@locale": "en",

    "helloWorld": "Hello World!",
    "@helloWorld": {
        "description": "Deskripsi message localization"
    },
    "myName": "My Name: {name}",
    "@myName":{
        "placeholders":{
            "name": {
                "type": "String"
            }
        }
    }
}
```

**messages_id.arb**

```json
{
    "@@locale": "id",

    "helloWorld": "Halo Dunia!",
    "myName": "Nama Saya: {name}"
}
  
```

Seperti yang Anda lihat untuk setiap message yang ingin kita localization kan, Kita perlu menambahkan `key` dan `meta key` ke file. Key ini berfungsi untuk merujuk ke message dalam bahasa apa yang ingin Anda tampilkan nanti dan `meta key` adalah key yang sama yang diawali dengan tanda `@`.


## Generate Arb Localization

Secara default flutter sudah otomatis akan mengenerate kan hasil localization kita tadi, dengan menjalankan/mendebug flutter (`flutter run`) atau membuild (`flutter build`).

Hasil generatornya ada di dalam folder `.dart_tool/flutter_gen/gen_l10n`. Kalau bisa folder tersebut jangan dimasukkan ke version control seperti git. Jadikan ignore folder tersebut dalam folder `.gitignore`.

## Implementasi Localization di UI (User Interface)

Sebelumnya kita perlu setting configurasi localization terlebih dahulu di widget `MaterialApp`, secara default widget `MaterialApp` berada pada file `lib/main.dart`.

Buka file yang ada MaterialApp nya terus import terlebih dahulu ini:

```dart
import 'package:flutter_gen/gen_l10n/translations.dart';
```

Kemudian setting di MaterialAppnya, jadi gini:

```dart
MaterialApp(
    title: 'Flutter Demo',
    theme: ThemeData(
    primarySwatch: Colors.blue,
    visualDensity: VisualDensity.adaptivePlatformDensity,
    ),
    localizationsDelegates: Translations.localizationsDelegates, // tambahkan ini
    supportedLocales: Translations.supportedLocales, // tambahkan ini
    home: MyHomePage(title: 'Flutter Demo Home Page'),
);
```
Perlu diperhatikan untuk IOS kita perlu config beberapa tambahan lago bisa lihat di [dokumentasinya untuk lebih detail](https://flutter.dev/docs/development/accessibility-and-localization/internationalization#appendix-updating-the-ios-app-bundle).

Sampai langkah saat ini kita sudah berhasil config localization di aplikasinya, sekarang kita perlu implement gimana cara penggunaan nya.

Pertama jangan lupa selalu import di file nya ketika mau menggunakan localization, dengan import kode seperti ini:

```dart
import 'package:flutter_gen/gen_l10n/translations.dart';
```

Berikut saya kasih contoh penggunaan nya:

```dart
class MyHomePage extends StatelessWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(Translations.of(context).helloWorld),
            Text(Translations.of(context).myName("Wisnu")),
          ],
        ),
      ),
    );
  }
}
```

Berikut hasil experiment kali ini:

| English  |  Indonesian |
|---|---|
|  ![Flutter Localization English](https://i.ibb.co/KK1SQwY/localization-en.png) | ![Flutter Localization Indonesian](https://i.ibb.co/JRGYDDf/localization-id.png)  |

<center><a href="https://github.com/wisnuwiry/flutter-intl" class="btn">Source Code</a></center>
