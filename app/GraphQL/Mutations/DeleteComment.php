<?php

namespace App\GraphQL\Mutations;

use App\Models\Advertisement;
use App\Models\Comment;
use Exception;

class DeleteComment
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $comment = Comment::find($args['id']);
            $advertisement_id = $comment->advertisement->id;
            $comment->delete();
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
