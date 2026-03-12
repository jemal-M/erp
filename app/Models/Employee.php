<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id', 'department_id', 'position','salary','hire_date'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    
    }
    public function department(){
        $this->belongsTo(Department::class);
    }
    public function attendances(){
        return $this->hasMany(Attendance::class);

    }
    public function leaves(){
        return $this->hasMany(LeaveRequest::class);

    }
    public function payrolls(){
        return $this->hasMany(Payroll::class);
    }
}
