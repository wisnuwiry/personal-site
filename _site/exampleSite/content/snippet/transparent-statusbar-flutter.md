---
title: "Cara Membuat Transparent StatusBar Android di Flutter"
date: 2020-10-27T06:04:12+07:00
tags: ["flutter", "snippet"]
---

Kadang kita perlu membuat status bar di project flutter kita perlu custom, baik itu transparant maupun berwarna dengan custom.

Langkah pertama jangan lupa import terlebih dahulu flutter service. Berikut contohnya:

```dart
import 'package:flutter/services.dart';
```

Ada dua cara untuk membuat status bar background nya jadi transparan:

1. Dengan [SystemChrome](https://docs.flutter.io/flutter/services/SystemChrome-class.html)

Simple untuk membuat transparan status bar

```dart
SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(statusBarColor: Colors.transparent),
);
```
Kustom lebih untuk setting statusbar dan navigation

```dart
SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent, // transparent status bar
        systemNavigationBarColor: Colors.black, // navigation bar color
        statusBarIconBrightness: Brightness.dark, // status bar icons' color
        systemNavigationBarIconBrightness:
            Brightness.dark, //navigation bar icons' color),
      ),
    );
```

Kode tersebut bisa ditaruh di atas/parent Widget `MaterialApp` ataupun juga bisa di widget lainya.

2. Dengan **AnnotatedRegion**

Berikut contoh kodenya:

```dart
AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle(
        statusBarColor: Colors.transparent, // transparent status bar
        systemNavigationBarColor: Colors.black, // navigation bar color
        statusBarIconBrightness: Brightness.dark, // status bar icons' color
        systemNavigationBarIconBrightness:
            Brightness.dark, //navigation bar icons' color
      ),
      child: MaterialApp(
        title: 'Flutter Demo',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: MyHomePage(title: 'Flutter Demo Home Page'),
      ),
    )
```