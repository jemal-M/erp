<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render("Setting/index");
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
        ]);

        $user = auth()->user();
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->save();

        return redirect()->back()->with('message', 'Profile updated successfully.');
    }
    
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return redirect()->back()->withErrors(['current_password' => 'The provided password does not match our records.']);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return redirect()->back()->with('message', 'Password changed successfully.');
    }
  public function edit($id){
     $user = \App\Models\User::find($id);
     return Inertia::render("Setting/Edit", [
        "user" => $user
    ]);
  }

  public function updatepassword(Request $request,$id)
    {
        $user = \App\Models\User::find($id);
        $validatedData = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user->password = Hash::make($request->password);
        $user->save();
        return redirect('/setting');
    }

    public function updateprofile(Request $request, $id)
    {
        $user = \App\Models\User::find($id);
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        return redirect('/setting');
    }

    public function destroy($id)
    {
        $user = \App\Models\User::find($id);
        $user->delete();
        return redirect('/setting');
    }
    public function show($id)
    {
        $user = \App\Models\User::find($id);
        return Inertia::render("Setting/Show", [
            "user" => $user
        ]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = new \App\Models\User();
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->password = Hash::make($validatedData['password']);
        $user->save();

        return redirect('/setting');
    }
    public function search(Request $request)
    {
        $search = $request->get('search');
        $users = \App\Models\User::where('name', 'like', '%' . $search . '%')
            ->orWhere('email', 'like', '%' . $search . '%')
            ->get();
        return Inertia::render("Setting/index", [
            "users" => $users
        ]);
    }
    public function export()
    {
        $users = \App\Models\User::all();
        $csvData = [];

        // Add header row
        $csvData[] = ['Name', 'Email'];

        // Add data rows
        foreach ($users as $user) {
            $csvData[] = [$user->name, $user->email];
        }

        $csvContent = '';
        foreach ($csvData as $row) {
            $csvContent .= implode(',', $row) . "\n";
        }

        $fileName = 'users.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ];

        return response()->make($csvContent, 200, $headers);
    }
    public function import(Request $request)
    {
        $file = $request->file('csv_file');
        $filePath = $file->getRealPath();

        // Read CSV file
        $csvData = array_map('str_getcsv', file($filePath));
        $header = array_shift($csvData); // Remove header row

        // Process each row
        foreach ($csvData as $row) {
            $userData = [
                'name' => $row[0],
                'email' => $row[1],
                'password' => Hash::make('password'), // Set default password or handle accordingly
            ];

            // Create user
            \App\Models\User::create($userData);
        }

        return redirect('/setting')->with('message', 'Users imported successfully.');
    }
    public function dashboard()
    {
        $userCount = \App\Models\User::count();
        $recentUsers = \App\Models\User::latest()->take(5)->get();

        return Inertia::render("Setting/Dashboard", [
            "userCount" => $userCount,
            "recentUsers" => $recentUsers
        ]);
    }
    public function list()
    {
        $users = \App\Models\User::all();
        return Inertia::render("Setting/List", [
            "users" => $users
        ]);
    }
    public function profile()
    {
        $user = auth()->user();
        return Inertia::render("Setting/Profile", [
            "user" => $user
        ]);
    }
   
    public function updatepassworduser(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return redirect()->back()->withErrors(['current_password' => 'The provided password does not match our records.']);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return redirect('/profile')->with('message', 'Password changed successfully.');
    }
   public function updateprofileuser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
        ]);

        $user = auth()->user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return redirect('/profile')->with('message', 'Profile updated successfully.');
    }
   
    public function updatechangepassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = auth()->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return redirect()->back()->withErrors(['current_password' => 'The provided password does not match our records.']);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return redirect('/setting')->with('message', 'Password changed successfully.');
    }
    public function updatechangeprofile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
        ]);

        $user = auth()->user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();

        return redirect('/setting')->with('message', 'Profile updated successfully.');
    }
    
}
