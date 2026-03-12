<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Notifications/Index');
    }

    public function show($id)
    {
        return Inertia::render('Notifications/Show', [
            'notification' => $id
        ]);
    }
    public function markAsRead(Request $request)
    {
        auth()->user()->unreadNotifications->find($request->id)->markAsRead();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();
    }

    public function destroy($id)
    {
        auth()->user()->notifications->find($id)->delete();
    }

    public function clearAll()
    {
        auth()->user()->notifications()->delete();
    }

    public function unreadCount()
    {
        return ['count' => auth()->user()->unreadNotifications->count()];
    }
    
}
