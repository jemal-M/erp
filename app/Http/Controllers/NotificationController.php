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
    
    public function edit($id)
    {
        return Inertia::render('Notifications/Edit', [
            'notification' => $id
        ]);
    }
    
    public function update(Request $request, $id)
    {
        return redirect()->back();
    }
    
    public function create()
    {
        return Inertia::render('Notifications/Create');
    }
    
    public function store(Request $request)
    {
        return redirect()->back();
    }
    
    public function read()
    {
        return Inertia::render('Notifications/Index', [
            'notifications' => auth()->user()->readNotifications
        ]);
    }
    
    public function unread()
    {
        return Inertia::render('Notifications/Index', [
            'notifications' => auth()->user()->unreadNotifications
        ]);
    }
    
    public function all()
    {
        return Inertia::render('Notifications/Index', [
            'notifications' => auth()->user()->notifications
        ]);
    }
    
}
