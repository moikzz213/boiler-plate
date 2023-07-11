<?php

namespace App\Models;

use App\Models\Review;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
