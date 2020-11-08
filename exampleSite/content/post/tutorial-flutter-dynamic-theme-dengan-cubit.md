---
title: "Tutorial Flutter Dynamic Theme Dengan Cubit"
date: 2020-07-08T16:55:53+07:00
tags: ["flutter", "cubit"]
---

Ingin membuat app kita lebih dinamis, dan mudah di perbaiki dan dikembangkan? Solusinya kita bangun pondasi app kita jadi lebih kuat, terus bagaimana membangun sebuah pondasi pada suabuah aplikasi ataupun software?

Jawaban nya cukup dengan architecture kode yang cukup baik dan mudah di maintance.

Tapi kali ini aku membahas salah satu bagian yang bisa membanguan sebuah app kita jadi lebih flexible dan mudah dikembangkan yaitu dengan menggunakan state management.

Pada contoh kali ini kita akan belajar menggunakan **state management Cubit pada implementasi Flutter Dynamic Theme**. Sebelumnya saya sudah membahas tentang state managenement Cubit, dengan contoh pada Bottom Nav. Berikut linknya:

> [Tutorial Flutter Bottom Nav State Management Dengan Cubit
](/post/tutorial-flutter-bottom-nav-state-management-dengan-cubit/)

Mari kita langsung mencoba sebuah experiment Membuat Dynamic Theme di Flutter dengan Cubit.

Langkah pertama buat terlebih dahulu project nya kali ini, kita namain `flutter_cubit_dynamic_theme`, Untuk nama project terserah teman-teman saja, atau pun bisa untuk melanjutkan pada app yang sudah dikembangkan saat ini. Tapi jika ingin mengikuti saya dari awal terserah juga. Untuk membuat project baru ketikkan command berikut:

```bash
flutter create flutter_cubit_dynamic_theme
```

Setelah selesai membuat project nya buka di text editor teman-teman masing-masing.

Kemudian buka `pubspec.yaml` dan tambahkan atau install dependency berikut sebagai sayrat utama menggunakan cubit library ini. Berikut contoh kodenya:

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_cubit: ^0.1.1
```

Pada saat saya menulis blog ini versi `flutter_cubit` pada versi `0.1.1` saran aku, jika pada saat teman-teman membuat project ini buatlah versi library sesuai dengan versi terbarunya.


Setelah itu jalankan `flutter pub get` terlebih dahulu sebelum lanjut ke step berikutnya.

Kemudian kita buat terlebih dahulu cubit Theme nya. ada dua file yang harus di buat yaitu `theme_cubit.dart` dan `theme_state.dart`.

Untuk file **theme_state.dart** isi kode jadi seperti ini:

```dart
part of 'theme_cubit.dart';

@immutable
abstract class ThemeState {}

class ThemeLightState extends ThemeState {}

class ThemeDarkState extends ThemeState {}
```

Pada clas `ThemeLightState` dan `ThemeDarkState` adalah sebuah state cubit dimana state tersebut yang nantinya akan kita gunakan terus pada implementasi di UI nya.

Kemudian pada file **theme_cubit.dart** kodenya seperti ini:

```dart
import 'package:cubit/cubit.dart';
import 'package:meta/meta.dart';

part 'theme_state.dart';

class ThemeCubit extends Cubit<ThemeState> {
  ThemeCubit() : super(ThemeLightState());

  void getChangeTheme(){
    if(state is ThemeLightState){
      emit(ThemeDarkState());
    }else{
      emit(ThemeLightState());
    }
  }
}
```

Pada kode `super(ThemeLightState())` kode yang pada super() tersebut adalah state initial, dimana state tersebut adalah state yang dijalankan pertama kali, sebelum ada event yang mengembalikan state. Pada state initial tersebut boleh diganti dengan `ThemeLightState()` sesuai dengan kebutuhan. Yang pasti state harus mengandung type data `ThemeState`, karena `ThemeDarkState` dan `ThemeLightState` adalah inheritence dari class `ThemeState` jadi type data nya masih bisa.

Pada file tersebut ada/terdapat sebuah method `getChangeTheme()`, itu adalah method dimana kita nanti untuk memanggil event cubit lewat method tersebut. Dan pada method tersebut terdapat pengecekan/pengkondisian jika state nya `ThemeLightState` akan mengembalikan state `ThemeDarkState()` dengan keyword `emit()`, mirip seperti di Bloc yang menggunakan `yield`. Dan jika state tidak `ThemeLightState` maka dikembalikan `ThemeLightState`.

Kemudian kita buat data Theme nya terlebih dahulu, sebelum implementasi di UI nya. Kita buat 2 file lagi yaitu `light_theme.dart` dan `dart_theme.dart`. File-file tersebut yang kita gunakan sebagai data dari `ThemeData` yang dibutuhkan pada widget `MaterialApp` pada Flutter.

**light_theme.dart**
```dart
import 'package:flutter/material.dart';

class LightTheme {
  static ThemeData data = ThemeData.light().copyWith(
    textTheme: text,
  );
  
  // Make all style theme light in here
  static TextTheme text = TextTheme(
    bodyText1: TextStyle(),
  );
}
```

**dark_theme.dart**
```dart
import 'package:flutter/material.dart';

class DarkTheme {
  static ThemeData data = ThemeData.dark().copyWith(
    textTheme: text,
  );

  // Make all style theme dark in here
  static TextTheme text = TextTheme(
    bodyText1: TextStyle(),
  );
}
```

Pada class-class tersebut tempat dimana teman-teman menaruh semua style theme custom pada aplikasinya.

```dart
static ThemeData data = ThemeData.dark().copyWith(
    textTheme: text,
);
```

Pada contoh tersebut kita mengkopy style dari material design yang ada di flutter kemudian kita kustom kembali. 

Kemudian pindah ke halaman **main.dart** kemudian taruh kode ini pada file **main.dart**:

```dart
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CubitProvider(
      create: (context) => ThemeCubit(),
      child: CubitBuilder<ThemeCubit, ThemeState>(
        builder: (context, state) {
          return MaterialApp(
            title: 'Flutter Demo',
            theme:
                (state is ThemeLightState) ? LightTheme.data : DarkTheme.data,
            home: MyHomePage(title: 'Flutter Demo Home Page'),
          );
        },
      ),
    );
  }
}
```

Jangan lupa import juga file-file nya!


Sebelum mengimplementasikan Cubit pada UI widget kita perlu membuat parent widget CubitProvider terlebih dahulu. berikut contoh kodenya:

```dart
CubitProvider(
  create: (context) => ThemeCubit(),
  child: ChildWidget()
);
```

Dan juga ketika ingin mengambil sebuah state terkini secara realtime kit perlu buat widget CubitBuilder nya.

```dart
CubitBuilder<ThemeCubit, ThemeState>(
  builder: (context, state) {
	...
  }
)
```

Dan karena MaterialApp membutuhkan sebuah theme data, kita ambil data dari state Cubit kita tadi, beikut kodenya:

```dart
return MaterialApp(
    title: 'Flutter Demo',
    theme:
        (state is ThemeLightState) ? LightTheme.data : DarkTheme.data,
    home: MyHomePage(title: 'Flutter Demo Home Page'),
  );
```
Ada pengecekan kondisi tersebut pada property `theme` ketika state nya `ThemeLightState` akan di kembalikan theme dark dan sebaliknya mengembalikan theme light.

Terus buat juga widget class `MyHomePage`. berikut kodenya:

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return CubitBuilder<ThemeCubit, ThemeState>(
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(
            title: Text(widget.title),
          ),
          body: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Dark Mode:'),
                CupertinoSwitch(
                    value: state is ThemeDarkState,
                    onChanged: (_) {
                      context.cubit<ThemeCubit>().getChangeTheme();
                    }),
              ],
            ),
          ),
        );
      },
    );
  }
}
```

Untuk memanggil event pada cubit ada dua cara yaitu:

Dengan extensions BuildContext.
```dart
context.cubit<ThemeCubit>().getChangeTheme();
```
Tanpa extensions BuildContext
```dart
CubitProvider.of<ThemeCubit>(context).getChangeTheme();
```

Dimana `<ThemeCubit>` adalah nama Cubit nya yang dibuat, dan `getChangeTheme()` method event yang dipanggil.