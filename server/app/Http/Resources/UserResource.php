<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = 'user';

    public function toArray($request): array
    {
        return [
            'id' => $this->id, 
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'display_name' => $this->display_name
        ];
    }
}