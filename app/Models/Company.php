<?php

namespace App\Models;

use App\Models\PerformanceSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function settings()
    {
        return $this->hasMany(PerformanceSetting::class);
    }
}
