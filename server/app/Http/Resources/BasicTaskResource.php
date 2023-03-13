<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BasicTaskResource extends JsonResource
{
    public static $wrap = 'task';

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'label' => $this->taskType->description,
            'quantity' => $this->quantity(),
            'units' => $this->taskType->units,
            'auto_completed' => $this->taskType->auto_completed,
            'points_reward' => $this->pointsReward(),
            'completed' => $this->completed,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}