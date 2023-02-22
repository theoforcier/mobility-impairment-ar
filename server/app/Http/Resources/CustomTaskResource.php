<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomTaskResource extends JsonResource
{
    public static $wrap = 'task';

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'completed' => $this->completed,
            'points_reward' => $this->points_reward,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}