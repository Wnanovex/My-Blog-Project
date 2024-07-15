<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostsResource;
use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::get();
        return response()->json(['posts' => PostsResource::collection($posts)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' =>'required',
            'body' =>'required',
            'img' =>'required|mimes:jpeg,png,jpg,webp,svg|max:5048',
        ]);

        $slug = Str::slug($request->title , '-');

        $newImageName = uniqid().'-'.$slug.'.'.$request->img->extension();
        Storage::disk('public')->put($newImageName, file_get_contents($request->img));

       $post = Post::create([
            'title' => $request->title,
            'slug' => $slug,
            'body' => $request->body,
            'img_path' => $newImageName,
            'user_id' => auth()->user()->id,
        ]);



        return new PostsResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return response()->json(['post' => new PostsResource($post)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {

        $request->validate([
            'title' =>'required',
            'body' =>'required',
            'img' =>'required|mimes:jpeg,png,jpg,webp,svg|max:5048',
        ]);

        $newImageName = uniqid().'-'.$slug.'.'.$request->img->extension();
        Storage::disk('public')->put($newImageName, file_get_contents($request->img));

        $post = Post::where('slug', $slug)->first();
        // Gate::authorize('modify', $post);
        $post->update([
            'title' => $request->title,
            'slug' => $slug,
            'body' => $request->body,
            'img_path' => $newImageName,
            'user_id' => auth()->user()->id,
        ]);


        return new PostsResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $post = Post::where('slug', $slug)->first();
        // Gate::authorize('delete', $post);
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully.']);
    }
}
