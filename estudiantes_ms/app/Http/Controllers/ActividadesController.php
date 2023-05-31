<?php

namespace App\Http\Controllers;

use App\Models\Actividad;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ActividadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $actividad = new Actividad();

        $actividad->descripcion = $request->descripcion;
        $actividad->nota = $request->nota;
        $actividad->codigoEstudiante = $request->codigoEstudiante;
        $actividad->save();

        return response()->json('Nota registrada exitosamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $actividades = Actividad::where('codigoEstudiante', $id)->get();

        return response()->json($actividades);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $actividad = Actividad::find($id);
        if (empty($actividad)) {
            return response("La actividad no existe");
        }
        $actividad->delete();
        return response("Registro eliminado");
    }
}
