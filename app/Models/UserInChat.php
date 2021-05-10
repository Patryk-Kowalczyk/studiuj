<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserInChat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];
    public $timestamps = false;

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
