<?php

namespace App\Listeners;

use App\Events\ChangeChatInfo;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendChangeChatInfoNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ChangeChatInfo  $event
     * @return void
     */
    public function handle(ChangeChatInfo $event)
    {
        //
    }
}
