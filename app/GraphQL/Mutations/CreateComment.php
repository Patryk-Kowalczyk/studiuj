<?php

namespace App\GraphQL\Mutations;

use App\Models\Advertisement;
use App\Models\Comment;

class CreateComment
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $comment = Comment::create([
            'description' => $args['description'],
            'user_id' => $args['user_id'],
            'advertisement_id' => $args['advertisement_id'],
            'rating' => $args['rating'],
        ]);

        $rating = Comment::where('advertisement_id', $args['advertisement_id'])->avg('rating');
        $advertisment= Advertisement::find($args['advertisement_id']);
        $advertisment->rating=$rating;
        $advertisment->save();
        return $comment;
    }
}
