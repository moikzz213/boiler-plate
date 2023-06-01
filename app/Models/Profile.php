<?php

namespace App\Models;

use App\Models\Company;
use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $guarded = []; 

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function teams()
    {
        return $this->hasMany(Profile::class, 'superior_ecode', 'ecode');
    }

    public function managed_by()
    {
        return $this->belongsTo(Profile::class, 'superior_ecode', 'ecode');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    } 
}
