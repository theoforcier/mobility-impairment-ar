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
            'display_name' => $this->display_name,
            'bio' => $this->bio,
            'points_total' => $this->points_total,
            'meters_travelled' => $this->totalMetersTravelled(),
            'created_at' => $this->created_at
        ];
    }
}