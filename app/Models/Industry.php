<?php

namespace App\Models;

use App\Models\Log;
use Illuminate\Database\Eloquent\Model;
use App\Models\KeyPerformanceIndicatorMaster;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Industry extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function logs()
    {
        return $this->morphToMany(Log::class, 'loggable');
    }

    public function custom_kpis()
    {
        return $this->hasMany(KeyPerformanceIndicatorMaster::class);
    }
}
