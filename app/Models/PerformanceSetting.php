<?php

namespace App\Models;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PerformanceSetting extends Model
{
    use HasFactory;
    protected $guarded = [];

    // public function profiles()
    // {
    //     return $this->hasMany(Profile::class, 'company_id', 'company_id');
    // }
}
