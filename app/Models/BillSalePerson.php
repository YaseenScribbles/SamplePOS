<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillSalePerson extends Model
{
    use HasFactory;

    protected $fillable = [
        'BillId',
        'SPID',
        'PluId',
        'ShopId',
    ];

    protected $table = 'BillSalePersons';
}
