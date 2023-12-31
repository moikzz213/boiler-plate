<?php

namespace App\Models;

use App\Models\Review;
use App\Models\Company;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Models\KeyPerformanceIndicatorMaster;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function logs()
    {
        return $this->morphToMany(Log::class, 'loggable');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function teams()
    {
        return $this->hasMany(Profile::class, 'superior_ecode', 'ecode');
    }

    public function slave_ecode()
    {
        return $this->hasMany(Profile::class, 'slave_ecode', 'ecode');
    }

    public function managed_by()
    {
        return $this->belongsTo(Profile::class, 'superior_ecode', 'ecode');
    } 

}
