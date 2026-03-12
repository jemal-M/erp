<?php

namespace App\Http\Controllers;

use App\Models\SystemLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SystemLogController extends Controller
{
    public function index()
    {
        return Inertia::render("SystemLog/Index");
    }
    public function create()
    {
        return Inertia::render("SystemLog/Create");
    }

    public function store(Request $request)
    {
      $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|confirmed|min:8',
      ]);
      SystemLog::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
      ]);
      return redirect()->route('systemlog.index');
    }

    public function show(SystemLog $systemLog)
    {
        return Inertia::render("SystemLog/Show", [
            'systemlog' => $systemLog
        ]);
    }

    public function edit(SystemLog $systemLog)
    {
        return Inertia::render("SystemLog/Edit", [
            'systemlog' => $systemLog
        ]);
    }

    public function update(Request $request, SystemLog $systemLog)
    {
        $request->validate([
          'name' => 'required|string|max:255',
          'email' => 'required|string|email|max:255|unique:users',
          'password' => 'required|string|confirmed|min:8',
        ]);
        $systemLog->update([
          'name' => $request->name,
          'email' => $request->email,
          'password' => Hash::make($request->password),
        ]);
        return redirect()->route('systemlog.index');
    }

    public function destroy(SystemLog $systemLog)
    {
        $systemLog->delete();
        return redirect()->route('systemlog.index');
    }
    
}
