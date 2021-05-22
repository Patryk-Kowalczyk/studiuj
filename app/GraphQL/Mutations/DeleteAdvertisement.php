<?php


namespace App\GraphQL\Mutations;


use App\Models\Advertisement;
use App\Models\Comment;
use Exception;


class DeleteAdvertisement
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        try {
            $advertisment = Advertisement::find($args['id']);
            if($advertisment->comments())
            {
                $advertisment->comments()->delete();
            }
            $advertisment->delete();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}
