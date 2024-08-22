<?php

use App\Http\Resources\CustomerCollection;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\SalesPersonCollection;
use App\Http\Resources\ShopResource;
use App\Models\Customer;
use App\Models\SalesPerson;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products/{shopid}', function ($shopid) {

    $sql = "SELECT M.PluID,M.Plucode,M.Pluname,M.Units,P.CostPrice,P.RetailPrice,P.Discount, 1 SalesPersonCode,1 Qty
    FROM PRODUCTMASTER M
    INNER JOIN PRICEMASTER P ON M.PLUID = P.PLUID AND P.SHOPID = {$shopid}";

    $products = DB::select($sql);

    return new ProductCollection($products);
});

Route::get('/customers/{shopid}', function ($shopid) {

    $customers = Customer::where('LocationID', '=', $shopid)->get();

    return new CustomerCollection($customers);
});

Route::get('/salespersons/{shopid}', function ($shopid) {

    $salespersons = SalesPerson::where('ShopId', '=', $shopid)->get();

    return new SalesPersonCollection($salespersons);
});

Route::get('/bill/{shopid}/{termid}', function ($shopid, $termid, Request $request) {

    $dates = DB::select("select param_value from settings where param_name in ('BeginDate','EndDate')");
    dd($dates);
});

Route::get('/shops/{shopid}', function ($shopid) {

    $shop = Shop::where('ShopID', '=', $shopid)->get();

    return ShopResource::collection($shop);
});
