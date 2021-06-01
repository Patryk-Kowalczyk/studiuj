<?php

namespace App\Http\Controllers\Zoom;

use App\Http\Controllers\Controller;
use App\Traits\ZoomJWT;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
    use ZoomJWT;

    const MEETING_TYPE_SCHEDULE = 2;

    public function create()
    {
        $path = 'users/me/meetings';
        $response = $this->zoomPost($path, [
            'type' => self::MEETING_TYPE_SCHEDULE,
            'start_time' => Carbon::Now(),
            'duration' => 360,
            'settings' => [
                'host_video' => false,
                'participant_video' => false,
                'waiting_room' => true,
            ]
        ]);
        $data=json_decode($response->body(), true);
        return [
            'success' => $response->status() === 201,
            'start_url' => $data['start_url'],
            'join_url' => $data['join_url'],
        ];
    }
}
