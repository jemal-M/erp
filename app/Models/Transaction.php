<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'account_id', 'amount', 'type', 'description'
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
