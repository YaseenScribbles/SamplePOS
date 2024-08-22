<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'BillID',
        'ShopID',
        'PaymentID',
        'PaymentDesc',
        'Paid',
        'Refund',
        'RefNo',
        'RefDt',
        'Sno',
        'TermID',
        'BillDt',
        'IsUpdated',
        'WHID',
    ];

    protected $table = 'BillPayments';

}
