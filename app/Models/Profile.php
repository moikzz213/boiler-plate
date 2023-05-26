<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function teams()
    {
        return $this->hasMany(Profile::class, 'superior_ecode', 'ecode');
    }

    public function managed_by()
    {
        return $this->belongsTo(Profile::class, 'superior_ecode', 'ecode');
    }
}
