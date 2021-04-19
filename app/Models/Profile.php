<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Testing\Fluent\Concerns\Has;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type_of_education',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function universities(): HasMany{
        return $this->hasMany(UserUniversity::class);
    }

    public function schools(): HasMany{
        return $this->hasMany(UserSchool::class);
    }
}
