<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Permissions/Index', [
            'permissions' => auth()->user()->getAllPermissions()
        ]);
    }
    public function create()
    {
        return Inertia::render('Permissions/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:permissions,name'
        ]);
        abort_if(!auth()->user()->hasPermission('create permission'), 403);
        $permission = auth()->user()->givePermissionTo($request->name);
        return redirect()->back();
    }
    public function destroy($permission)
    {
        abort_if(!auth()->user()->hasPermission('delete permission'), 403);
        $permission = Permission::find($permission);
        $permission->delete();
        return redirect()->back();
    }
    public function assignRole(Request $request)
    {
        abort_if(!auth()->user()->hasPermission('assign role'), 403);
        $request->validate([
            'role' => 'required',
            'permission' => 'required'
        ]);
        $role = Role::find($request->role);
        $permission = Permission::find($request->permission);
        $role->givePermissionTo($permission);
        return redirect()->back();
    }
    public function removePermission(Request $request)
    {
        abort_if(!auth()->user()->hasPermission('remove permission'), 403);
        $request->validate([
            'role' => 'required',
            'permission' => 'required'
        ]);
        $role = Role::find($request->role);
        $permission = Permission::find($request->permission);
        $role->revokePermissionTo($permission);
        return redirect()->back();
    }
     
}
