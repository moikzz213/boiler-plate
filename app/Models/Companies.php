<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;
class Companies extends Model
{
    use HasFactory;
    protected $guarded = []; 

    public function profile()
    {
        return $this->belongsToMany(Profile::class);
    }
}
