<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use DB;

class UserDistance extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function dateDistance($date=null)
    {
        return auth()->user()->distances()
            ->where('date', $date)
            ->first();
    }

    public function addDistance($meters, $date)
    {

        $dateRecord = $this->dateDistance($date);

        if (is_null($dateRecord)) {
            $dateRecord = auth()->user()->distances()->forceCreate(['date' => $date]);
        }

        $affected = DB::table('user_distances')
            ->where([
                ['user_id', auth()->id()],
                ['date', $date]
            ])
            ->increment('meters', $meters);

        return $affected;

    }
    
}
