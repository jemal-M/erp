<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    protected $fillable = [
        'supplier_id', 'order_daye', 'total_amount','status'
    ];
    public function suplier(){
        return $this->belongsTo(Supplier::class);
    
    }

    public function items(){
        return $this->hasMany(PurchaseOrderItem::class);
    }
}
