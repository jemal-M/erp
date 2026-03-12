<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $fillable = [
        'customer_id',
        'total_amount',
        'status'
        ];

        public function customer(){
            return $this->belongsTo('App\Models\Customer');
        }
        public function items(){
            return $this->hasMany('App\Models\OrderItem');
        
        }
        public function payment(){
            return $this->hasOne('App\Models\Payment');

        }
}
