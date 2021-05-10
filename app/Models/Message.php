<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'sender_id ',
        'receiver_id',
        'chat_id',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }
}
