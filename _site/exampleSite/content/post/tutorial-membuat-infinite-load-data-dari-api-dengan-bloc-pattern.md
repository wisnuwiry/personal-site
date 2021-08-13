---
title: "Tutorial Flutter Membuat Infinite Load Data Dari Api Dengan Bloc Pattern"
date: 2020-06-29T21:29:51+07:00
tags: ["flutter", "bloc"]
aliases:
 - /post/tutorial-membuat-inifinite-load-data-dari-api-dengan-bloc-pattern/
images: [https://i.ibb.co/KhQFBD2/featured.png]
---

Halo apa kabar semua? kali ini Aku akan membahas tentang **Tutorial Membuat Infinite List Load Data dari API menggunakan Bloc Pattern**, jangan berlama-lama lagi ayo kita mulai sebuah experiments.

Untuk memulai experiment kali ini teman-teman harus mempunyai beberapa requirement yang harus dipenuhi yaitu:

1. Flutter SDK
2. Text Editor/IDE (Android Studio, VS Code)
3. Extensions Dart & FLutter

Jika teman-teman belum bisa memenuhi beberapa kriteria tersebut bisa terlebih dahulu melengkapinya, berikut link dokumentasi di [Flutter.dev](//flutter.dev/docs/get-started/install).


Saya anggap tahapan tersebut sudah terpenuhi ya.

Mari kita membuat sebuah project baru **Flutter** kita kali ini dengan nama `flutter_infinite`.

```bash
flutter create flutter_infinite
```

Teman-teman bisa menggunakan command perintah tersebut bila ingin membuat project lewat CLI/CMD, atau bisa juga lewat langsung di IDE tanpa mengetikkan command tersebut.

Tunggu sampai project pembuatan project selesai, kemudian open ke Text Editor atau IDE teman masing-masing.

Setelah selesai ada beberapa library atau dependency yang harus kalian install di project Flutter kalian berikut daftar nya:

```yaml
flutter_bloc: ^4.0.1
equatable: ^1.2.0
http: ^0.12.1
lazy_load_scrollview: ^1.1.0
```

Pada saat menulis blog ini versi dependency tersebut, Mungkin teman-teman pada saat membaca ini versi bisa saja berubah. Saran aku gunakan versi terbaru dari versi tersebut, jika ada pembaruan. Dan jangan lupa jalankan perintah `flutter pub get` untuk menginstallnya.

Pada kesempatan ini aku ingin mencoba menggunakan data dari https://jsonplaceholder.typicode.com/ , untuk data dari API ini hanya optional saja, sesuaikan dengan data dari teman-teman aja ya?...

Langkah selanjutnya kita buat dulu sebuah Bloc Pattern nya sebagai state managementnya. Teman-teman bisa menggunakan extensions **flutter_bloc** generator support di [VS Code](//marketplace.visualstudio.com/items?itemName=FelixAngelov.bloc) dan [Android Studio](//plugins.jetbrains.com/plugin/12411-flutter-bloc-generator). Ini sifatnya hanya opsi saja, karena ini tools saja yang berguna untuk mempermudahkan.

Jika teman-teman menggunakan extension bloc generator, teman-teman tinggal `Klik Kanan>Bloc: New Bloc> {Isi nama Bloc nya}`. Tapi pada kali ini saya kasih nama Bloc nya yaitu `InifiniteLoad`. Berikut hasil kode yang telah di generaten.

**infinite_load_bloc.dart**
```dart
import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'infinite_load_event.dart';
part 'infinite_load_state.dart';

class InfiniteLoadBloc extends Bloc<InfiniteLoadEvent, InfiniteLoadState> {
  @override
  InfiniteLoadState get initialState => InfiniteLoadInitial();

  @override
  Stream<InfiniteLoadState> mapEventToState(
    InfiniteLoadEvent event,
  ) async* {
    // TODO: implement mapEventToState
  }
}
```

**infinite_load_event.dart**
```dart
part of 'infinite_load_bloc.dart';

abstract class InfiniteLoadEvent extends Equatable {
  const InfiniteLoadEvent();
}
```

**infinite_load_state.dart**
```dart
part of 'infinite_load_bloc.dart';

abstract class InfiniteLoadState extends Equatable {
  const InfiniteLoadState();
}

class InfiniteLoadInitial extends InfiniteLoadState {
  @override
  List<Object> get props => [];
}

```

Langkah selanjutnya kita buat data model terlebih dahulu, teman-teman bisa menggunakan tool dari [QuickType](https://app.quicktype.io/) Json to Dart. Pada kali ini saya akan menggunakan endpoint http://jsonplaceholder.typicode.com/photos ini. Untuk membuat Data model menggunakan generator dari QuickType, buka dulu link API nya terus copy content JSON API, ke app.quicktype.io. Terus jadi deh.

Berikut hasil generate dari JSON ke data model dart:

**photos_model.dart**
```dart
import 'dart:convert';

List<PhotosModel> photosModelFromJson(String str) => List<PhotosModel>.from(
    json.decode(str).map((x) => PhotosModel.fromJson(x)));

String photosModelToJson(List<PhotosModel> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PhotosModel {
  PhotosModel({
    this.albumId,
    this.id,
    this.title,
    this.url,
    this.thumbnailUrl,
  });

  final int albumId;
  final int id;
  final String title;
  final String url;
  final String thumbnailUrl;

  factory PhotosModel.fromJson(Map<String, dynamic> json) => PhotosModel(
        albumId: json["albumId"],
        id: json["id"],
        title: json["title"],
        url: json["url"],
        thumbnailUrl: json["thumbnailUrl"],
      );

  Map<String, dynamic> toJson() => {
        "albumId": albumId,
        "id": id,
        "title": title,
        "url": url,
        "thumbnailUrl": thumbnailUrl,
      };
}
```


Setelah itu kita buat file terlebih dahulu dengan nama **photo_repository.dart**. Untuk request dari client ke server API. Berikut code dari **PhotoRepository**:

```dart
import 'package:http/http.dart' as http;

import 'photos_model.dart';

class PhotoRepository {
  Future<List<PhotosModel>> getPhotos({int start, int limit = 10}) async {
    final response = await http.get(
        "http://jsonplaceholder.typicode.com/photos?_star=$start&_limit=$limit");
    if (response.statusCode == 200) {
      return photosModelFromJson(response.body);
    }else{
      return null;
    }
  }
}
```


Pada endpoint tersebut JSON placeholder menyediakan params `start` dan `limit` untuk membuat pagination. Maka dari itu bisa digunakan sebagai experiment kali ini untuk membuat infinite load scrollview.

Pada langkah kali ini kita telah berhasil membuat Bloc, Data Model, dan Repository.

Oh, ya untuk Bloc yang telah digenerate sifatnya masih abstract, belum kita implement semua fungsinya, berikut hasilnya:

**infinite_load_state.dart**
```dart
part of 'infinite_load_bloc.dart';

abstract class InfiniteLoadState extends Equatable {
  const InfiniteLoadState();
  @override
  List<Object> get props => [];
}

class InfiniteLoadLoading extends InfiniteLoadState {}

class InfiniteLoadMoreLoading extends InfiniteLoadState {}

class InfiniteLoadLoaded extends InfiniteLoadState {
  final List<PhotosModel> data;
  final int count;

  InfiniteLoadLoaded({@required this.data, @required this.count});
  @override
  List<Object> get props => [data, count];
}

class InfiniteLoadError extends InfiniteLoadState {}
```

**infinite_load_event.dart**
```dart
part of 'infinite_load_bloc.dart';

abstract class InfiniteLoadEvent extends Equatable {
  const InfiniteLoadEvent();

  @override
  List<Object> get props => [];
}

class GetInfiniteLoad extends InfiniteLoadEvent {}

class GetMoreInfiniteLoad extends InfiniteLoadEvent {
  final int start, limit;

  GetMoreInfiniteLoad({@required this.start, this.limit});

  @override
  List<Object> get props => [start, limit];
}
```

**infinite_load_bloc.dart**
```dart
import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:rxdart/rxdart.dart';

import '../photo_repository.dart';
import '../photos_model.dart';

part 'infinite_load_event.dart';
part 'infinite_load_state.dart';

class InfiniteLoadBloc extends Bloc<InfiniteLoadEvent, InfiniteLoadState> {
  PhotoRepository _repository = PhotoRepository();
  List<PhotosModel> _data = [];
  int _currentLenght;
  bool _isLastPage;

  @override
  InfiniteLoadState get initialState => InfiniteLoadLoading();

  @override
  Stream<Transition<InfiniteLoadEvent, InfiniteLoadState>> transformEvents(
      Stream<InfiniteLoadEvent> events, transitionFn) {
    return super.transformEvents(
        events.debounceTime(Duration(milliseconds: 500)), transitionFn);
  }

  @override
  Stream<InfiniteLoadState> mapEventToState(
    InfiniteLoadEvent event,
  ) async* {
    if (event is GetInfiniteLoad) {
      yield* _mapEventToStateInfiniteLoad(10);
    } else if (event is GetMoreInfiniteLoad) {
      yield* _mapEventToStateInfiniteLoad(event.start, event.limit);
    }
  }

  Stream<InfiniteLoadState> _mapEventToStateInfiniteLoad(int start,
      [int limit]) async* {
    try {
      if (state is InfiniteLoadLoaded) {
        _data = (state as InfiniteLoadLoaded).data;
        _currentLenght = (state as InfiniteLoadLoaded).count;
      }

      if (_currentLenght != null) {
        yield InfiniteLoadMoreLoading();
      } else {
        yield InfiniteLoadLoading();
      }

      if (_currentLenght == null || _isLastPage == null || !_isLastPage) {
        final reqData = await _repository.getPhotos(start: start, limit: limit);

        if (reqData.isNotEmpty) {
          _data.addAll(reqData);
          if (_currentLenght != null) {
            _currentLenght += reqData.length;
          } else {
            _currentLenght = reqData.length;
          }
        } else {
          _isLastPage = true;
        }
      }
      yield InfiniteLoadLoaded(data: _data, count: _currentLenght);
    } catch (e) {
      yield InfiniteLoadError();
    }
  }
}

```

**Note:** Jangan lupa install dependency rxdart dulu ya!

Pada override method ini ini untuk menentukan/menghandle transition per event di Bloc.

```dart
  @override
  Stream<Transition<InfiniteLoadEvent, InfiniteLoadState>> transformEvents(
      Stream<InfiniteLoadEvent> events, transitionFn) {
    return super.transformEvents(
        events.debounceTime(Duration(milliseconds: 500)), transitionFn);
  }
```

Dan pada kode tersebut pada pergantian event dikasih delay 500 milliseconds / 0.5 detik.

Sampai saat ini kita telah berhasil membuat Bloc, Model, Repository. Terus apa yang harus dilakukan lagi?

Nah sekarang tinggal kita implementasi Bloc nya pada UI.

Sekarang kita buat Card item nya, kita namai dengan PhotoItem, berikut kodenya:

**photo_item.dart**
```dart
import 'package:flutter/material.dart';

import 'photos_model.dart';

class PhotoItem extends StatelessWidget {
  final PhotosModel data;

  const PhotoItem({Key key, @required this.data}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
          Image.network(
            '${data.thumbnailUrl}',
            fit: BoxFit.cover,
            height: 150,
          ),
          SizedBox(height: 8.0),
          Text(data.title),
        ]),
      ),
    );
  }
}

```

Sekarang tinggal implement semua di `main.dart`, untuk lokasi penempatan sesuaikan dengan kasus teman-teman aja, tapi kalau ingin mengikuti tutorial ini boleh aja di samain.

Pertama kita buat dulu Bloc Providernya sebelum kita menjalankan Bloc Buildernya. Taruh BlocProvider di parent BlocBuilder boleh di widget root project ataupun parentnya. Dengan menggunakan Struktur seperti ini:

```dart
BlocProvider<NamaBloc>(
  create: (context) => NamaBloc(),
  child: ChildWidget(),
)
```

Berikut contoh kodenya:

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: BlocProvider(
          create: (context) => InfiniteLoadBloc()..add(GetInfiniteLoad()),
          child: MyHomePage(),
        ));
  }
}
```

Pada kasus tersebut pada saat initialisasi BlocProvider saya langsung panggil event yaitu **GetInfiniteLoad**. Dan pada contoh kali ini saya hanya fokus pada file **main.dart** saja , maka saya taruh BlocProvider di widget root project.

**Note:** Penempatan BlocProvider pada root project seperti di atas state di simpan di semua page project, bila teman-teman ingin hanya spesifik yang boleh akses maka taruh BlocProvider di parent tingkat satu atau lebih, yang penting tidak bisa di akses di widget yang dikecualikan.

Dan berikut kode dari HomePage.

```dart
class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  InfiniteLoadBloc _bloc;
  int _currentLenght;
  List<PhotosModel> _data = [];

  void _loadMoreData() {
    _bloc.add(GetMoreInfiniteLoad(start: _currentLenght, limit: 10));
  }

  @override
  void initState() {
    _bloc = BlocProvider.of<InfiniteLoadBloc>(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Infinite Load ScrollView'),
      ),
      body: BlocBuilder<InfiniteLoadBloc, InfiniteLoadState>(
        builder: (context, state) {
          if (state is InfiniteLoadLoaded || state is InfiniteLoadMoreLoading) {
            if (state is InfiniteLoadLoaded) {
              _data = state.data;
              _currentLenght = state.count;
            }
            return _buildListPhotos(state);
          } else if (state is InfiniteLoadLoading) {
            return Center(child: CircularProgressIndicator());
          } else {
            return Text('Error');
          }
        },
      ),
    );
  }

  Widget _buildListPhotos(InfiniteLoadState state) {
    return LazyLoadScrollView(
      child: ListView(
        children: [
          ListView.builder(
              shrinkWrap: true,
              itemCount: _data.length,
              physics: NeverScrollableScrollPhysics(),
              itemBuilder: (_, i) {
                return PhotoItem(data: _data[i]);
              }),
          // Loading indicator more load data
          (state is InfiniteLoadMoreLoading)
              ? Center(child: CircularProgressIndicator())
              : SizedBox(),
        ],
      ),
      onEndOfPage: _loadMoreData,
    );
  }
}
```

Untuk memanggil suatu event pada Bloc, Anda perlu menggunakan keyword/method `add()`.

Jika Bloc variable belum di deklarasikan terlebih dahulu bisa langsung menggunakan cara ini:

```dart
BlocProvider.of<InfiniteLoadBloc>(context).add(GetMoreInfiniteLoad(start: _currentLenght, limit: 10));
```

Bisa juga seperti ini:

```dart
_bloc = BlocProvider.of<InfiniteLoadBloc>(context);
_bloc.add(GetMoreInfiniteLoad(start: _currentLenght, limit: 10));
```

```dart
LazyLoadScrollView(
  child: ...,
  onEndOfPage: () {
    // action
  },
);
```

Dan pada widget `LazyLoadScrollView`, pada property `onEndOfPage`, digunakan untuk event ketika scroll view sudah mencapai bawah.

Sampai proses saat ini, sudah melalui semua tahapnya, langkah berikutnya tinggal Run aja...

Berikut contoh preview nya:

{{<video url="https://i.imgur.com/GCsXHAk.mp4" >}}

Source code bisa teman-teman akses di Github, bisa klik button di bawah ini:

<a class="btn" href="https://github.com/wisnuwiry/flutter-infinity-load">Github</a>

Reference:

- https://bloclibrary.dev/
- https://flutter.dev/