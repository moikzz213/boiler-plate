<?php

namespace App\Models;

use App\Models\Log;
use App\Models\Profile;
use App\Models\Industry;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KeyPerformanceIndicatorMaster extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function logs()
    {
        return $this->morphToMany(Log::class, 'loggable');
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class, 'profile_ecode', 'ecode');
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }
}
