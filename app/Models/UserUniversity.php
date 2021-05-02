<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserUniversity extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'university_id',
        'name',
        'major',
        'finished',
    ];

    public function profile(): BelongsTo{
        return $this->belongsTo(Profile::class);
    }
}
