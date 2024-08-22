<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'BillID',
        'BillDt',
        'PluID',
        'Qty',
        'RQty',
        'Rate',
        'Amount',
        'DisPerc',
        'DisAmt',
        'ORate',
        'OBillID',
        'BillMode',
        'TermID',
        'ShopID',
        'Sno',
        'ISUpdated',
        'WHID',
    ];

    protected $table = 'BillDetails';
}
