<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get the role associated with the user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the employee profile associated with the user.
     */
    public function employee()
    {
        return $this->hasOne(Employee::class);
    }

    /**
     * Get the activity logs for the user.
     */
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    /**
     * Get the audit logs for the user.
     */
    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }

    /**
     * Get the permissions associated with the user through roles.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_user')
            ->withPivot('role_id')
            ->withTimestamps();
    }

    /**
     * Check if the user has a specific permission.
     */
    public function hasPermission(string $permission): bool
    {
        // Check direct permissions
        if ($this->permissions->contains('name', $permission)) {
            return true;
        }

        // Check permissions through role
        if ($this->role && $this->role->permissions->contains('name', $permission)) {
            return true;
        }

        return false;
    }

    /**
     * Get all permissions for the user (direct and through role).
     */
    public function getAllPermissions()
    {
        $permissions = collect();

        // Get direct permissions
        $permissions = $permissions->merge($this->permissions);

        // Get permissions through role
        if ($this->role) {
            $permissions = $permissions->merge($this->role->permissions);
        }

        return $permissions->unique('id')->values();
    }

    /**
     * Give a permission to the user directly.
     */
    public function givePermissionTo(string $permissionName): self
    {
        $permission = Permission::firstOrCreate(['name' => $permissionName]);
        $this->permissions()->syncWithoutDetaching($permission);
        return $this;
    }
}
