<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function industry()
    {
        return $this->morphedByMany(Industry::class, 'loggable');
    }

    public function keyPerformanceIndicatorMaster()
    {
        return $this->morphedByMany(KeyPerformanceIndicatorMaster::class, 'loggable');
    }

    public function settings()
    {
        return $this->morphedByMany(PerformanceSetting::class, 'loggable');
    }

    public function review()
    {
        return $this->morphedByMany(Review::class, 'loggable');
    }

    public function profile()
    {
        return $this->morphedByMany(Profile::class, 'loggable');
    }

    public function weightage()
    {
        return $this->morphedByMany(Weightage::class, 'loggable');
    }

    public function measures()
    {
        return $this->morphedByMany(Measure::class, 'loggable');
    }
}
