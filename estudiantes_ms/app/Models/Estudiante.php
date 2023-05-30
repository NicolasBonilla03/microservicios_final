<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = 'estudiantes';
    protected $primaryKey = 'codigo';

    protected $fillable =[
        'codigo',
        'nombres',
        'apellidos',
        'created_at',
        'updated_at'
    ];
}
