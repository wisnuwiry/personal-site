---
title: "Tutorial Flutter Bottom Nav State Management Dengan Cubit"
date: 2020-07-08T16:55:44+07:00
tags: ["flutter", "cubit"]
images: [
  https://i.ibb.co/NSS5Rhw/cubit-bottom-nav.png,
  https://i.ibb.co/7j1s3hJ/flutter-new-cubit.png
]
---

Ketika kita membuat sebuah app dengan Flutter kadang kala kita perlu banget menggunakan state management, maka dari itu kita perlu paham dan mengerti tentang state management.

Di Flutter tersedia banyak sekali state management seperti Provider, Bloc, Redux, Mobx, Cubit, dll. Mungkin diantara teman-teman sudah banyak juga yang mengerti tentang state management di Flutter, atau perna menggunakannya. 

Pada kali ini Aku akan membahas tentang state management di Flutter dengan **Cubit**, mungkin terdengar agak aneh namanya ya?, state management **Cubit** ini terbilang cukup baru banget sekitar kurang 1 bulanan pada saat saya menulis artikel ini. Link source code Cubit bisa teman-teman dapatkan di [github](https://github.com/felangel/cubit).

Cubit ini adalah bagian dari Bloc Libaray yang ditambahkan pada mulai versi 5.0.0, Jadi tidak heran kodenya mirip dengan Bloc state management.

Pada kesempatan ini aku mau bahas tentang **Tutorial Flutter Membuat Bottom Navigation Bar Menggunakan State Management Cubit**, sebelum kita mula mari kita membuat project simple tentang cubit ini.

Mari kita mulai membuat sebuah project simple untuk belajar kita bareng-bareng, kita namai project kita dengan nama `flutter_bottom_nav_cubit`. Untuk membuat project baru teman-teman bisa jalankan command berikut:

```bash
flutter create flutter_bottom_nav_cubit
```

Kemudian open project nya di text editor VS Code atau pun di Android Studio.

Untuk membuat sebuah app dengan state management Cubit, ada yang perlu di install terlebih dahulu yaitu library cubit nya, kita install library Cubit di `pubspec.yaml`.

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_cubit: ^0.1.1
```

Kemudian jalankan `flutter pub get` tunggu sampai proses install selesai.

Setelah itu kita buat state management nya, tinggal klik kanan pada folder `lib/` terus pilih `Cubit: New Cubit`,

![Flutter New Cubit Bottom Nav](https://i.ibb.co/7j1s3hJ/flutter-new-cubit.png)

Oh ya, fitur ini bisa teman-teman dapatkan jika menginstall extension di VS Code. Berikut artikel tentang extensions VS Code:

> [Rekomendasi Extension Theme Font Visual Studio Code](/post/rekomendasi-extension-theme-font-vscode/)

Lanjut lagi, kemudian beri nama cubit kita dengan nama `bottom_nav` kemudian enter.

Berikut kode hasil generate:

**bottom_nav_cubit.dart**

```dart
import 'package:cubit/cubit.dart';
import 'package:meta/meta.dart';

part 'botttom_nav_state.dart';

class BotttomNavCubit extends Cubit<BotttomNavState> {
  BotttomNavCubit() : super(BotttomNavInitial());
}
```

**bottom_nav_state.dart**

```dart
part of 'botttom_nav_cubit.dart';

@immutable
abstract class BotttomNavState {}

class BotttomNavInitial extends BotttomNavState {}
```

Pada state management cubit ini kita tidak perlu membuat class event-event yang seperti pada Bloc. Jadi di cubit lebih simple. Dan untuk meng trigger sebuah event di cubit cukup dengan method-method nya.

```dart
BotttomNavCubit() : super(BotttomNavInitial());
```

Ketika Bloc versi 5.0.0 dan cubit ini untuk initialisasi state pada super class.

Langkah pertama kita buat dulu logic Cubit untuk bottom nav.

Kita buat seperti ini.

**bottom_nav_cubit.dart**

```dart
import 'package:cubit/cubit.dart';

class BottomNavCubit extends Cubit<int> {
  BottomNavCubit() : super(0);

  void getHome() => emit(0);
  void getTasks() => emit(1);
  void getApps() => emit(2);
  void getNotification() => emit(3);
  void getProfile() => emit(4);
}
```

Kita buat seperti itu, dah emang cukup itu aja buat state management, simple kan?

Kita hapus saja file **bottom_nav_state.dart** karena sudah tidak dibutuhkan.

Kemudian kita harus implementasi cubit ini pada UI. Pertama kita harus membuat `CubitProvider` dulu.

Kita buat pada file `main.dart` dan taruh sebagai parent widget `MeterialApp` berikut kodenya.

```dart
return CubitProvider(
    create: (context) => BottomNavCubit(),
    child: MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MainPage(),
    ),
);
```

Langkah selanjutnya buat terlebih dahulu widget MainPage, sebagai Page utamanya.

```dart
class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentIndex;

  @override
  Widget build(BuildContext context) {
    return CubitBuilder<BottomNavCubit, int>(
      builder: (context, state) {
        // Update _currentIndex with state cubit
        _currentIndex = state;

        return Scaffold(
          body: _buildBody(state),
          bottomNavigationBar: _buildBottomNav(),
        );
      },
    );
  }

  Widget _buildBody(int index) {
    switch (index) {
      case 0:
        return HomePage();
        break;
      case 1:
        return TasksPage();
        break;
      case 2:
        return AppsPage();
        break;
      case 3:
        return NotificationPage();
        break;
      case 4:
        return ProfilePage();
        break;
      default:
        return Text('Not Found');
    }
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      currentIndex: _currentIndex,
      type: BottomNavigationBarType.fixed,
      onTap: _getChangeBottomNav,
      items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), title: Text('Home')),
        BottomNavigationBarItem(
            icon: Icon(Icons.date_range), title: Text('Task')),
        BottomNavigationBarItem(icon: Icon(Icons.apps), title: Text('Apps')),
        BottomNavigationBarItem(
            icon: Icon(Icons.notification_important),
            title: Text('Notification')),
        BottomNavigationBarItem(
            icon: Icon(Icons.person), title: Text('Profile')),
      ],
    );
  }

  void _getChangeBottomNav(int index) {
    switch (index) {
      case 0:
        context.cubit<BottomNavCubit>().getHome();
        break;
      case 1:
        context.cubit<BottomNavCubit>().getTasks();
        break;
      case 2:
        context.cubit<BottomNavCubit>().getApps();
        break;
      case 3:
        context.cubit<BottomNavCubit>().getNotification();
        break;
      case 4:
        context.cubit<BottomNavCubit>().getProfile();
        break;
      default:
    }
  }
}
```

Kemudian buatlah page page yang ada di bottom nav terserah teman-teman saja, sampai saat ini kita sudah berhasil membuat app kita lebih dinamis dan mudah di maintance.

Berikut hasil preview:

{{<video url="https://i.imgur.com/Yj2m9WK.mp4" >}}

---

**Bedah Kode:**


```dart
class BottomNavCubit extends Cubit<int> {
	...
```
`int` tersebut adalah type data yang digunakan state nya, kenapa sih saya menggunakan type data `int`, karena bottomNavigationBar itu kan ada property `currentIndex` nah state tersebut bisa kita gunakan sebagai value nya.

```dart
BottomNavCubit() : super(0);
```

Pada `super(0)` nilai `0` adalah initial state dari cubit itu sendiri.

```dart
void getHome() => emit(0);
```

Pada cubit ini untuk membuat event kita buat sebuah method / function untuk mentrigger sebuah event dan akan mengembalikan sebauh state.

```dart
void getHome() => emit(0);
```

Pada Cubit ini untuk mengembalikan state sekarang atau mengupdate state terbaru menggunakan keyword `emit(value_state)`. Beda dengan Bloc yang menggunkana keyword `yield` sebagai updater state.

```dart
CubitProvider(
    create: (context) => BottomNavCubit(),
    child: ....
```

Untuk posisi `CubitProvider` pastikan diatas atau sebagai parent nya CubitProvider, bisa saja di taruh root widget seperti MaterialApp, atau sebagai parent suatu page.

```dart
return CubitBuilder<BottomNavCubit, int>(
  builder: (context, state) {
    ....
  },
);
```  

Untuk mengambil sebuah state Cubit secara realtime kita perlu membuat sebuah widget yaitu `CubitBuilder`. `CubitBuilder` tidak boleh posisinya di atas `CubitProvider`. 

Get Event with Extensions

```dart
context.cubit<BottomNavCubit>().getHome();
```

Get Event without Extensions

```dart
CubitProvider.of<BottomNavCubit>(context).getHome();
```

Untuk mentrigger sebuah event cubit kita perlu menggunakan keyword tersebut.


Teman-teman masih bingung dengan penjelasan saya? Bila masih bingung bisa [contact saya](/contact), atau bisa lihat hasil experiment kali ini di Github:

<center><a href="https://github.com/wisnuwiry/flutter-bottom-nav-cubit" class="btn">Source Code</a></center>

Reference:
	- https://github.com/felangel/cubit