<?php

namespace App\Models;

use App\Models\Review;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KeyPerformanceReview extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function keyReview()
    {
        return $this->belongsTo(Review::class);
    }
}
