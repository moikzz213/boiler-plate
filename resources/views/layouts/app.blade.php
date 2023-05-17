<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Mel') }}</title>

    <!-- Fonts -->
    {{-- <link rel="dns-prefetch" href="//fonts.gstatic.com"> --}}
    {{-- <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet"> --}}


    {{-- <link rel="icon" href="{{ asset('public/images/fav.png') }}" sizes="32x32">
    <link rel="icon" href="{{ asset('public/images/fav.png') }}" sizes="192x192">
    <link rel="apple-touch-icon" href="{{ asset('public/images/fav.png') }}">
    <meta name="msapplication-TileImage" content="{{ asset('public/images/fav.png') }}"> --}}

    <link rel="icon" href="{{ Vite::asset('../../../public/assets/images/fav.png') }}" sizes="32x32">
    <link rel="icon" href="{{ Vite::asset('../../../public/assets/images/fav.png') }}" sizes="192x192">
    <link rel="apple-touch-icon" href="{{ Vite::asset('../../../public/assets/images/fav.png') }}">
    <meta name="msapplication-TileImage" content="{{ Vite::asset('../../../public/assets/images/fav.png') }}">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>

<body>
    <div id="app">
        <v-app style="background-color: #fafafa">
            <App />
        </v-app>
    </div>
</body>

</html>
