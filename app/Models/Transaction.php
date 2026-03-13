<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id', 'account_id', 'amount', 'type', 'description', 'name', 'date', 'category'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
