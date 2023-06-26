<?php

namespace App\Models;

use App\Models\Profile;
use App\Models\KeyPerformanceReview;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function keyReview()
    {
        return $this->hasMany(KeyPerformanceReview::class);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function settings()
    {
        return $this->belongsTo(PerformanceSetting::class, 'performance_settings_id');
    }
}
