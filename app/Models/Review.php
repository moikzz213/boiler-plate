<?php

namespace App\Models;

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
}
