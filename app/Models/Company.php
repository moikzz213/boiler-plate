<?php

namespace App\Models;

use App\Models\Log;
use App\Models\Profile;
use App\Models\PerformanceSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function logs()
    {
        return $this->morphToMany(Log::class, 'loggable');
    } 

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }
}
