<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];

    /**
     * Get the users belonging to this role.
     */
    public function users(){
        return $this->hasMany(User::class);
    }

    /**
     * Get the permissions belonging to this role.
     */
    public function permissions(){
        return $this->belongsToMany(Permission::class, 'permission_role')
            ->withTimestamps();
    }

    /**
     * Give a permission to this role.
     */
    public function givePermissionTo($permission): self
    {
        if (is_numeric($permission)) {
            $permission = Permission::find($permission);
        }
        if (is_string($permission)) {
            $permission = Permission::find($permission) ?? Permission::firstOrCreate(['name' => $permission]);
        }
        $this->permissions()->syncWithoutDetaching($permission);
        return $this;
    }

    /**
     * Revoke a permission from this role.
     */
    public function revokePermissionTo($permission): self
    {
        if (is_numeric($permission)) {
            $permission = Permission::find($permission);
        }
        if (is_string($permission)) {
            $permission = Permission::where('name', $permission)->first();
        }
        if ($permission) {
            $this->permissions()->detach($permission);
        }
        return $this;
    }
}
