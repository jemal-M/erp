<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryAdjustment extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'reason'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
