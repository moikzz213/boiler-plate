<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
use App\Models\Companies;
use App\Models\Review; 
class Profile extends Model
{
    use HasFactory;

    protected $guarded = []; 

    public function company()
    {
        return $this->belongsTo(Companies::class);
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
