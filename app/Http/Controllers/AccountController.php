<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        return Inertia::render("Account/Index");
    }
    
    public function create()
    {
   return  Inertia::render("Account/Create");

    }
    public function update(Request $request)
    {
        $request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

      $request->user()->update($request->only('name','email'));  
    }

    public function destroy(Request $request)
    {
        $request->user()->delete();

        return redirect('/')->with('message', 'Account deleted successfully!');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        $user = User::create($request->only('name', 'email'));
        
        return redirect()->back()->with('message', 'User created successfully!');
    }

    public function show(User $user)
    {
        return Inertia::render("Account/Show", [
            'user' => $user
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render("Account/Edit", [
            'user' => $user
        ]);
    }

    public function updatepassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|confirmed|min:8',
        ]);

        $request->user()->update([
            'password' => bcrypt($request->password),
        ]);

        return redirect()->back()->with('message', 'Password updated successfully!');
    }

    public function changepassword()
    {
        return Inertia::render("Account/changepassword");
    }

    public function profile()
    {
        return Inertia::render("Account/Profile");
    }

    public function avatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time().'.'.$request->avatar->extension();
        $request->avatar->move(public_path('images'), $imageName);

        $request->user()->update([
            'avatar' => $imageName,
        ]);

        return redirect()->back()->with('message', 'Avatar updated successfully!');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt|max:2048',
        ]);

        $fileName = time().'.'.$request->file->extension();
        $request->file->move(public_path('uploads'), $fileName);

        return redirect()->back()->with('message', 'File uploaded successfully!');
    }

    public function download($file)
    {
        if (!file_exists(public_path('uploads/'.$file))) {
            return redirect()->back()->with('error', 'File not found!');
        }
        if (auth()->user()->role == 'user') {
            return redirect()->back()->with('error', 'You are not authorized to download this file!');
        }
        if (auth()->user()->role == 'admin') {
            return response()->download(public_path('uploads/'.$file));
        }
        return response()->download(public_path('uploads/'.$file));
    }

    public function delete($file)
    {
        if (!file_exists(public_path('uploads/'.$file))) {
            return redirect()->back()->with('error', 'File not found!');
        }
        if (auth()->user()->role == 'user') {
            return redirect()->back()->with('error', 'You are not authorized to delete this file!');
        }
        if (auth()->user()->role == 'admin') {
            unlink(public_path('uploads/'.$file));
            return redirect()->back()->with('message', 'File deleted successfully!');
        }
        unlink(public_path('uploads/'.$file));
        return redirect()->back()->with('message', 'File deleted successfully!');
    }
    
}
