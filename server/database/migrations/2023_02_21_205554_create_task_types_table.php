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
        Schema::create('task_types', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->integer('base_points');
            $table->integer('base_quantity');
            $table->string('units');
        });

        DB::table('task_types')->insert([
            [ // id: 1
                'description' => 'Travel',
                'base_points' => 250,
                'base_quantity' => 200,
                'units' => 'meter'
            ],
            [ // id: 2
                'description' => 'Add a friend',
                'base_points' => 250,
                'base_quantity' => 1,
                'units' => 'friend'
            ],
            [ // id: 3
                'description' => 'Talk to a friend',
                'base_points' => 100,
                'base_quantity' => 1,
                'units' => 'friend'
            ],
            [ // id: 4
                'description' => 'Make a craft',
                'base_points' => 200,
                'base_quantity' => 1,
                'units' => 'craft'
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
        Schema::dropIfExists('task_types');
    }
};
