<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->PluID,
            'barcode' => $this->Plucode,
            'description' => $this->Pluname,
            'units' => $this->Units,
            'costPrice' => $this->CostPrice,
            'retailPrice' => $this->RetailPrice,
            'discount' => $this->Discount,
            'salesPersonCode' => $this->SalesPersonCode,
            'qty' => $this->Qty
        ];
    }
}
