<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function fetchNotifications(){ 
        $query = Notification::get(); 
        return response()->json( $query , 200);
    }

    public function saveNotifications(Request $request){
        $query = Notification::where('meta_key', $request['meta_key'])->first(); 
        $query->update(['meta_value' => $request['meta_value']]);
        return response()->json(  $query , 200);

    }
}
