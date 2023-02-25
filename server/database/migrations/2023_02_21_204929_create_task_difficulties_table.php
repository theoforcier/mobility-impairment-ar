<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_difficulties', function (Blueprint $table) {
            $table->id();
            $table->float('points_multiplier', 4, 3);
            $table->float('quantity_multiplier', 4, 3);
            $table->integer('threshold');
        });

        DB::table('task_difficulties')->insert([
            [ // id: 1
                'points_multiplier' => 1.0,
                'quantity_multiplier' => 1.0,
                'threshold' => 0
            ],
            [ // id: 2
                'points_multiplier' => 1.2,
                'quantity_multiplier' => 1.5,
                'threshold' => 1250 * 5           // ~1250 is the avg points per day... upgrade difficulty tier after 5 days
            ],
            [ // id: 3
                'points_multiplier' => 1.4,
                'quantity_multiplier' => 2.0,
                'threshold' => 1250 * 12
            ],
            [ // id: 4
                'points_multiplier' => 1.6,
                'quantity_multiplier' => 2.5,
                'threshold' => 1250 * 25
            ],
            [ // id: 5
                'points_multiplier' => 1.8,
                'quantity_multiplier' => 3.0,
                'threshold' => 1250 * 45
            ],
            [ // id: 6
                'points_multiplier' => 2.0,
                'quantity_multiplier' => 3.5,
                'threshold' => 1250 * 60
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_difficulties');
    }
};
