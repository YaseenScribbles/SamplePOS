<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'pluid',
        'plucode',
        'pluname',
        'units',
        'costprice',
        'retailprice',
        'discount'
    ];

    protected $table = "productmaster";
}
