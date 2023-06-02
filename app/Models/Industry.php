<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\KeyPerformanceIndicatorMaster;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Industry extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function custom_kpis()
    {
        return $this->hasMany(KeyPerformanceIndicatorMaster::class);
    }
}
