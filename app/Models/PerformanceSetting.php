<?php

namespace App\Models;

use App\Models\Company;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class PerformanceSetting extends Model
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
}
