# PRESENTATION.js
## A tiny and simple app to turn your html code into a presentation.

Why use Beamer or Power Point when you have html and css knowledge 
and you want to embed simply GIFs, Music, Videos and all sort of stuff into your 
presentations? Maybe even make them interactive? 

Presentation.js is a tiny and over simplified solution I wrote some time ago for it. 
I didn't want to use Beamer for embedding GIFs and Videos, although it worked 
you had to have the right PDF viewer for it (at least at the time I did it). 

So I decided to write minimalistic javascript code to emulate these features and give 
presentations on the full screen feature of some browsers. 

The way to use *presentations.js* is very easy. 
Every slide is given by the section tag (you can easily change this fact),  

```
<secion> 
// Your slide content here 
</section> 
```

and every html tag can be added an atribute `o`, which stands for order, this controls 
when a html element should pop out into existence in your slide. For instance 

```
<section> 

<p o="1"> Hello </p>

<p o="2"> World </p>

</section>
```


So when you get to this slide, the first thing you will see is Hello, and then after pressing Right Arrow 
on your keyboard, you will see World. 

Check out the minimal example I've prepared for you, bear in mind that it is indeed a **minimal example** ! 
You may put all sort of fancy css and javascript magic in it. 

Suggestions, collaborations, comments and feedback are welcome! 
So long! 

 


