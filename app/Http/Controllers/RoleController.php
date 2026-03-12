<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
  public function index()
  {
    return Inertia::render("Role/Index");
  }

  public function create()
  {
    return Inertia::render("Role/Create");
  }
  public function edit($id){
    $role = \App\Models\Role::find($id);
    return Inertia::render("Role/Edit",[
      'id'=>$id,
      'role'=>$role
    ]);
  }

  public function show($id)
  {
    $role = \App\Models\Role::find($id);
    return Inertia::render("Role/Show", [
      'id' => $id,
      'role' => $role
    ]);
  }

  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|unique:roles,name',
      'display_name' => 'required|unique:roles,display_name',
      'description' => 'nullable'
    ]);

    \App\Models\Role::create($request->all());

    return redirect()->route('role.index')->with('message', 'Role Created Successfully');
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'name' => 'required|unique:roles,name,' . $id,
      'display_name' => 'required|unique:roles,display_name,' . $id,
      'description' => 'nullable'
    ]);

    $role = \App\Models\Role::find($id);
    $role->update($request->all());

    return redirect()->route('role.index')->with('message', 'Role Updated Successfully');
  }

  public function destroy($id)
  {
    \App\Models\Role::destroy($id);
    return redirect()->route('role.index')->with('message', 'Role Deleted Successfully');
  }

  public function givePermission($id){
    $role = \App\Models\Role::find($id);
    $permissions = \App\Models\Permission::all();
    return Inertia::render("Role/GivePermission",[
      'role'=>$role,
      'permissions'=>$permissions
    ]);
  }
  
}
