<?php

namespace App\GraphQL\Mutations;

use App\Models\Advertisement;
use App\Models\Comment;
use Exception;

class UpdateComment
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $comment = Comment::find($args['id']);
            $comment->update($args);
            $advertisement_id = $comment->advertisement->id;
            $rating = Comment::where('advertisement_id', $advertisement_id)->avg('rating');
            $advertisment = Advertisement::find($advertisement_id);
            $advertisment->rating = $rating;
            $advertisment->save();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
