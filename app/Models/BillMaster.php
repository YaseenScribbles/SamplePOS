<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillMaster extends Model
{
    use HasFactory;

    protected $fillable = [
        'BillID',
        'BillNo',
        'BillDt',
        'BillTime',
        'TermID',
        'TotQty',
        'TotAmt',
        'DisPerc',
        'DisAmt',
        'CustomerID',
        'RefNo',
        'Remarks',
        'ShopID',
        'UserID',
        'ISUpdated',
        'WHID',
    ];

    protected $table = 'BillMaster';
}
